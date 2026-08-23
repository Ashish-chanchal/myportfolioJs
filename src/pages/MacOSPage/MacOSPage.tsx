import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './macos.css';
import { MACOS_ICONS } from '../../components/MacOS/icons';
import { MACOS_WALLPAPERS } from '../../components/MacOS/wallpapers';
import MenuBar from '../../components/MacOS/MenuBar';
import Dock from '../../components/MacOS/Dock';
import ControlCenter from '../../components/MacOS/ControlCenter';
import Spotlight from '../../components/MacOS/Spotlight';
import Launchpad from '../../components/MacOS/Launchpad';
import AboutThisMacModal from '../../components/MacOS/AboutThisMacModal';
import MacLockScreen from '../../components/MacOS/MacLockScreen';
import MacBootScreen from '../../components/MacOS/MacBootScreen';
import MacWindowManager, { MacWindowConfig } from '../../components/MacOS/MacWindowManager';
import DesktopOnlyGate from '../../components/shared/DesktopOnlyGate';

// App Components
import MacFinderApp from '../../components/MacOS/Apps/MacFinderApp';
import MacSafariApp from '../../components/MacOS/Apps/MacSafariApp';
import MacTerminalApp from '../../components/MacOS/Apps/MacTerminalApp';
import MacSettingsApp from '../../components/MacOS/Apps/MacSettingsApp';
import MacNotesApp from '../../components/MacOS/Apps/MacNotesApp';
import MacMessagesApp from '../../components/MacOS/Apps/MacMessagesApp';
import MacAppStoreApp from '../../components/MacOS/Apps/MacAppStoreApp';
import MacPhotosApp from '../../components/MacOS/Apps/MacPhotosApp';
import MacVSCodeApp from '../../components/MacOS/Apps/MacVSCodeApp';
import MacMusicApp from '../../components/MacOS/Apps/MacMusicApp';
import MacCalculatorApp from '../../components/MacOS/Apps/MacCalculatorApp';
import MacPhotoBoothApp from '../../components/MacOS/Apps/MacPhotoBoothApp';
import MacTrashApp from '../../components/MacOS/Apps/MacTrashApp';

interface WindowState {
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  appId: string;
  url?: string;
}

const MAC_APPS_META: Record<string, { title: string; defaultWidth: number; defaultHeight: number }> = {
  finder: { title: 'Finder', defaultWidth: 780, defaultHeight: 520 },
  safari: { title: 'Safari', defaultWidth: 880, defaultHeight: 560 },
  terminal: { title: 'Terminal', defaultWidth: 700, defaultHeight: 460 },
  settings: { title: 'System Settings', defaultWidth: 760, defaultHeight: 540 },
  notes: { title: 'Notes', defaultWidth: 760, defaultHeight: 500 },
  messages: { title: 'Messages', defaultWidth: 740, defaultHeight: 500 },
  appstore: { title: 'App Store', defaultWidth: 820, defaultHeight: 540 },
  photos: { title: 'Photos', defaultWidth: 800, defaultHeight: 520 },
  vscode: { title: 'Visual Studio Code', defaultWidth: 880, defaultHeight: 560 },
  music: { title: 'Music', defaultWidth: 760, defaultHeight: 500 },
  calculator: { title: 'Calculator', defaultWidth: 320, defaultHeight: 460 },
  photobooth: { title: 'Photo Booth', defaultWidth: 700, defaultHeight: 520 },
  trash: { title: 'Trash', defaultWidth: 640, defaultHeight: 420 },
};

export const MacOSPage: React.FC = () => {
  const navigate = useNavigate();

  // Persisted Wallpaper
  const [wallpaper, setWallpaper] = useState<string>(() => {
    return localStorage.getItem('macos_wallpaper') || MACOS_WALLPAPERS[0].url;
  });

  useEffect(() => {
    localStorage.setItem('macos_wallpaper', wallpaper);
  }, [wallpaper]);

  // Persisted Open Apps (Excluding photobooth to avoid holding hardware locks)
  const [openApps, setOpenApps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('macos_open_apps');
      const parsed = saved ? JSON.parse(saved) : ['finder'];
      return Array.isArray(parsed) ? parsed.filter((id) => id !== 'photobooth') : ['finder'];
    } catch {
      return ['finder'];
    }
  });

  useEffect(() => {
    const nonTransient = openApps.filter((id) => id !== 'photobooth');
    localStorage.setItem('macos_open_apps', JSON.stringify(nonTransient));
  }, [openApps]);

  const [activeAppId, setActiveAppId] = useState<string | null>('finder');
  const [maxZIndex, setMaxZIndex] = useState<number>(20);

  const [windowsState, setWindowsState] = useState<Record<string, WindowState>>({
    finder: { minimized: false, maximized: false, zIndex: 10 },
  });

  // System Boot & Session State (Matching Windows 11 Full Experience)
  const [bootState, setBootState] = useState<'booting' | 'locked' | 'desktop'>(() => {
    const isLoggedIn = localStorage.getItem('macos_session_logged_in');
    return isLoggedIn === 'true' ? 'desktop' : 'booting';
  });

  const handleLogin = () => {
    localStorage.setItem('macos_session_logged_in', 'true');
    setBootState('desktop');
  };

  const handleLock = () => {
    setBootState('locked');
  };

  const handleRestart = () => {
    localStorage.removeItem('macos_session_logged_in');
    setBootState('booting');
    setOpenApps(['finder']);
  };

  const handleExit = () => {
    localStorage.removeItem('macos_session_logged_in');
    navigate('/');
  };

  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isForceQuitOpen, setIsForceQuitOpen] = useState(false);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [switcherIndex, setSwitcherIndex] = useState(0);
  const [screenFlash, setScreenFlash] = useState(false);

  // Safari Target URL
  const [safariUrl, setSafariUrl] = useState('https://sociantra.ashishchanchal.in/');

  const openUrlInSafari = (url: string) => {
    setSafariUrl(url);
    openApp('safari');
  };

  // Desktop Context Menu
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  // Focus Window
  const focusApp = useCallback((appId: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveAppId(appId);
    setWindowsState((prev) => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || { minimized: false, maximized: false }),
        minimized: false,
        zIndex: nextZ,
      },
    }));
  }, [maxZIndex]);

  // Open App
  const openApp = useCallback((appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps((prev) => [...prev, appId]);
    }
    focusApp(appId);
  }, [openApps, focusApp]);

  // Close App
  const closeApp = useCallback((appId: string) => {
    // If photobooth is closed, aggressively terminate hardware camera streams and reload
    if (appId === 'photobooth') {
      try {
        if (window.__activeMacCameraStream) {
          window.__activeMacCameraStream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          window.__activeMacCameraStream = null;
        }
        if (window.__activeCameraStream) {
          window.__activeCameraStream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          window.__activeCameraStream = null;
        }
      } catch {}

      const updated = openApps.filter((id) => id !== 'photobooth');
      setOpenApps(updated);
      localStorage.setItem('macos_open_apps', JSON.stringify(updated));
      window.location.reload();
      return;
    }

    setOpenApps((prev) => prev.filter((id) => id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  }, [activeAppId, openApps]);

  // Minimize Window
  const toggleMinimize = useCallback((appId: string) => {
    const current = windowsState[appId];
    if (!current) return;

    if (activeAppId === appId && !current.minimized) {
      setWindowsState((prev) => ({
        ...prev,
        [appId]: { ...prev[appId], minimized: true },
      }));
      setActiveAppId(null);
    } else {
      setWindowsState((prev) => ({
        ...prev,
        [appId]: { ...prev[appId], minimized: false },
      }));
      focusApp(appId);
    }
  }, [activeAppId, focusApp, windowsState]);

  // Maximize Window
  const toggleMaximize = useCallback((appId: string) => {
    setWindowsState((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], maximized: !prev[appId]?.maximized },
    }));
  }, []);

  // Global Keyboard Shortcuts (Mac Authenticity)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // Cmd + Space => Toggle Spotlight
      if (isCmdOrCtrl && e.code === 'Space') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
        return;
      }

      // Cmd + Tab / Alt + Tab => App Switcher HUD
      if ((isCmdOrCtrl || e.altKey) && e.key === 'Tab' && openApps.length > 0) {
        e.preventDefault();
        setIsAppSwitcherOpen(true);
        setSwitcherIndex((prev) => (e.shiftKey ? (prev - 1 + openApps.length) % openApps.length : (prev + 1) % openApps.length));
        return;
      }

      // Cmd + Option + Esc => Force Quit Applications
      if (isCmdOrCtrl && e.altKey && e.key === 'Escape') {
        e.preventDefault();
        setIsForceQuitOpen((prev) => !prev);
        return;
      }

      // Cmd + Shift + 4 => Screenshot Flash
      if (isCmdOrCtrl && e.shiftKey && (e.key === '4' || e.key === '$')) {
        e.preventDefault();
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 200);
        return;
      }

      // Cmd + W => Close active app
      if (isCmdOrCtrl && e.key.toLowerCase() === 'w' && activeAppId) {
        e.preventDefault();
        closeApp(activeAppId);
        return;
      }

      // Cmd + Q => Quit active app
      if (isCmdOrCtrl && e.key.toLowerCase() === 'q' && activeAppId) {
        e.preventDefault();
        closeApp(activeAppId);
        return;
      }

      // Cmd + M or Cmd + H => Minimize / Hide active app
      if (isCmdOrCtrl && (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 'h') && activeAppId) {
        e.preventDefault();
        toggleMinimize(activeAppId);
        return;
      }

      // Cmd + F => Fullscreen / Maximize toggle
      if (isCmdOrCtrl && e.key.toLowerCase() === 'f' && activeAppId) {
        e.preventDefault();
        toggleMaximize(activeAppId);
        return;
      }

      // Cmd + , => Preferences / System Settings
      if (isCmdOrCtrl && e.key === ',') {
        e.preventDefault();
        openApp('settings');
        return;
      }

      // Escape => Close all popovers / overlays
      if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
        setIsControlCenterOpen(false);
        setIsLaunchpadOpen(false);
        setIsAboutModalOpen(false);
        setIsForceQuitOpen(false);
        setIsAppSwitcherOpen(false);
        setContextMenu({ x: 0, y: 0, visible: false });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Releasing Cmd / Ctrl / Alt finishes App Switcher selection
      if (!e.metaKey && !e.ctrlKey && !e.altKey && isAppSwitcherOpen) {
        setIsAppSwitcherOpen(false);
        const selectedApp = openApps[switcherIndex];
        if (selectedApp) {
          focusApp(selectedApp);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeAppId, closeApp, focusApp, isAppSwitcherOpen, openApps, switcherIndex, toggleMaximize, toggleMinimize, openApp]);

  // Desktop Context Menu Handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ x: 0, y: 0, visible: false });
  };

  // Desktop Icons
  const DESKTOP_ICONS: DesktopIcon[] = [
    { id: 'dt-finder', name: 'Macintosh HD', icon: MACOS_ICONS.finder, appId: 'finder' },
    { id: 'dt-sociantra', name: 'Sociantra.app', icon: MACOS_ICONS.appstore, appId: 'safari', url: 'https://sociantra.ashishchanchal.in/' },
    { id: 'dt-todoai', name: 'TODOAI.app', icon: MACOS_ICONS.appstore, appId: 'safari', url: 'https://todoai.ashishchanchal.in/' },
    { id: 'dt-vibepulse', name: 'VibePulse.app', icon: MACOS_ICONS.music, appId: 'safari', url: 'https://vibepluse.ashishchanchal.in/' },
    { id: 'dt-cineverse', name: 'CineVerse.app', icon: MACOS_ICONS.photos, appId: 'safari', url: 'https://cineverse.ashishchanchal.in/' },
    { id: 'dt-resume', name: 'Ashish_Resume.pdf', icon: MACOS_ICONS.docPdf, appId: 'finder' },
    { id: 'dt-vscode', name: 'VS Code', icon: MACOS_ICONS.vscode, appId: 'vscode' },
    { id: 'dt-terminal', name: 'Terminal', icon: MACOS_ICONS.terminal, appId: 'terminal' },
  ];

  // Dynamic App Content Renderer
  const renderMacAppContent = (appId: string) => {
    switch (appId) {
      case 'finder':
        return <MacFinderApp onOpenApp={openApp} onOpenInSafari={openUrlInSafari} />;
      case 'safari':
        return <MacSafariApp initialUrl={safariUrl} />;
      case 'terminal':
        return <MacTerminalApp />;
      case 'settings':
        return <MacSettingsApp currentWallpaper={wallpaper} setWallpaper={setWallpaper} />;
      case 'notes':
        return <MacNotesApp />;
      case 'messages':
        return <MacMessagesApp />;
      case 'appstore':
        return <MacAppStoreApp onOpenInSafari={openUrlInSafari} />;
      case 'photos':
        return <MacPhotosApp />;
      case 'vscode':
        return <MacVSCodeApp />;
      case 'music':
        return <MacMusicApp />;
      case 'calculator':
        return <MacCalculatorApp />;
      case 'photobooth':
        return <MacPhotoBoothApp />;
      case 'trash':
        return <MacTrashApp />;
      default:
        return null;
    }
  };

  // App Metadata Configuration
  const APP_CONFIGS: Record<string, Omit<MacWindowConfig, 'minimized' | 'maximized' | 'zIndex' | 'content'>> = {
    finder: {
      id: 'finder',
      title: 'Finder — Projects',
      icon: <img src={MACOS_ICONS.finder} alt="Finder" className="w-4 h-4 object-contain" />,
      defaultWidth: 880,
      defaultHeight: 540,
    },
    safari: {
      id: 'safari',
      title: 'Safari — Apple Portfolio Web Engine',
      icon: <img src={MACOS_ICONS.safari} alt="Safari" className="w-4 h-4 object-contain" />,
      defaultWidth: 940,
      defaultHeight: 580,
    },
    terminal: {
      id: 'terminal',
      title: 'Terminal — ashish@MacBook-Pro ~ %',
      icon: <img src={MACOS_ICONS.terminal} alt="Terminal" className="w-4 h-4 object-contain" />,
      defaultWidth: 780,
      defaultHeight: 480,
    },
    settings: {
      id: 'settings',
      title: 'System Settings',
      icon: <img src={MACOS_ICONS.settings} alt="Settings" className="w-4 h-4 object-contain" />,
      defaultWidth: 840,
      defaultHeight: 540,
    },
    notes: {
      id: 'notes',
      title: 'Notes — Engineering Insights',
      icon: <img src={MACOS_ICONS.notes} alt="Notes" className="w-4 h-4 object-contain" />,
      defaultWidth: 860,
      defaultHeight: 520,
    },
    messages: {
      id: 'messages',
      title: 'Messages — Ashish Chanchal',
      icon: <img src={MACOS_ICONS.messages} alt="Messages" className="w-4 h-4 object-contain" />,
      defaultWidth: 780,
      defaultHeight: 520,
    },
    appstore: {
      id: 'appstore',
      title: 'App Store — Ashish Software Suite',
      icon: <img src={MACOS_ICONS.appstore} alt="App Store" className="w-4 h-4 object-contain" />,
      defaultWidth: 920,
      defaultHeight: 580,
    },
    photos: {
      id: 'photos',
      title: 'Photos — Project Gallery',
      icon: <img src={MACOS_ICONS.photos} alt="Photos" className="w-4 h-4 object-contain" />,
      defaultWidth: 860,
      defaultHeight: 540,
    },
    vscode: {
      id: 'vscode',
      title: 'Visual Studio Code',
      icon: <img src={MACOS_ICONS.vscode} alt="VS Code" className="w-4 h-4 object-contain" />,
      defaultWidth: 960,
      defaultHeight: 600,
    },
    music: {
      id: 'music',
      title: 'Music',
      icon: <img src={MACOS_ICONS.music} alt="Music" className="w-4 h-4 object-contain" />,
      defaultWidth: 760,
      defaultHeight: 500,
    },
    calculator: {
      id: 'calculator',
      title: 'Calculator',
      icon: <img src={MACOS_ICONS.calculator} alt="Calculator" className="w-4 h-4 object-contain" />,
      defaultWidth: 300,
      defaultHeight: 440,
    },
    photobooth: {
      id: 'photobooth',
      title: 'Photo Booth',
      icon: <img src={MACOS_ICONS.facetime} alt="Photo Booth" className="w-4 h-4 object-contain" />,
      defaultWidth: 840,
      defaultHeight: 560,
    },
    trash: {
      id: 'trash',
      title: 'Trash',
      icon: <img src={MACOS_ICONS.trashEmpty} alt="Trash" className="w-4 h-4 object-contain" />,
      defaultWidth: 720,
      defaultHeight: 460,
    },
  };

  const getActiveAppTitle = () => {
    if (!activeAppId) return 'Finder';
    return APP_CONFIGS[activeAppId]?.title || 'Finder';
  };

  return (
    <div
      onClick={closeContextMenu}
      onContextMenu={handleContextMenu}
      className="macos-root fixed inset-0 w-screen h-screen overflow-hidden select-none bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      {/* Desktop Only / Screen Size Gate */}
      <DesktopOnlyGate osName="macOS" />

      {/* Boot Screen Overlay */}
      {bootState === 'booting' && <MacBootScreen onBootComplete={() => setBootState('locked')} />}

      {/* Lock Screen Overlay */}
      {bootState === 'locked' && <MacLockScreen wallpaperUrl={wallpaper} onUnlock={handleLogin} />}

      {/* Top Menu Bar */}
      <MenuBar
        activeAppTitle={getActiveAppTitle()}
        activeAppId={activeAppId}
        onOpenApp={openApp}
        onToggleSpotlight={() => setIsSpotlightOpen((prev) => !prev)}
        onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onLock={handleLock}
        onRestart={handleRestart}
        onExit={handleExit}
      />

      {/* Desktop Icons Grid */}
      <div className="absolute top-10 right-4 flex flex-col gap-5 z-10">
        {DESKTOP_ICONS.map((icon) => (
          <div
            key={icon.id}
            onDoubleClick={() => {
              if (icon.url) {
                openUrlInSafari(icon.url);
              } else {
                openApp(icon.appId);
              }
            }}
            className="flex flex-col items-center gap-1 w-20 p-1.5 rounded-xl hover:bg-white/15 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={icon.icon}
                alt={icon.name}
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform pointer-events-none"
              />
            </div>
            <span className="text-[11px] font-medium text-white text-center leading-tight tracking-tight px-1.5 py-0.5 rounded group-hover:bg-blue-600 drop-shadow truncate w-full">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* Active Windows Stack */}
      {openApps.map((appId) => {
        const config = APP_CONFIGS[appId];
        const state = windowsState[appId] || { minimized: false, maximized: false, zIndex: 10 };
        if (!config) return null;

        return (
          <MacWindowManager
            key={appId}
            winConfig={{
              ...config,
              content: renderMacAppContent(appId),
              minimized: state.minimized,
              maximized: state.maximized,
              zIndex: state.zIndex,
            }}
            isActive={activeAppId === appId}
            onFocus={() => focusApp(appId)}
            onMinimize={() => toggleMinimize(appId)}
            onMaximize={() => toggleMaximize(appId)}
            onClose={() => closeApp(appId)}
          />
        );
      })}

      {/* Bottom Floating Glass Dock */}
      <Dock
        openApps={openApps}
        activeAppId={activeAppId}
        onOpenApp={openApp}
        onToggleMinimize={toggleMinimize}
        onOpenLaunchpad={() => setIsLaunchpadOpen(true)}
      />

      {/* Control Center Flyout */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        onOpenSettings={() => {
          openApp('settings');
          setIsControlCenterOpen(false);
        }}
      />

      {/* Spotlight Search Modal */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenApp={openApp}
      />

      {/* Launchpad Overlay */}
      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        onOpenApp={openApp}
      />

      {/* About This Mac Modal */}
      <AboutThisMacModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* App Switcher HUD (Cmd+Tab) */}
      {isAppSwitcherOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center pointer-events-none">
          <div className="bg-[#1e1e24]/85 border border-white/20 rounded-3xl p-4 shadow-2xl backdrop-blur-3xl flex items-center gap-3 animate-macos-scale-in">
            {openApps.map((appId, idx) => {
              const isSelected = idx === switcherIndex;
              const iconSrc = (MACOS_ICONS as Record<string, string>)[appId] || MACOS_ICONS.finder;
              const appTitle = MAC_APPS_META[appId]?.title || appId;
              return (
                <div
                  key={appId}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
                    isSelected ? 'bg-white/20 shadow-lg scale-105 border border-white/30' : 'opacity-60'
                  }`}
                >
                  <img src={iconSrc} alt={appTitle} className="w-14 h-14 drop-shadow-md mb-1.5" />
                  <span className="text-[11px] font-semibold text-white truncate max-w-[70px]">{appTitle}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Force Quit Applications Dialog (Cmd+Option+Esc) */}
      {isForceQuitOpen && (
        <div className="fixed inset-0 z-[650] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-80 bg-[#1e1e24]/95 border border-white/20 rounded-2xl shadow-2xl p-4 text-white text-xs backdrop-blur-2xl animate-macos-scale-in">
            <h3 className="font-bold text-sm mb-1">Force Quit Applications</h3>
            <p className="text-zinc-400 text-[11px] mb-3">If an app doesn't respond, select it and click Force Quit.</p>
            <div className="bg-black/30 border border-white/10 rounded-xl p-1 mb-4 max-h-44 overflow-y-auto">
              {openApps.map((appId) => {
                const iconSrc = (MACOS_ICONS as Record<string, string>)[appId] || MACOS_ICONS.finder;
                const appTitle = MAC_APPS_META[appId]?.title || appId;
                return (
                  <button
                    key={appId}
                    onClick={() => focusApp(appId)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600/50 text-left transition-colors"
                  >
                    <img src={iconSrc} alt={appTitle} className="w-5 h-5" />
                    <span className="font-medium text-xs truncate flex-1">{appTitle}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsForceQuitOpen(false)}
                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-medium"
              >
                Done
              </button>
              {activeAppId && (
                <button
                  onClick={() => {
                    closeApp(activeAppId);
                    setIsForceQuitOpen(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 font-bold"
                >
                  Force Quit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screen Flash on Screenshot (Cmd+Shift+4) */}
      {screenFlash && <div className="fixed inset-0 z-[1000] bg-white opacity-80 pointer-events-none transition-opacity duration-200" />}

      {/* Desktop Context Menu */}
      {contextMenu.visible && (
        <div
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-[400] w-52 bg-[#1e1e24]/95 border border-white/15 rounded-xl shadow-2xl p-1 text-xs text-white backdrop-blur-3xl animate-macos-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              openApp('finder');
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center justify-between"
          >
            <span>New Folder</span>
            <span className="text-[10px] text-white/50">⇧⌘N</span>
          </button>
          <button
            onClick={() => {
              openApp('settings');
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600"
          >
            <span>Change Wallpaper...</span>
          </button>
          <div className="h-px bg-white/10 my-1" />
          <button
            onClick={() => {
              setIsAboutModalOpen(true);
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600"
          >
            <span>Get Info</span>
          </button>
          <button
            onClick={() => {
              handleRestart();
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600"
          >
            <span>Clean Up Desktop</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MacOSPage;
