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
  const [showSnapMenu, setShowSnapMenu] = useState(false);
  const [snapLayout, setSnapLayout] = useState<'left-half' | 'right-half' | 'left-two-thirds' | 'right-one-third' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (winConfig.maximized || snapLayout) {
      if (snapLayout) setSnapLayout(null);
      return;
    }
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  const handleApplySnap = (layout: 'left-half' | 'right-half' | 'left-two-thirds' | 'right-one-third' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    setShowSnapMenu(false);
    setSnapLayout(layout);
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
        transition: isDragging ? 'none' : 'width 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), height 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), top 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), left 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)',
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
          : snapLayout === 'left-half'
          ? {
              top: 0,
              left: 0,
              width: '50vw',
              height: 'calc(100vh - 48px)',
              borderRadius: 0,
            }
          : snapLayout === 'right-half'
          ? {
              top: 0,
              left: '50vw',
              width: '50vw',
              height: 'calc(100vh - 48px)',
              borderRadius: 0,
            }
          : snapLayout === 'left-two-thirds'
          ? {
              top: 0,
              left: 0,
              width: '66.666vw',
              height: 'calc(100vh - 48px)',
              borderRadius: 0,
            }
          : snapLayout === 'right-one-third'
          ? {
              top: 0,
              left: '66.666vw',
              width: '33.333vw',
              height: 'calc(100vh - 48px)',
              borderRadius: 0,
            }
          : snapLayout === 'top-left'
          ? {
              top: 0,
              left: 0,
              width: '50vw',
              height: 'calc(50vh - 24px)',
              borderRadius: 0,
            }
          : snapLayout === 'top-right'
          ? {
              top: 0,
              left: '50vw',
              width: '50vw',
              height: 'calc(50vh - 24px)',
              borderRadius: 0,
            }
          : snapLayout === 'bottom-left'
          ? {
              top: 'calc(50vh - 24px)',
              left: 0,
              width: '50vw',
              height: 'calc(50vh - 24px)',
              borderRadius: 0,
            }
          : snapLayout === 'bottom-right'
          ? {
              top: 'calc(50vh - 24px)',
              left: '50vw',
              width: '50vw',
              height: 'calc(50vh - 24px)',
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
      className={`absolute win11-window win11-mica flex flex-col select-none animate-win11-open ${
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

        {/* Windows 11 Window Action Buttons & Snap Flyout */}
        <div className="flex items-center h-full -mr-3 relative" onClick={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="h-full px-3.5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title="Minimize"
          >
            <FaMinus className="w-2.5 h-2.5" />
          </button>

          {/* Maximize / Restore / Snap Layout Anchor */}
          <div
            className="relative h-full"
            onMouseEnter={() => {
              if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
              setShowSnapMenu(true);
            }}
            onMouseLeave={() => {
              snapTimeoutRef.current = setTimeout(() => setShowSnapMenu(false), 300);
            }}
          >
            <button
              onClick={() => {
                setShowSnapMenu(false);
                setSnapLayout(null);
                onMaximize();
              }}
              className="h-full px-3.5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              title={winConfig.maximized || snapLayout ? 'Restore' : 'Maximize (Hover for Snap Layouts)'}
            >
              {winConfig.maximized || snapLayout ? <FaCompressAlt className="w-2.5 h-2.5" /> : <FaRegSquare className="w-2.5 h-2.5" />}
            </button>

            {/* Official Windows 11 Snap Assist Layout Popover */}
            {showSnapMenu && (
              <div
                className="absolute top-10 right-0 w-64 bg-[#1e1e24]/95 border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-2xl z-[999999] animate-win11-menu"
                onMouseEnter={() => {
                  if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
                }}
                onMouseLeave={() => setShowSnapMenu(false)}
              >
                <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Snap layouts</div>
                <div className="grid grid-cols-2 gap-2">
                  {/* 50/50 Split */}
                  <div className="bg-black/40 p-1.5 rounded-lg border border-white/10 flex gap-1 h-14">
                    <button
                      onClick={() => handleApplySnap('left-half')}
                      className="flex-1 bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Snap Left Half"
                    />
                    <button
                      onClick={() => handleApplySnap('right-half')}
                      className="flex-1 bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Snap Right Half"
                    />
                  </div>

                  {/* 2/3 and 1/3 Split */}
                  <div className="bg-black/40 p-1.5 rounded-lg border border-white/10 flex gap-1 h-14">
                    <button
                      onClick={() => handleApplySnap('left-two-thirds')}
                      className="w-2/3 bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Snap Left 66%"
                    />
                    <button
                      onClick={() => handleApplySnap('right-one-third')}
                      className="w-1/3 bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Snap Right 33%"
                    />
                  </div>

                  {/* 4 Quadrants */}
                  <div className="bg-black/40 p-1.5 rounded-lg border border-white/10 grid grid-cols-2 gap-1 h-14 col-span-2">
                    <button
                      onClick={() => handleApplySnap('top-left')}
                      className="bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Top Left"
                    />
                    <button
                      onClick={() => handleApplySnap('top-right')}
                      className="bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Top Right"
                    />
                    <button
                      onClick={() => handleApplySnap('bottom-left')}
                      className="bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Bottom Left"
                    />
                    <button
                      onClick={() => handleApplySnap('bottom-right')}
                      className="bg-white/10 hover:bg-blue-500/50 rounded transition-all border border-white/15"
                      title="Bottom Right"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

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
