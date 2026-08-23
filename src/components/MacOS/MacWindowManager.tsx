import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaMinus, FaExpand, FaCompress } from 'react-icons/fa';

export interface MacWindowConfig {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface MacWindowManagerProps {
  winConfig: MacWindowConfig;
  isActive: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const MacWindowManager: React.FC<MacWindowManagerProps> = ({
  winConfig,
  isActive,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const [pos, setPos] = useState({
    x: 80 + Math.floor(Math.random() * 80),
    y: 50 + Math.floor(Math.random() * 40),
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (winConfig.maximized) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      const nextX = Math.max(10, Math.min(window.innerWidth - 100, dragStartRef.current.posX + deltaX));
      const nextY = Math.max(32, Math.min(window.innerHeight - 100, dragStartRef.current.posY + deltaY));
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
        transition: isDragging ? 'none' : 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), top 0.22s cubic-bezier(0.16, 1, 0.3, 1), left 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        ...(winConfig.maximized || isSmallScreen
          ? {
              top: 28,
              left: 0,
              right: 0,
              bottom: 64,
              width: '100vw',
              height: 'calc(100vh - 92px)',
              borderRadius: 0,
            }
          : {
              top: `${Math.max(32, pos.y)}px`,
              left: `${Math.max(16, pos.x)}px`,
              width: `${winConfig.defaultWidth || 860}px`,
              height: `${winConfig.defaultHeight || 540}px`,
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - 100px)',
            }),
      }}
      className={`absolute flex flex-col select-none rounded-2xl overflow-hidden border animate-macos-scale-in ${
        isActive
          ? 'macos-glass-dark shadow-2xl border-white/20'
          : 'bg-[#181820]/90 border-white/10 shadow-xl opacity-95'
      }`}
    >
      {/* macOS Window Header Toolbar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className={`h-10 px-3.5 flex items-center justify-between border-b cursor-default transition-colors ${
          isActive
            ? 'bg-gradient-to-b from-white/10 to-white/5 border-white/10 text-white'
            : 'bg-black/30 border-white/5 text-zinc-400'
        }`}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2 group">
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="macos-traffic-btn macos-traffic-close"
            title="Close (Cmd + W)"
          >
            <FaTimes className="text-[#4c0000] text-[8px] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="macos-traffic-btn macos-traffic-minimize"
            title="Minimize (Cmd + M)"
          >
            <FaMinus className="text-[#593e00] text-[7px] opacity-0 group-hover:opacity-100" />
          </button>

          {/* Maximize / Fullscreen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="macos-traffic-btn macos-traffic-maximize"
            title="Zoom / Fullscreen"
          >
            {winConfig.maximized ? (
              <FaCompress className="text-[#004d0d] text-[6px] opacity-0 group-hover:opacity-100" />
            ) : (
              <FaExpand className="text-[#004d0d] text-[6px] opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center gap-2 text-xs font-medium tracking-tight truncate max-w-[60%]">
          {winConfig.icon && <span className="flex-shrink-0">{winConfig.icon}</span>}
          <span className="truncate">{winConfig.title}</span>
        </div>

        {/* Empty placeholder on right to center title */}
        <div className="w-12" />
      </div>

      {/* Window Body Content */}
      <div className="flex-1 min-h-0 bg-[#121218]/95 overflow-hidden flex flex-col text-white">
        {winConfig.content}
      </div>
    </div>
  );
};

export default MacWindowManager;
