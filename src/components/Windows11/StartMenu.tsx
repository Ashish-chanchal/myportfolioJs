import React, { useState } from 'react';
import {
  FaPowerOff,
  FaSignOutAlt,
  FaLock,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { WIN11_ICONS } from './icons';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openApp: (appId: string) => void;
  openUrlInEdge?: (url: string) => void;
  onLock?: () => void;
  onRestart?: () => void;
  onExit?: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  openApp,
  openUrlInEdge,
  onLock,
  onRestart,
  onExit,
}) => {
  const [search, setSearch] = useState('');
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const PINNED_APPS = [
    { id: 'thispc', name: 'This PC', icon: WIN11_ICONS.thisPc },
    { id: 'copilot', name: 'Copilot AI', icon: WIN11_ICONS.copilot },
    { id: 'explorer', name: 'File Explorer', icon: WIN11_ICONS.explorer },
    { id: 'terminal', name: 'PowerShell', icon: WIN11_ICONS.terminal },
    { id: 'vscode', name: 'VS Code', icon: WIN11_ICONS.vscode },
    { id: 'photos', name: 'Photos Gallery', icon: WIN11_ICONS.photos },
    { id: 'notepad', name: 'Notepad', icon: WIN11_ICONS.notepad },
    { id: 'spotify', name: 'Spotify Player', icon: WIN11_ICONS.spotify },
    { id: 'taskManager', name: 'Task Manager', icon: WIN11_ICONS.taskManager },
    { id: 'calculator', name: 'Calculator', icon: WIN11_ICONS.calculator },
    { id: 'edge', name: 'Edge Browser', icon: WIN11_ICONS.edge },
    { id: 'mail', name: 'Outlook Mail', icon: WIN11_ICONS.mail },
    { id: 'settings', name: 'Settings', icon: WIN11_ICONS.settings },
    { id: 'paint', name: 'Paint 3D', icon: WIN11_ICONS.paint },
    { id: 'camera', name: 'Camera', icon: WIN11_ICONS.camera || WIN11_ICONS.photos },
    { id: 'store', name: 'Microsoft Store', icon: WIN11_ICONS.store },
    { id: 'teams', name: 'Microsoft Teams', icon: WIN11_ICONS.teams },
    { id: 'excel', name: 'Excel Sheet', icon: WIN11_ICONS.excel },
    { id: 'powerpoint', name: 'PowerPoint', icon: WIN11_ICONS.powerpoint },
    { id: 'github', name: 'GitHub Profile', icon: WIN11_ICONS.github, ext: 'https://github.com/Ashish-chanchal' },
    { id: 'linkedin', name: 'LinkedIn', icon: WIN11_ICONS.linkedin, ext: 'https://www.linkedin.com/in/ashishchanchal/' },
    { id: 'twitter', name: 'X / Twitter', icon: WIN11_ICONS.twitter, ext: 'https://x.com/ashishchanchal0' },
    { id: 'instagram', name: 'Instagram', icon: WIN11_ICONS.instagram, ext: 'https://www.instagram.com/ashish._chanchal/' },
    { id: 'resume', name: 'Resume PDF', icon: WIN11_ICONS.pdf, ext: 'https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link' },
    { id: 'word', name: 'Bio Document', icon: WIN11_ICONS.word },
    { id: 'recycle', name: 'Recycle Bin', icon: WIN11_ICONS.recycle },
  ];

  const filteredApps = PINNED_APPS.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[95vw] max-w-[560px] h-[580px] win11-mica rounded-xl p-6 flex flex-col justify-between z-[9999] shadow-2xl animate-cinematic-zoom select-none"
    >
      <div className="space-y-5">
        {/* Windows 11 Search Box */}
        <div className="relative">
          <img src={WIN11_ICONS.search} alt="Search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 object-contain" />
          <input
            type="text"
            placeholder="Type here to search apps, files, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c22]/90 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:bg-[#25252c]"
            autoFocus
          />
        </div>

        {/* Pinned Section */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-white px-2 mb-3">
            <span>Pinned Apps</span>
            <span className="text-[11px] text-blue-400 font-normal hover:underline cursor-pointer">
              All apps ({PINNED_APPS.length}) &gt;
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  if (app.ext) {
                    if (openUrlInEdge) {
                      openUrlInEdge(app.ext);
                    } else {
                      openApp('edge');
                    }
                  } else if (app.id === 'word') {
                    openApp('notepad');
                  } else {
                    openApp(app.id);
                  }
                  onClose();
                }}
                className="p-2.5 rounded-lg hover:bg-white/10 flex flex-col items-center gap-1.5 transition-all text-center win11-btn group"
              >
                <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform drop-shadow" />
                <span className="text-[11px] text-zinc-300 font-medium truncate w-full">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Files Section */}
        <div>
          <div className="text-xs font-bold text-white px-2 mb-2">Recommended</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              onClick={() => {
                openApp('notepad');
                onClose();
              }}
              className="p-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 cursor-pointer transition-all border border-transparent hover:border-white/10 bg-[#16161c]/60"
            >
              <img src={WIN11_ICONS.word} alt="Doc" className="w-7 h-7 object-contain flex-shrink-0" />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">About_Ashish_Chronicle.docx</div>
                <div className="text-[10px] text-zinc-400">Software Developer & AI Systems</div>
              </div>
            </div>

            <div
              onClick={() => {
                openApp('explorer');
                onClose();
              }}
              className="p-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 cursor-pointer transition-all border border-transparent hover:border-white/10 bg-[#16161c]/60"
            >
              <img src={WIN11_ICONS.explorer} alt="Folder" className="w-7 h-7 object-contain flex-shrink-0" />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">Projects_Repository</div>
                <div className="text-[10px] text-zinc-400">TODOAI, Sociantra, VibePulse</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Power Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
            AC
          </div>
          <div>
            <div className="text-xs font-bold text-white">Ashish Chanchal</div>
            <div className="text-[10px] text-zinc-400">Administrator · Online</div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowPowerMenu(!showPowerMenu)}
            className="p-2 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
            title="Power Menu"
          >
            <FaPowerOff className="w-3.5 h-3.5 text-zinc-300 hover:text-red-400" />
          </button>

          {/* Power Options Dropdown */}
          {showPowerMenu && (
            <div className="absolute right-0 bottom-10 w-48 win11-mica rounded-lg p-1.5 shadow-2xl border border-white/10 text-xs space-y-1 z-50">
              <button
                onClick={() => {
                  setShowPowerMenu(false);
                  onClose();
                  if (onLock) onLock();
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <FaLock className="w-3 h-3 text-blue-400" />
                <span>Lock System</span>
              </button>
              <button
                onClick={() => {
                  setShowPowerMenu(false);
                  onClose();
                  if (onRestart) onRestart();
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-white/10 flex items-center gap-2 text-zinc-300"
              >
                <FaPowerOff className="w-3 h-3 text-amber-400" />
                <span>Restart Windows 11</span>
              </button>
              <div className="h-px bg-white/10 my-0.5" />
              <button
                onClick={() => {
                  setShowPowerMenu(false);
                  onClose();
                  if (onExit) {
                    onExit();
                  } else {
                    navigate('/');
                  }
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-white/10 flex items-center gap-2 text-amber-300 font-bold"
              >
                <FaSignOutAlt className="w-3 h-3" />
                <span>Exit to Web Portfolio</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
