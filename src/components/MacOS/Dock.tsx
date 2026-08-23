import React, { useState, useRef, useCallback } from 'react';
import { MACOS_ICONS } from './icons';

export interface DockAppItem {
  id: string;
  name: string;
  icon: string;
  isSystem?: boolean;
}

interface DockProps {
  openApps: string[];
  activeAppId: string | null;
  onOpenApp: (appId: string) => void;
  onToggleMinimize: (appId: string) => void;
  onOpenLaunchpad: () => void;
}

const BASE_WIDTH = 48;        // Base slot width in px
const MAX_WIDTH = 84;         // Max slot width when magnified in px
const BASE_ICON_SIZE = 48;    // Base icon size in px
const MAX_ICON_SIZE = 96;     // Max icon size when magnified in px
const SPREAD_RADIUS = 2.75;   // Influence radius in number of item slots

export const Dock: React.FC<DockProps> = ({
  openApps,
  activeAppId,
  onOpenApp,
  onToggleMinimize,
  onOpenLaunchpad,
}) => {
  const [bouncingAppId, setBouncingAppId] = useState<string | null>(null);
  const [mouseItemIndex, setMouseItemIndex] = useState<number | null>(null);
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const DOCK_APPS: DockAppItem[] = [
    { id: 'finder', name: 'Finder', icon: MACOS_ICONS.finder },
    { id: 'launchpad', name: 'Launchpad', icon: MACOS_ICONS.launchpad },
    { id: 'safari', name: 'Safari', icon: MACOS_ICONS.safari },
    { id: 'messages', name: 'Messages', icon: MACOS_ICONS.messages },
    { id: 'mail', name: 'Mail', icon: MACOS_ICONS.mail },
    { id: 'maps', name: 'Maps', icon: MACOS_ICONS.maps },
    { id: 'photos', name: 'Photos', icon: MACOS_ICONS.photos },
    { id: 'photobooth', name: 'Photo Booth', icon: MACOS_ICONS.photobooth },
    { id: 'calendar', name: 'Calendar', icon: MACOS_ICONS.calendar },
    { id: 'notes', name: 'Notes', icon: MACOS_ICONS.notes },
    { id: 'music', name: 'Music', icon: MACOS_ICONS.music },
    { id: 'podcasts', name: 'Podcasts', icon: MACOS_ICONS.podcasts },
    { id: 'appstore', name: 'App Store', icon: MACOS_ICONS.appstore },
    { id: 'settings', name: 'System Settings', icon: MACOS_ICONS.settings },
    { id: 'vscode', name: 'VS Code', icon: MACOS_ICONS.vscode },
    { id: 'terminal', name: 'Terminal', icon: MACOS_ICONS.terminal },
    { id: 'calculator', name: 'Calculator', icon: MACOS_ICONS.calculator },
  ];

  const SYSTEM_APPS: DockAppItem[] = [
    { id: 'trash', name: 'Trash', icon: MACOS_ICONS.trashEmpty, isSystem: true },
  ];

  const ALL_APPS = [...DOCK_APPS, ...SYSTEM_APPS];

  const handleAppClick = (app: DockAppItem) => {
    if (app.id === 'launchpad') {
      onOpenLaunchpad();
      return;
    }

    setBouncingAppId(app.id);
    setTimeout(() => setBouncingAppId(null), 1400);

    if (openApps.includes(app.id) && activeAppId === app.id) {
      onToggleMinimize(app.id);
    } else {
      onOpenApp(app.id);
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left - 12; // 12px horizontal padding
    const totalWidth = rect.width - 24;
    const normalized = (relativeX / totalWidth) * ALL_APPS.length;
    setMouseItemIndex(Math.max(0, Math.min(ALL_APPS.length - 1, normalized)));
  }, [ALL_APPS.length]);

  const handleMouseLeave = useCallback(() => {
    setMouseItemIndex(null);
    setHoveredAppId(null);
  }, []);

  // Pure mathematical proximity curve (Zero DOM measuring loop = 100% silky smooth & jitter-free)
  const getSlotAndIconMetrics = (index: number) => {
    if (mouseItemIndex === null) {
      return { slotWidth: BASE_WIDTH, iconSize: BASE_ICON_SIZE };
    }

    const distance = Math.abs(mouseItemIndex - (index + 0.5));
    if (distance > SPREAD_RADIUS) {
      return { slotWidth: BASE_WIDTH, iconSize: BASE_ICON_SIZE };
    }

    const factor = Math.cos((distance / SPREAD_RADIUS) * (Math.PI / 2)) ** 2;
    const slotWidth = BASE_WIDTH + (MAX_WIDTH - BASE_WIDTH) * factor;
    const iconSize = BASE_ICON_SIZE + (MAX_ICON_SIZE - BASE_ICON_SIZE) * factor;
    return { slotWidth, iconSize };
  };

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-[350] select-none pointer-events-auto">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="macos-dock-glass h-[62px] px-3 rounded-2xl sm:rounded-3xl flex items-center gap-1.5 shadow-2xl overflow-visible relative"
        style={{
          transition: mouseItemIndex === null ? 'all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
        }}
      >
        {/* Main Applications */}
        {DOCK_APPS.map((app, index) => {
          const isOpen = openApps.includes(app.id);
          const isBouncing = bouncingAppId === app.id;
          const isTooltipActive = hoveredAppId === app.id;
          const { slotWidth, iconSize } = getSlotAndIconMetrics(index);

          return (
            <div
              key={app.id}
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => {
                if (hoveredAppId === app.id) setHoveredAppId(null);
              }}
              className="relative flex flex-col items-center justify-end h-full flex-shrink-0"
              style={{
                width: `${slotWidth}px`,
                transition: mouseItemIndex === null ? 'width 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
                willChange: 'width',
              }}
            >
              {/* Native Apple Tooltip */}
              {isTooltipActive && (
                <div
                  style={{ bottom: `${iconSize + 14}px` }}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-lg bg-[#18181e]/95 border border-white/15 text-white text-[11px] font-medium tracking-tight whitespace-nowrap shadow-2xl backdrop-blur-2xl z-50 flex flex-col items-center animate-macos-slide-down"
                >
                  <span>{app.name}</span>
                  <div className="w-1.5 h-1.5 bg-[#18181e] rotate-45 border-r border-b border-white/15 -mb-1 mt-0.5" />
                </div>
              )}

              {/* Physical Floating Icon */}
              <button
                onClick={() => handleAppClick(app)}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  bottom: '7px',
                  transition: mouseItemIndex === null ? 'all 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
                  willChange: 'width, height',
                }}
                className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer pointer-events-auto ${
                  isBouncing ? 'animate-macos-bounce' : ''
                }`}
                title={app.name}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain filter drop-shadow-xl pointer-events-none"
                />
              </button>

              {/* Active Running Indicator Dot */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
                {isOpen && (
                  <span className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_5px_#ffffff]" />
                )}
              </div>
            </div>
          );
        })}

        {/* Vertical Separator */}
        <div className="w-px h-7 bg-white/20 mx-1 self-center flex-shrink-0" />

        {/* System Apps (Trash) */}
        {SYSTEM_APPS.map((app, index) => {
          const fullIndex = DOCK_APPS.length + index;
          const isTooltipActive = hoveredAppId === app.id;
          const { slotWidth, iconSize } = getSlotAndIconMetrics(fullIndex);

          return (
            <div
              key={app.id}
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => {
                if (hoveredAppId === app.id) setHoveredAppId(null);
              }}
              className="relative flex flex-col items-center justify-end h-full flex-shrink-0"
              style={{
                width: `${slotWidth}px`,
                transition: mouseItemIndex === null ? 'width 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
                willChange: 'width',
              }}
            >
              {isTooltipActive && (
                <div
                  style={{ bottom: `${iconSize + 14}px` }}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-lg bg-[#18181e]/95 border border-white/15 text-white text-[11px] font-medium tracking-tight whitespace-nowrap shadow-2xl backdrop-blur-2xl z-50 flex flex-col items-center animate-macos-slide-down"
                >
                  <span>{app.name}</span>
                  <div className="w-1.5 h-1.5 bg-[#18181e] rotate-45 border-r border-b border-white/15 -mb-1 mt-0.5" />
                </div>
              )}

              <button
                onClick={() => handleAppClick(app)}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  bottom: '7px',
                  transition: mouseItemIndex === null ? 'all 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
                  willChange: 'width, height',
                }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer pointer-events-auto"
                title={app.name}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain filter drop-shadow-xl pointer-events-none"
                />
              </button>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
