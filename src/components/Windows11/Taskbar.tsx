import React, { useState, useEffect } from 'react';
import {
  FaWifi,
  FaVolumeUp,
  FaBatteryFull,
} from 'react-icons/fa';
import { WIN11_ICONS } from './icons';

interface TaskbarProps {
  openApps: string[];
  activeAppId: string | null;
  onToggleApp: (appId: string) => void;
  onToggleStartMenu: () => void;
  onToggleQuickSettings: () => void;
  onToggleCalendar: () => void;
  onToggleWidgets: () => void;
  isStartOpen: boolean;
  isQuickSettingsOpen: boolean;
  isCalendarOpen: boolean;
  isWidgetsOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openApps,
  activeAppId,
  onToggleApp,
  onToggleStartMenu,
  onToggleQuickSettings,
  onToggleCalendar,
  onToggleWidgets,
  isStartOpen,
  isQuickSettingsOpen,
  isCalendarOpen,
  isWidgetsOpen,
}) => {
  const [time, setTime] = useState(new Date());
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  const previewTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const PINNED_ITEMS = [
    { id: 'explorer', name: 'File Explorer', icon: WIN11_ICONS.explorer },
    { id: 'terminal', name: 'PowerShell', icon: WIN11_ICONS.terminal },
    { id: 'copilot', name: 'Copilot AI', icon: WIN11_ICONS.copilot },
    { id: 'vscode', name: 'VS Code', icon: WIN11_ICONS.vscode },
    { id: 'photos', name: 'Photos Gallery', icon: WIN11_ICONS.photos },
    { id: 'notepad', name: 'Notepad', icon: WIN11_ICONS.notepad },
    { id: 'spotify', name: 'Spotify Music', icon: WIN11_ICONS.spotify },
    { id: 'edge', name: 'Microsoft Edge', icon: WIN11_ICONS.edge },
    { id: 'taskManager', name: 'Task Manager', icon: WIN11_ICONS.taskManager },
    { id: 'mail', name: 'Outlook Mail', icon: WIN11_ICONS.mail },
    { id: 'settings', name: 'Settings', icon: WIN11_ICONS.settings },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-0 inset-x-0 h-12 win11-taskbar z-[99998] flex items-center justify-between px-3 select-none text-xs text-white shadow-2xl"
    >
      {/* Left: Weather Widget Pill */}
      <button
        onClick={onToggleWidgets}
        className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md transition-all ${
          isWidgetsOpen ? 'bg-white/15' : 'hover:bg-white/10'
        }`}
        title="Widgets (Noida, India)"
      >
        <img src={WIN11_ICONS.widgets} alt="Weather" className="w-5 h-5 object-contain" />
        <div className="text-left font-mono text-[11px] leading-tight">
          <span className="text-white font-bold">28°C</span>
          <span className="text-zinc-400 block text-[9px]">Partly Cloudy</span>
        </div>
      </button>

      {/* Center: Windows 11 App Dock */}
      <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
        {/* Windows 11 Official Start Button */}
        <button
          onClick={onToggleStartMenu}
          className={`p-1.5 rounded-md transition-all win11-icon-btn ${
            isStartOpen ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          title="Start"
        >
          <img src={WIN11_ICONS.logo} alt="Windows 11 Start" className="w-6 h-6 object-contain drop-shadow" />
        </button>

        {/* Search Button */}
        <button
          onClick={onToggleStartMenu}
          className="p-1.5 rounded-md hover:bg-white/10 text-zinc-300 hover:text-white transition-all win11-icon-btn"
          title="Search"
        >
          <img src={WIN11_ICONS.search} alt="Search" className="w-5 h-5 object-contain" />
        </button>

        {/* Pinned / Open Apps with Windows 11 Live Hover Previews */}
        {PINNED_ITEMS.map((app) => {
          const isOpen = openApps.includes(app.id);
          const isActive = activeAppId === app.id;
          const isHovered = hoveredAppId === app.id;

          return (
            <div
              key={app.id}
              className="relative"
              onMouseEnter={() => {
                if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
                setHoveredAppId(app.id);
              }}
              onMouseLeave={() => {
                previewTimeoutRef.current = setTimeout(() => setHoveredAppId(null), 250);
              }}
            >
              {/* Windows 11 Thumbnail Preview Card */}
              {isHovered && isOpen && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleApp(app.id);
                    setHoveredAppId(null);
                  }}
                  className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 bg-[#202028]/95 border border-white/20 rounded-xl p-2.5 shadow-2xl backdrop-blur-2xl z-[999999] animate-win11-menu flex flex-col gap-1.5 cursor-pointer hover:border-blue-400/50 transition-all text-left"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <img src={app.icon} alt={app.name} className="w-3.5 h-3.5 object-contain" />
                      <span className="text-[11px] font-medium text-white truncate">{app.name}</span>
                    </div>
                  </div>
                  {/* Mini Window Preview Canvas Mock */}
                  <div className="h-24 rounded-lg bg-[#141418] border border-white/10 p-2 flex flex-col justify-between overflow-hidden shadow-inner relative group">
                    <div className="h-2 w-16 bg-white/15 rounded" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                      <div className="h-1.5 w-1/2 bg-blue-500/30 rounded" />
                    </div>
                    <div className="text-[9px] text-zinc-400 font-mono text-center opacity-70">
                      Click to bring to front
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => onToggleApp(app.id)}
                className={`relative p-1.5 rounded-md transition-all win11-icon-btn ${
                  isActive
                    ? 'bg-white/20 shadow-inner'
                    : isOpen
                    ? 'bg-white/10'
                    : 'hover:bg-white/10'
                }`}
                title={!isOpen ? app.name : undefined}
              >
                <img src={app.icon} alt={app.name} className="w-6 h-6 object-contain drop-shadow" />
                {/* Running Pill Indicator */}
                {isOpen && (
                  <div
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${
                      isActive ? 'w-4 bg-blue-400' : 'w-1.5 bg-zinc-400'
                    }`}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Right: System Tray & Clock */}
      <div className="flex items-center gap-1.5 font-mono text-[11px]">
        {/* Quick Settings pill */}
        <button
          onClick={onToggleQuickSettings}
          className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all ${
            isQuickSettingsOpen ? 'bg-white/15' : 'hover:bg-white/10 text-zinc-300'
          }`}
          title="Internet, Audio, Battery"
        >
          <FaWifi className="w-3 h-3 text-white" />
          <FaVolumeUp className="w-3 h-3 text-white" />
          <FaBatteryFull className="w-3.5 h-3.5 text-white" />
        </button>

        {/* Language */}
        <span className="text-[10px] text-zinc-400 px-1 hidden md:inline">ENG IN</span>

        {/* Date & Time Flyout trigger */}
        <button
          onClick={onToggleCalendar}
          className={`text-right px-2 py-1 rounded-md transition-all leading-tight ${
            isCalendarOpen ? 'bg-white/15' : 'hover:bg-white/10'
          }`}
          title="Date and Time"
        >
          <div className="text-[11px] font-medium text-white">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[9px] text-zinc-400">
            {time.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </div>
        </button>

        {/* Show Desktop Line on far right */}
        <div
          className="w-1.5 h-full hover:bg-white/20 border-l border-white/10 cursor-pointer ml-1"
          title="Show Desktop"
        />
      </div>
    </div>
  );
};

export default Taskbar;
