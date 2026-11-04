import React, { useState, useEffect, useRef } from 'react';
import {
  FaApple,
  FaWifi,
  FaSearch,
  FaBatteryFull,
  FaMusic,
  FaLock,
  FaRedo,
  FaSlidersH,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MACOS_ICONS } from './icons';


type MenuItem = '-' | { label: string; key?: string; disabled?: boolean; act?: 'new' | 'search' | 'about' | 'settings' | 'app'; app?: string };
const MENU_ITEMS: Record<string, MenuItem[]> = {
  File: [
    { label: 'New {app} Window', key: '⌘N', act: 'new' },
    { label: 'New Tab', key: '⌘T', disabled: true },
    { label: 'Open…', key: '⌘O', disabled: true },
    '-',
    { label: 'Close Window', key: '⌘W', disabled: true },
    { label: 'Save', key: '⌘S', disabled: true },
    '-',
    { label: 'Print…', key: '⌘P', disabled: true },
  ],
  Edit: [
    { label: 'Undo', key: '⌘Z', disabled: true },
    { label: 'Redo', key: '⇧⌘Z', disabled: true },
    '-',
    { label: 'Cut', key: '⌘X', disabled: true },
    { label: 'Copy', key: '⌘C', disabled: true },
    { label: 'Paste', key: '⌘V', disabled: true },
    { label: 'Select All', key: '⌘A', disabled: true },
    '-',
    { label: 'Emoji & Symbols', key: '⌃⌘Space', disabled: true },
  ],
  View: [
    { label: 'as Icons', key: '⌘1' },
    { label: 'as List', key: '⌘2' },
    { label: 'as Columns', key: '⌘3' },
    '-',
    { label: 'Show Sidebar', key: '⌥⌘S' },
    { label: 'Enter Full Screen', key: '⌃⌘F' },
  ],
  Go: [
    { label: 'Back', key: '⌘[', disabled: true },
    { label: 'Forward', key: '⌘]', disabled: true },
    '-',
    { label: 'Applications', key: '⇧⌘A', act: 'app', app: 'finder' },
    { label: 'Documents', key: '⇧⌘O', act: 'app', app: 'finder' },
    { label: 'Downloads', key: '⌥⌘L', act: 'app', app: 'finder' },
  ],
  Window: [
    { label: 'Minimize', key: '⌘M' },
    { label: 'Zoom' },
    { label: 'Tile Window to Left of Screen' },
    { label: 'Tile Window to Right of Screen' },
    '-',
    { label: 'Bring All to Front' },
  ],
  Help: [
    { label: 'Search', act: 'search', key: '⌘?' },
    '-',
    { label: '{app} Help' },
    { label: 'About This Mac', act: 'about' },
    { label: 'System Settings…', act: 'settings' },
  ],
};

interface MenuBarProps {
  activeAppTitle: string;
  activeAppId: string | null;
  onOpenApp: (appId: string) => void;
  onToggleSpotlight: () => void;
  onToggleControlCenter: () => void;
  onOpenAboutModal: () => void;
  onLock: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppTitle: _activeAppTitle,
  activeAppId,
  onOpenApp,
  onToggleSpotlight,
  onToggleControlCenter,
  onOpenAboutModal,
  onLock,
  onRestart,
  onExit,
}) => {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [activeMenuDropdown, setActiveMenuDropdown] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
        setActiveMenuDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const getAppName = () => {
    if (!activeAppId) return 'Finder';
    switch (activeAppId) {
      case 'finder':
        return 'Finder';
      case 'safari':
        return 'Safari';
      case 'vscode':
        return 'Code';
      case 'terminal':
        return 'Terminal';
      case 'notes':
        return 'Notes';
      case 'messages':
        return 'Messages';
      case 'appstore':
        return 'App Store';
      case 'settings':
        return 'Settings';
      case 'photos':
        return 'Photos';
      case 'music':
        return 'Music';
      case 'calculator':
        return 'Calculator';
      case 'photobooth':
        return 'Photo Booth';
      default:
        return 'Finder';
    }
  };

  const appName = getAppName();

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 right-0 h-7 z-[300] macos-menubar-glass px-3 flex items-center justify-between text-white text-[13px] font-medium select-none shadow-sm"
    >
      {/* Left Menu Items */}
      <div className="flex items-center gap-4">
        {/* Apple Logo Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setAppleMenuOpen(!appleMenuOpen);
              setActiveMenuDropdown(null);
            }}
            className={`p-1 rounded flex items-center justify-center transition-all ${
              appleMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <FaApple className="text-base text-white drop-shadow" />
          </button>

          {appleMenuOpen && (
            <div className="macos-menu absolute left-0 top-7 w-56 bg-[#1e1e24]/95 border border-white/15 rounded-xl shadow-2xl p-1 text-xs backdrop-blur-3xl animate-macos-slide-down z-50">
              <button
                onClick={() => {
                  onOpenAboutModal();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between font-medium"
              >
                <span>About This Mac</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => {
                  onOpenApp('settings');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between"
              >
                <span>System Settings...</span>
              </button>
              <button
                onClick={() => {
                  onOpenApp('appstore');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between"
              >
                <span>App Store...</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => {
                  onOpenApp('terminal');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between"
              >
                <span>Force Quit Terminal...</span>
                <span className="text-[10px] text-white/50">⌥⌘⎋</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => {
                  onLock();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <FaLock className="w-3 h-3 text-cyan-400" />
                <span>Lock Screen</span>
                <span className="ml-auto text-[10px] text-white/50">⌃⌘Q</span>
              </button>
              <button
                onClick={() => {
                  onRestart();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <FaRedo className="w-3 h-3 text-amber-400" />
                <span>Restart...</span>
              </button>
              <button
                onClick={() => {
                  onExit();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-red-600/80 flex items-center gap-2 text-red-300 hover:text-white font-medium"
              >
                <FaSignOutAlt className="w-3 h-3" />
                <span>Exit to Web Portfolio</span>
              </button>
            </div>
          )}
        </div>

        {/* Current Active App Name */}
        <span className="font-bold tracking-tight text-white drop-shadow-sm cursor-pointer hover:opacity-80">
          {appName}
        </span>

        {/* Contextual App Menus */}
        <div className="hidden md:flex items-center gap-3 text-white/90 text-xs">
          {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((menu) => (
            <div key={menu} className="relative">
              <button
                onClick={() => setActiveMenuDropdown(activeMenuDropdown === menu ? null : menu)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  activeMenuDropdown === menu ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                {menu}
              </button>

              {activeMenuDropdown === menu && (
                <div className="macos-menu absolute left-0 top-6 w-56 bg-[#1e1e24]/95 border border-white/15 rounded-xl shadow-2xl p-1 text-xs backdrop-blur-3xl animate-macos-slide-down z-50">
                  {(MENU_ITEMS[menu] || []).map((it, i) =>
                    it === '-' ? (
                      <div key={i} className="h-px bg-white/10 my-1" />
                    ) : (
                      <button
                        key={i}
                        disabled={it.disabled}
                        onClick={() => {
                          setActiveMenuDropdown(null);
                          if (it.act === 'new') onOpenApp(activeAppId || 'finder');
                          else if (it.act === 'search') onToggleSpotlight();
                          else if (it.act === 'about') onOpenAboutModal();
                          else if (it.act === 'settings') onOpenApp('settings');
                          else if (it.act === 'app' && it.app) onOpenApp(it.app);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between ${it.disabled ? 'opacity-40 cursor-default hover:!bg-transparent' : 'hover:bg-blue-600'}`}
                      >
                        <span>{it.label.replace('{app}', appName)}</span>
                        {it.key && <span className="text-[11px] text-white/50 tracking-wide">{it.key}</span>}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Status Bar Items */}
      <div className="flex items-center gap-3.5 text-xs text-white/90">
        {/* Music Mini Ticker */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 transition-all cursor-pointer">
          <FaMusic className="text-purple-400 text-[10px]" />
          <span className="text-[11px] truncate max-w-[120px]">Midnight Code</span>
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono text-white/80">98%</span>
          <FaBatteryFull className="text-emerald-400 text-sm" />
        </div>

        {/* Wi-Fi */}
        <button
          onClick={onToggleControlCenter}
          className="p-1 hover:bg-white/10 rounded transition-all"
          title="Wi-Fi: Ashish_Gigabit_5G"
        >
          <FaWifi className="text-sm" />
        </button>

        {/* Spotlight Trigger */}
        <button
          onClick={onToggleSpotlight}
          className="p-1 hover:bg-white/10 rounded transition-all"
          title="Spotlight Search (Cmd + Space)"
        >
          <FaSearch className="text-xs" />
        </button>

        {/* Control Center Trigger */}
        <button
          onClick={onToggleControlCenter}
          className="p-1 hover:bg-white/10 rounded transition-all"
          title="Control Center"
        >
          <FaSlidersH className="text-xs" />
        </button>

        {/* Siri Icon */}
        <button
          onClick={onToggleSpotlight}
          className="w-4 h-4 rounded-full overflow-hidden hover:scale-110 transition-all flex items-center justify-center"
          title="Siri / AI Intelligence"
        >
          <img src={MACOS_ICONS.siri} alt="Siri" className="w-full h-full object-contain" />
        </button>

        {/* Live Date & Clock */}
        <div className="font-medium text-[12px] tracking-tight ml-1">
          <span>{formattedDate}</span>
          <span className="ml-1.5">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
