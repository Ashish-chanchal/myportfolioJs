import React, { useState, useRef, useEffect } from 'react';
import { FaMinus, FaRegSquare, FaTimes, FaCompressAlt } from 'react-icons/fa';

export interface WindowConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface WindowManagerProps {
  winConfig: WindowConfig;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  winConfig,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  // Compute safe initial responsive coordinates
  const getInitialPos = () => {
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const winW = winConfig.defaultWidth || Math.min(840, screenW - 40);
    const winH = winConfig.defaultHeight || Math.min(540, screenH - 120);

    const safeX = Math.max(16, Math.min(screenW - winW - 20, (screenW - winW) / 2));
    const safeY = Math.max(24, Math.min(screenH - winH - 64, (screenH - winH - 48) / 2));

    return { x: safeX, y: safeY };
  };

  const [pos, setPos] = useState(getInitialPos);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (winConfig.maximized) return;
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      // Ensure window titlebar is strictly pinned inside the visible screen
      const nextX = Math.max(10, Math.min(screenW - 120, dragStartRef.current.posX + dx));
      const nextY = Math.max(16, Math.min(screenH - 100, dragStartRef.current.posY + dy));

      setPos({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (winConfig.minimized) return null;

  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      onClick={onFocus}
      style={{
        zIndex: winConfig.zIndex,
        ...(winConfig.maximized || isSmallScreen
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: 48,
              width: '100vw',
              height: 'calc(100vh - 48px)',
              borderRadius: 0,
            }
          : {
              top: `${Math.max(16, pos.y)}px`,
              left: `${Math.max(10, pos.x)}px`,
              width: `${winConfig.defaultWidth || 820}px`,
              height: `${winConfig.defaultHeight || 540}px`,
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - 72px)',
            }),
      }}
      className={`absolute win11-window win11-mica flex flex-col select-none ${
        isDragging ? 'shadow-2xl opacity-95' : 'shadow-2xl'
      }`}
    >
      {/* Window Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className="h-10 px-3 bg-[#1e1e24]/95 border-b border-white/10 flex items-center justify-between cursor-move flex-shrink-0"
      >
        {/* Title and Icon */}
        <div className="flex items-center gap-2.5 text-white text-xs font-semibold truncate pointer-events-none">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">{winConfig.icon}</div>
          <span className="truncate">{winConfig.title}</span>
        </div>

        {/* Windows 11 Window Action Buttons */}
        <div className="flex items-center h-full -mr-3" onClick={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="h-full px-3.5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title="Minimize"
          >
            <FaMinus className="w-2.5 h-2.5" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={onMaximize}
            className="h-full px-3.5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title={winConfig.maximized ? 'Restore' : 'Maximize'}
          >
            {winConfig.maximized ? <FaCompressAlt className="w-2.5 h-2.5" /> : <FaRegSquare className="w-2.5 h-2.5" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="h-full px-4 win11-ctrl-close text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title="Close"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative bg-[#141418] select-auto">
        {winConfig.content}
      </div>
    </div>
  );
};

export default WindowManager;
