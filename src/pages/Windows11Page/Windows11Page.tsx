import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaRedo,
  FaDesktop,
  FaTerminal,
  FaLock,
  FaPowerOff,
} from 'react-icons/fa';

import './windows11.css';
import { WIN11_ICONS } from '../../components/Windows11/icons';
import Taskbar from '../../components/Windows11/Taskbar';
import StartMenu from '../../components/Windows11/StartMenu';
import QuickSettings from '../../components/Windows11/QuickSettings';
import CalendarFlyout from '../../components/Windows11/CalendarFlyout';
import WidgetsPanel from '../../components/Windows11/WidgetsPanel';
import WindowManager, { WindowConfig } from '../../components/Windows11/WindowManager';

import TerminalApp from '../../components/Windows11/Apps/TerminalApp';
import FileExplorerApp from '../../components/Windows11/Apps/FileExplorerApp';
import NotepadApp from '../../components/Windows11/Apps/NotepadApp';
import VSCodeApp from '../../components/Windows11/Apps/VSCodeApp';
import SettingsApp, { WALLPAPERS } from '../../components/Windows11/Apps/SettingsApp';
import MailApp from '../../components/Windows11/Apps/MailApp';
import EdgeBrowserApp from '../../components/Windows11/Apps/EdgeBrowserApp';
import CopilotApp from '../../components/Windows11/Apps/CopilotApp';
import TaskManagerApp from '../../components/Windows11/Apps/TaskManagerApp';
import PhotosApp from '../../components/Windows11/Apps/PhotosApp';
import CalculatorApp from '../../components/Windows11/Apps/CalculatorApp';
import SpotifyApp from '../../components/Windows11/Apps/SpotifyApp';
import PaintApp from '../../components/Windows11/Apps/PaintApp';
import StoreApp from '../../components/Windows11/Apps/StoreApp';
import TeamsApp from '../../components/Windows11/Apps/TeamsApp';
import OfficeApp from '../../components/Windows11/Apps/OfficeApp';
import RecycleBinApp from '../../components/Windows11/Apps/RecycleBinApp';
import CameraApp from '../../components/Windows11/Apps/CameraApp';
import BootScreen from '../../components/Windows11/BootScreen';
import LockScreen from '../../components/Windows11/LockScreen';

export const Windows11Page: React.FC = () => {
  const navigate = useNavigate();
  // Keep user logged in until they explicitly exit or restart
  const [bootState, setBootState] = useState<'booting' | 'locked' | 'desktop'>(() => {
    const isLoggedIn = localStorage.getItem('win11_session_logged_in');
    return isLoggedIn === 'true' ? 'desktop' : 'booting';
  });

  const handleLogin = () => {
    localStorage.setItem('win11_session_logged_in', 'true');
    setBootState('desktop');
  };

  const handleLock = () => {
    setBootState('locked');
  };

  const handleRestart = () => {
    localStorage.removeItem('win11_session_logged_in');
    setBootState('booting');
  };

  const handleExit = () => {
    localStorage.removeItem('win11_session_logged_in');
    navigate('/');
  };

  // Persisted Wallpaper
  const [wallpaper, setWallpaper] = useState<string>(() => {
    return localStorage.getItem('win11_wallpaper') || WALLPAPERS[0].url;
  });

  useEffect(() => {
    localStorage.setItem('win11_wallpaper', wallpaper);
  }, [wallpaper]);

  // Persisted Open Apps (Excluding camera so it never auto-activates on reload)
  const [openApps, setOpenApps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('win11_open_apps');
      const parsed = saved ? JSON.parse(saved) : ['explorer'];
      return Array.isArray(parsed) ? parsed.filter((id) => id !== 'camera') : ['explorer'];
    } catch {
      return ['explorer'];
    }
  });

  useEffect(() => {
    const nonTransient = openApps.filter((id) => id !== 'camera');
    localStorage.setItem('win11_open_apps', JSON.stringify(nonTransient));
  }, [openApps]);

  const [activeAppId, setActiveAppId] = useState<string | null>('explorer');
  const [maxZIndex, setMaxZIndex] = useState(100);

  // Flyouts
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);

  // Desktop and Icon Context Menus
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    targetIcon?: string | null;
  }>({
    x: 0,
    y: 0,
    visible: false,
    targetIcon: null,
  });

  // Selected desktop icon
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);

  // Persisted Window states
  const [windowsState, setWindowsState] = useState<Record<string, { minimized: boolean; maximized: boolean; zIndex: number }>>(() => {
    try {
      const saved = localStorage.getItem('win11_windows_state');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      thispc: { minimized: false, maximized: false, zIndex: 10 },
      explorer: { minimized: false, maximized: false, zIndex: 10 },
      terminal: { minimized: false, maximized: false, zIndex: 11 },
      copilot: { minimized: false, maximized: false, zIndex: 12 },
      vscode: { minimized: false, maximized: false, zIndex: 13 },
      photos: { minimized: false, maximized: false, zIndex: 14 },
      notepad: { minimized: false, maximized: false, zIndex: 15 },
      spotify: { minimized: false, maximized: false, zIndex: 16 },
      taskManager: { minimized: false, maximized: false, zIndex: 17 },
      calculator: { minimized: false, maximized: false, zIndex: 18 },
      settings: { minimized: false, maximized: false, zIndex: 19 },
      mail: { minimized: false, maximized: false, zIndex: 20 },
      edge: { minimized: false, maximized: false, zIndex: 21 },
    };
  });

  useEffect(() => {
    localStorage.setItem('win11_windows_state', JSON.stringify(windowsState));
  }, [windowsState]);

  const closeAllFlyouts = () => {
    setIsStartOpen(false);
    setIsQuickSettingsOpen(false);
    setIsCalendarOpen(false);
    setIsWidgetsOpen(false);
    setContextMenu({ x: 0, y: 0, visible: false, targetIcon: null });
  };

  const focusApp = (appId: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveAppId(appId);
    setWindowsState((prev) => ({
      ...prev,
      [appId]: { ...(prev[appId] || { minimized: false, maximized: false }), minimized: false, zIndex: nextZ },
    }));
  };

  const openApp = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps((prev) => [...prev, appId]);
    }
    focusApp(appId);
  };

  const closeApp = (appId: string) => {
    if (appId === 'camera') {
      if ((window as any).__activeCameraStream) {
        try {
          const stream = (window as any).__activeCameraStream as MediaStream;
          stream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          (window as any).__activeCameraStream = null;
        } catch {}
      }

      const updated = openApps.filter((id) => id !== 'camera');
      setOpenApps(updated);
      localStorage.setItem('win11_open_apps', JSON.stringify(updated));
      window.location.reload();
      return;
    }

    setOpenApps((prev) => prev.filter((id) => id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const toggleMinimize = (appId: string) => {
    const current = windowsState[appId];
    if (!current) return;

    if (activeAppId === appId && !current.minimized) {
      setWindowsState((prev) => ({
        ...prev,
        [appId]: { ...prev[appId], minimized: true },
      }));
      setActiveAppId(null);
    } else {
      focusApp(appId);
    }
  };

  const toggleMaximize = (appId: string) => {
    setWindowsState((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], maximized: !prev[appId]?.maximized },
    }));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 280),
      visible: true,
      targetIcon: null,
    });
  };

  const handleIconContextMenu = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDesktopIcon(iconId);
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 240),
      visible: true,
      targetIcon: iconId,
    });
  };

  // ══════════════════════════════════════════════════════
  // GLOBAL WINDOWS 11 KEYBOARD SHORTCUTS ENGINE
  // ══════════════════════════════════════════════════════
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing inside an active input or textarea
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      // 1. Escape key: Close all menus, flyouts, and context menus
      if (e.key === 'Escape') {
        closeAllFlyouts();
        setSelectedDesktopIcon(null);
        return;
      }

      // 2. Windows Key / Ctrl+Esc: Toggle Start Menu
      if ((e.key === 'Meta' && !isTyping) || (e.ctrlKey && e.key === 'Escape')) {
        e.preventDefault();
        setIsStartOpen((prev) => !prev);
        setIsQuickSettingsOpen(false);
        setIsCalendarOpen(false);
        setIsWidgetsOpen(false);
        return;
      }

      // 3. Win+E / Alt+E: Open File Explorer / This PC
      if ((e.metaKey || e.altKey) && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        openApp('thispc');
        return;
      }

      // 4. Win+T / Alt+T: Open PowerShell Terminal
      if ((e.metaKey || e.altKey) && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        openApp('terminal');
        return;
      }

      // 5. Win+L / Alt+L: Lock Screen
      if ((e.metaKey || e.altKey) && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        handleLock();
        return;
      }

      // 6. Win+D / Alt+D: Show Desktop (Minimize all)
      if ((e.metaKey || e.altKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        setWindowsState((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((id) => {
            updated[id] = { ...updated[id], minimized: true };
          });
          return updated;
        });
        setActiveAppId(null);
        closeAllFlyouts();
        return;
      }

      // 7. Desktop Keyboard Navigation (Arrow Keys + Enter)
      if (!isTyping && DESKTOP_SHORTCUTS.length > 0) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const curIndex = DESKTOP_SHORTCUTS.findIndex((s) => s.id === selectedDesktopIcon);
          const nextIndex = curIndex === -1 ? 0 : (curIndex + 1) % DESKTOP_SHORTCUTS.length;
          setSelectedDesktopIcon(DESKTOP_SHORTCUTS[nextIndex].id);
          return;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const curIndex = DESKTOP_SHORTCUTS.findIndex((s) => s.id === selectedDesktopIcon);
          const prevIndex = curIndex === -1 ? DESKTOP_SHORTCUTS.length - 1 : (curIndex - 1 + DESKTOP_SHORTCUTS.length) % DESKTOP_SHORTCUTS.length;
          setSelectedDesktopIcon(DESKTOP_SHORTCUTS[prevIndex].id);
          return;
        }

        // Enter key to open selected shortcut
        if (e.key === 'Enter' && selectedDesktopIcon) {
          e.preventDefault();
          const shortcut = DESKTOP_SHORTCUTS.find((s) => s.id === selectedDesktopIcon);
          if (shortcut) {
            if (shortcut.action) {
              shortcut.action();
            } else {
              openApp(shortcut.id);
            }
          }
          return;
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedDesktopIcon, openApps, maxZIndex, windowsState]);

  const [edgeUrl, setEdgeUrl] = useState('https://sociantra.ashishchanchal.in/');

  const openUrlInEdge = (url: string) => {
    setEdgeUrl(url);
    openApp('edge');
  };

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'thispc':
        return <FileExplorerApp onOpenInEdge={openUrlInEdge} initialFolder="ThisPC" />;
      case 'explorer':
        return <FileExplorerApp onOpenInEdge={openUrlInEdge} initialFolder="Projects" />;
      case 'copilot':
        return <CopilotApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'photos':
        return <PhotosApp />;
      case 'taskManager':
        return <TaskManagerApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'spotify':
        return <SpotifyApp />;
      case 'notepad':
        return <NotepadApp />;
      case 'vscode':
        return <VSCodeApp />;
      case 'settings':
        return <SettingsApp currentWallpaper={wallpaper} setWallpaper={setWallpaper} />;
      case 'mail':
        return <MailApp />;
      case 'edge':
        return <EdgeBrowserApp initialUrl={edgeUrl} />;
      case 'paint':
        return <PaintApp />;
      case 'store':
        return <StoreApp onOpenApp={openApp} onOpenInEdge={openUrlInEdge} />;
      case 'teams':
        return <TeamsApp />;
      case 'excel':
        return <OfficeApp type="excel" />;
      case 'powerpoint':
        return <OfficeApp type="powerpoint" />;
      case 'recycle':
        return <RecycleBinApp />;
      case 'camera':
        return <CameraApp />;
      default:
        return null;
    }
  };

  // App definitions metadata
  const APP_CONFIGS: Record<string, Omit<WindowConfig, 'minimized' | 'maximized' | 'zIndex' | 'content'>> = {
    thispc: {
      id: 'thispc',
      title: 'This PC — System Partitions & Storage Devices',
      icon: <img src={WIN11_ICONS.thisPc} alt="This PC" className="w-4 h-4 object-contain" />,
      defaultWidth: 940,
      defaultHeight: 580,
    },
    copilot: {
      id: 'copilot',
      title: 'Windows Copilot — Ashish Portfolio AI Assistant',
      icon: <img src={WIN11_ICONS.copilot} alt="Copilot" className="w-4 h-4 object-contain" />,
      defaultWidth: 540,
      defaultHeight: 620,
    },
    explorer: {
      id: 'explorer',
      title: 'File Explorer — C:\\Users\\Ashish\\Portfolio',
      icon: <img src={WIN11_ICONS.explorer} alt="Explorer" className="w-4 h-4 object-contain" />,
      defaultWidth: 920,
      defaultHeight: 580,
    },
    terminal: {
      id: 'terminal',
      title: 'Windows PowerShell (Administrator) — Ashish Dev Rig',
      icon: <img src={WIN11_ICONS.terminal} alt="Terminal" className="w-4 h-4 object-contain" />,
      defaultWidth: 780,
      defaultHeight: 480,
    },
    photos: {
      id: 'photos',
      title: 'Photos — Project Screenshots & Research Visualizer',
      icon: <img src={WIN11_ICONS.photos} alt="Photos" className="w-4 h-4 object-contain" />,
      defaultWidth: 860,
      defaultHeight: 560,
    },
    taskManager: {
      id: 'taskManager',
      title: 'Task Manager — Processes & Performance',
      icon: <img src={WIN11_ICONS.taskManager} alt="Task Manager" className="w-4 h-4 object-contain" />,
      defaultWidth: 820,
      defaultHeight: 520,
    },
    calculator: {
      id: 'calculator',
      title: 'Calculator',
      icon: <img src={WIN11_ICONS.calculator} alt="Calculator" className="w-4 h-4 object-contain" />,
      defaultWidth: 340,
      defaultHeight: 480,
    },
    spotify: {
      id: 'spotify',
      title: 'Spotify — Developer Ambient & Focus Tracks',
      icon: <img src={WIN11_ICONS.spotify} alt="Spotify" className="w-4 h-4 object-contain" />,
      defaultWidth: 700,
      defaultHeight: 480,
    },
    notepad: {
      id: 'notepad',
      title: 'About_Ashish_Chronicle.txt — Notepad',
      icon: <img src={WIN11_ICONS.notepad} alt="Notepad" className="w-4 h-4 object-contain" />,
      defaultWidth: 700,
      defaultHeight: 520,
    },
    vscode: {
      id: 'vscode',
      title: 'Visual Studio Code — Portfolio Core Workspace',
      icon: <img src={WIN11_ICONS.vscode} alt="VS Code" className="w-4 h-4 object-contain" />,
      defaultWidth: 980,
      defaultHeight: 600,
    },
    settings: {
      id: 'settings',
      title: 'Settings — Windows 11 Personalization & Telemetry',
      icon: <img src={WIN11_ICONS.settings} alt="Settings" className="w-4 h-4 object-contain" />,
      defaultWidth: 840,
      defaultHeight: 540,
    },
    mail: {
      id: 'mail',
      title: 'Outlook Mail — Contact Ashish Chanchal',
      icon: <img src={WIN11_ICONS.mail} alt="Mail" className="w-4 h-4 object-contain" />,
      defaultWidth: 760,
      defaultHeight: 500,
    },
    edge: {
      id: 'edge',
      title: 'Microsoft Edge — Ashish Featured Portfolio Hub',
      icon: <img src={WIN11_ICONS.edge} alt="Edge" className="w-4 h-4 object-contain" />,
      defaultWidth: 920,
      defaultHeight: 560,
    },
    paint: {
      id: 'paint',
      title: 'Paint 3D — Canvas & Sketch Studio',
      icon: <img src={WIN11_ICONS.paint} alt="Paint" className="w-4 h-4 object-contain" />,
      defaultWidth: 840,
      defaultHeight: 560,
    },
    store: {
      id: 'store',
      title: 'Microsoft Store — Developer App & AI Model Hub',
      icon: <img src={WIN11_ICONS.store} alt="Store" className="w-4 h-4 object-contain" />,
      defaultWidth: 880,
      defaultHeight: 560,
    },
    teams: {
      id: 'teams',
      title: 'Microsoft Teams — Connect & Collaborate with Ashish',
      icon: <img src={WIN11_ICONS.teams} alt="Teams" className="w-4 h-4 object-contain" />,
      defaultWidth: 820,
      defaultHeight: 520,
    },
    excel: {
      id: 'excel',
      title: 'Excel — Engineering_Impact_Metrics.xlsx',
      icon: <img src={WIN11_ICONS.excel} alt="Excel" className="w-4 h-4 object-contain" />,
      defaultWidth: 860,
      defaultHeight: 540,
    },
    powerpoint: {
      id: 'powerpoint',
      title: 'PowerPoint — Ashish_Engineering_Keynote.pptx',
      icon: <img src={WIN11_ICONS.powerpoint} alt="PowerPoint" className="w-4 h-4 object-contain" />,
      defaultWidth: 880,
      defaultHeight: 550,
    },
    recycle: {
      id: 'recycle',
      title: 'Recycle Bin',
      icon: <img src={WIN11_ICONS.recycle} alt="Recycle Bin" className="w-4 h-4 object-contain" />,
      defaultWidth: 760,
      defaultHeight: 480,
    },
    camera: {
      id: 'camera',
      title: 'Windows Camera // Studio Vision',
      icon: <img src={WIN11_ICONS.camera || WIN11_ICONS.photos} alt="Camera" className="w-4 h-4 object-contain" />,
      defaultWidth: 840,
      defaultHeight: 560,
    },
  };

  const DESKTOP_SHORTCUTS = [
    { id: 'thispc', name: 'This PC', icon: <img src={WIN11_ICONS.thisPc} alt="This PC" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'copilot', name: 'Copilot AI Assistant', icon: <img src={WIN11_ICONS.copilot} alt="Copilot" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'explorer', name: 'Projects Explorer', icon: <img src={WIN11_ICONS.explorer} alt="Explorer" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'terminal', name: 'PowerShell Terminal', icon: <img src={WIN11_ICONS.terminal} alt="PowerShell" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'vscode', name: 'VS Code Studio', icon: <img src={WIN11_ICONS.vscode} alt="VS Code" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'camera', name: 'Camera Studio', icon: <img src={WIN11_ICONS.camera || WIN11_ICONS.photos} alt="Camera" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'photos', name: 'Photos Gallery', icon: <img src={WIN11_ICONS.photos} alt="Photos" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'spotify', name: 'Spotify Music', icon: <img src={WIN11_ICONS.spotify} alt="Spotify" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'taskManager', name: 'Task Manager', icon: <img src={WIN11_ICONS.taskManager} alt="Task Manager" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'calculator', name: 'Calculator', icon: <img src={WIN11_ICONS.calculator} alt="Calculator" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'notepad', name: 'About_Ashish.txt', icon: <img src={WIN11_ICONS.notepad} alt="Notepad" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'edge', name: 'Microsoft Edge', icon: <img src={WIN11_ICONS.edge} alt="Edge" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'mail', name: 'Outlook Contact', icon: <img src={WIN11_ICONS.mail} alt="Mail" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'paint', name: 'Paint 3D', icon: <img src={WIN11_ICONS.paint} alt="Paint" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'store', name: 'Microsoft Store', icon: <img src={WIN11_ICONS.store} alt="Store" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'teams', name: 'Microsoft Teams', icon: <img src={WIN11_ICONS.teams} alt="Teams" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'excel', name: 'Impact Metrics.xlsx', icon: <img src={WIN11_ICONS.excel} alt="Excel" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'powerpoint', name: 'Engineering Deck.pptx', icon: <img src={WIN11_ICONS.powerpoint} alt="PowerPoint" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'settings', name: 'Settings & Specs', icon: <img src={WIN11_ICONS.settings} alt="Settings" className="w-10 h-10 object-contain drop-shadow" /> },
    { id: 'recycle', name: 'Recycle Bin', icon: <img src={WIN11_ICONS.recycle} alt="Recycle" className="w-10 h-10 object-contain drop-shadow" /> },
    {
      id: 'exit-web',
      name: 'Exit to Web Portfolio',
      icon: <FaSignOutAlt className="text-amber-300 w-9 h-9 drop-shadow" />,
      action: handleExit,
    },
  ];

  if (bootState === 'booting') {
    return <BootScreen onBootComplete={() => setBootState('locked')} />;
  }

  if (bootState === 'locked') {
    return <LockScreen wallpaper={wallpaper} onLogin={handleLogin} />;
  }

  return (
    <div
      onClick={closeAllFlyouts}
      onContextMenu={handleContextMenu}
      className="fixed inset-0 overflow-hidden select-none bg-black animate-fadeIn"
      style={{
        backgroundImage: `url("${wallpaper}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Helmet>
        <title>Windows 11 OS Experience // Ashish Chanchal</title>
        <meta
          name="description"
          content="Interactive Windows 11 Operating System simulator showcasing Ashish Chanchal's software engineering portfolio, project files, PowerShell terminal, and system telemetry."
        />
      </Helmet>

      {/* ══════════════════════════════════════════════════════
           DESKTOP ICONS MULTI-COLUMN WRAPPING GRID (Never overflows onto taskbar)
      ══════════════════════════════════════════════════════ */}
      <div className="absolute top-3 left-3 bottom-14 flex flex-col flex-wrap gap-1 z-10 max-h-[calc(100vh-68px)] overflow-visible">
        {DESKTOP_SHORTCUTS.map((item) => (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDesktopIcon(item.id);
              setContextMenu({ x: 0, y: 0, visible: false, targetIcon: null });
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setContextMenu({ x: 0, y: 0, visible: false, targetIcon: null });
              if (item.action) {
                item.action();
              } else {
                openApp(item.id);
              }
            }}
            onContextMenu={(e) => handleIconContextMenu(e, item.id)}
            className={`w-24 p-1.5 flex flex-col items-center gap-1 cursor-pointer win11-desktop-icon text-center ${
              selectedDesktopIcon === item.id ? 'selected' : ''
            }`}
          >
            <div className="drop-shadow-lg">{item.icon}</div>
            <span className="text-[11px] text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] leading-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
           RIGHT-CLICK CONTEXT MENU (Desktop vs Icon specific)
      ══════════════════════════════════════════════════════ */}
      {contextMenu.visible && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="absolute win11-mica rounded-lg p-1.5 z-[99999] shadow-2xl border border-white/10 w-52 text-xs text-white space-y-0.5 animate-cinematic-zoom font-sans"
        >
          {contextMenu.targetIcon ? (
            /* Icon-Specific Context Menu */
            <>
              <div className="px-3 py-1 text-[10px] text-zinc-400 font-bold border-b border-white/10 uppercase tracking-wider">
                {DESKTOP_SHORTCUTS.find((s) => s.id === contextMenu.targetIcon)?.name || 'Application'}
              </div>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  const shortcut = DESKTOP_SHORTCUTS.find((s) => s.id === contextMenu.targetIcon);
                  if (shortcut) {
                    if (shortcut.action) shortcut.action();
                    else openApp(shortcut.id);
                  }
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 font-bold text-white"
              >
                <span>Open</span>
              </button>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  const shortcut = DESKTOP_SHORTCUTS.find((s) => s.id === contextMenu.targetIcon);
                  if (shortcut) {
                    if (shortcut.action) shortcut.action();
                    else openApp(shortcut.id);
                  }
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <span>Run as administrator</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  openApp('explorer');
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <span>Show file location</span>
              </button>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  openApp('settings');
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <span>Properties</span>
              </button>
            </>
          ) : (
            /* Desktop General Context Menu */
            <>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>View</span>
                <span className="text-[10px] text-zinc-400">&gt;</span>
              </button>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>Sort by</span>
                <span className="text-[10px] text-zinc-400">&gt;</span>
              </button>
              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  window.location.reload();
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2"
              >
                <FaRedo className="w-3 h-3 text-blue-400" />
                <span>Refresh</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => {
                  openApp('settings');
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2"
              >
                <FaDesktop className="w-3 h-3 text-amber-400" />
                <span>Personalize Wallpaper</span>
              </button>

              <button
                onClick={() => {
                  openApp('terminal');
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2"
              >
                <FaTerminal className="w-3 h-3 text-blue-400" />
                <span>Open in PowerShell</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  handleLock();
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <FaLock className="w-3 h-3 text-blue-400" />
                <span>Lock Screen</span>
              </button>

              <button
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false });
                  handleRestart();
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <FaPowerOff className="w-3 h-3 text-amber-400" />
                <span>Restart Windows 11</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={handleExit}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-amber-300 font-bold"
              >
                <FaSignOutAlt className="w-3 h-3" />
                <span>Exit to Web Portfolio</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
           ACTIVE WINDOWS CONTAINER
      ══════════════════════════════════════════════════════ */}
      {openApps.map((appId) => {
        const config = APP_CONFIGS[appId];
        const state = windowsState[appId] || { minimized: false, maximized: false, zIndex: 10 };
        if (!config) return null;

        return (
          <WindowManager
            key={appId}
            winConfig={{
              ...config,
              content: renderAppContent(appId),
              minimized: state.minimized,
              maximized: state.maximized,
              zIndex: state.zIndex,
            }}
            onFocus={() => focusApp(appId)}
            onMinimize={() => toggleMinimize(appId)}
            onMaximize={() => toggleMaximize(appId)}
            onClose={() => closeApp(appId)}
          />
        );
      })}

      {/* ══════════════════════════════════════════════════════
           FLYOUT MENUS (Start Menu, Quick Settings, Calendar, Widgets)
      ══════════════════════════════════════════════════════ */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        openApp={openApp}
        openUrlInEdge={openUrlInEdge}
        onLock={handleLock}
        onRestart={handleRestart}
        onExit={handleExit}
      />

      <QuickSettings
        isOpen={isQuickSettingsOpen}
        onClose={() => setIsQuickSettingsOpen(false)}
      />

      <CalendarFlyout
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <WidgetsPanel
        isOpen={isWidgetsOpen}
        onClose={() => setIsWidgetsOpen(false)}
      />

      {/* ══════════════════════════════════════════════════════
           BOTTOM TASKBAR
      ══════════════════════════════════════════════════════ */}
      <Taskbar
        openApps={openApps}
        activeAppId={activeAppId}
        onToggleApp={(id) => {
          if (!openApps.includes(id)) {
            openApp(id);
          } else {
            toggleMinimize(id);
          }
        }}
        onToggleStartMenu={() => {
          setIsStartOpen(!isStartOpen);
          setIsQuickSettingsOpen(false);
          setIsCalendarOpen(false);
          setIsWidgetsOpen(false);
        }}
        onToggleQuickSettings={() => {
          setIsQuickSettingsOpen(!isQuickSettingsOpen);
          setIsStartOpen(false);
          setIsCalendarOpen(false);
          setIsWidgetsOpen(false);
        }}
        onToggleCalendar={() => {
          setIsCalendarOpen(!isCalendarOpen);
          setIsStartOpen(false);
          setIsQuickSettingsOpen(false);
          setIsWidgetsOpen(false);
        }}
        onToggleWidgets={() => {
          setIsWidgetsOpen(!isWidgetsOpen);
          setIsStartOpen(false);
          setIsQuickSettingsOpen(false);
          setIsCalendarOpen(false);
        }}
        isStartOpen={isStartOpen}
        isQuickSettingsOpen={isQuickSettingsOpen}
        isCalendarOpen={isCalendarOpen}
        isWidgetsOpen={isWidgetsOpen}
      />
    </div>
  );
};

export default Windows11Page;
