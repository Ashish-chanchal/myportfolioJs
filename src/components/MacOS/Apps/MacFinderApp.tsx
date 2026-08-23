import React, { useState } from 'react';
import {
  FaFolder,
  FaFilePdf,
  FaFileCode,
  FaFileAlt,
  FaGlobe,
  FaTh,
  FaList,
  FaColumns,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaExternalLinkAlt,
  FaEye,
  FaTimes,
  FaCloud,
  FaStar,
} from 'react-icons/fa';
import { MACOS_ICONS } from '../icons';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'code' | 'app' | 'doc';
  size: string;
  modified: string;
  url?: string;
  description?: string;
  content?: string;
}

interface MacFinderAppProps {
  onOpenApp?: (appId: string) => void;
  onOpenInSafari?: (url: string) => void;
}

export const MacFinderApp: React.FC<MacFinderAppProps> = ({ onOpenApp: _onOpenApp, onOpenInSafari }) => {
  const [currentFolder, setCurrentFolder] = useState<'Applications' | 'Documents' | 'Projects' | 'Downloads' | 'Recents'>('Projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'columns'>('grid');
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [quickLookOpen, setQuickLookOpen] = useState(false);

  const FOLDER_DATA: Record<string, FileItem[]> = {
    Applications: [
      {
        id: 'app-sociantra',
        name: 'Sociantra.app',
        type: 'app',
        size: '142 MB',
        modified: 'Today, 2:40 PM',
        url: 'https://sociantra.ashishchanchal.in/',
        description: 'Next-Generation AI Community & Social Networking Platform',
      },
      {
        id: 'app-todoai',
        name: 'TODOAI.app',
        type: 'app',
        size: '88 MB',
        modified: 'Yesterday, 6:15 PM',
        url: 'https://todoai.ashishchanchal.in/',
        description: 'Autonomous Task Breakdown & Priority Intelligence Suite',
      },
      {
        id: 'app-vibepulse',
        name: 'VibePulse.app',
        type: 'app',
        size: '110 MB',
        modified: 'Aug 18, 2026',
        url: 'https://vibepluse.ashishchanchal.in/',
        description: 'Real-Time Audio Streaming & Dynamic Emotion Engine',
      },
      {
        id: 'app-cineverse',
        name: 'CineVerse.app',
        type: 'app',
        size: '165 MB',
        modified: 'Aug 12, 2026',
        url: 'https://cineverse.ashishchanchal.in/',
        description: 'Cinema Streaming Platform with AI Recommendation Engine',
      },
    ],
    Projects: [
      {
        id: 'proj-sociantra',
        name: 'Sociantra_Source',
        type: 'folder',
        size: '420 MB',
        modified: 'Today, 11:20 AM',
        description: 'React 19, TypeScript, Node.js, WebSocket, TailwindCSS',
      },
      {
        id: 'proj-todoai',
        name: 'TODOAI_Engine',
        type: 'folder',
        size: '210 MB',
        modified: 'Aug 21, 2026',
        description: 'Vite, React, Local LLM Agent Integration, SQLite/IndexedDB',
      },
      {
        id: 'proj-vibepulse',
        name: 'VibePulse_Core',
        type: 'folder',
        size: '340 MB',
        modified: 'Aug 19, 2026',
        description: 'Web Audio API, Canvas Equalizer, Real-Time WebRTC Audio',
      },
      {
        id: 'proj-cineverse',
        name: 'CineVerse_Media',
        type: 'folder',
        size: '512 MB',
        modified: 'Aug 15, 2026',
        description: 'TMDB API, Video Stream Acceleration, Redux Toolkit',
      },
    ],
    Documents: [
      {
        id: 'doc-resume',
        name: 'Ashish_Chanchal_Resume.pdf',
        type: 'pdf',
        size: '1.8 MB',
        modified: 'Aug 2026',
        url: 'https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link',
        description: 'Official Curriculum Vitae — Software Engineer & AI Systems Architect',
      },
      {
        id: 'doc-architecture',
        name: 'System_Architecture_2026.md',
        type: 'doc',
        size: '42 KB',
        modified: 'Aug 20, 2026',
        content: '# Ashish Chanchal Engineering Architecture\n\n- High-concurrency event loops\n- Autonomous agent orchestration via MCP\n- Microfrontends & state reconciliation\n- Edge computing with Cloudflare / Vercel',
        description: 'Distributed Microservices & Agent Swarm Blueprint',
      },
      {
        id: 'doc-bio',
        name: 'About_Ashish_Chronicle.txt',
        type: 'doc',
        size: '18 KB',
        modified: 'Aug 14, 2026',
        content: 'Ashish Chanchal is a full-stack engineer and AI specialist crafting futuristic digital experiences.',
        description: 'Developer Odyssey, Milestones, and Engineering Philosophy',
      },
    ],
    Downloads: [
      {
        id: 'dl-portfolio-src',
        name: 'ashish-portfolio-v2.4.tar.gz',
        type: 'code',
        size: '14.2 MB',
        modified: 'Today, 9:00 AM',
        description: 'Source distribution archive for portfolio project',
      },
      {
        id: 'dl-certificates',
        name: 'Engineering_Certificates_Bundle.zip',
        type: 'code',
        size: '8.4 MB',
        modified: 'Aug 10, 2026',
        description: 'Cloud, AI, and Fullstack credentials',
      },
    ],
    Recents: [
      {
        id: 'rec-1',
        name: 'Sociantra.app',
        type: 'app',
        size: '142 MB',
        modified: 'Today, 2:40 PM',
        url: 'https://sociantra.ashishchanchal.in/',
        description: 'Next-Generation AI Community & Social Networking Platform',
      },
      {
        id: 'rec-2',
        name: 'Ashish_Chanchal_Resume.pdf',
        type: 'pdf',
        size: '1.8 MB',
        modified: 'Aug 2026',
        url: 'https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link',
        description: 'Official Curriculum Vitae',
      },
    ],
  };

  const files = FOLDER_DATA[currentFolder] || [];
  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleFileDoubleClick = (file: FileItem) => {
    if (file.url) {
      if (onOpenInSafari) {
        onOpenInSafari(file.url);
      } else {
        window.open(file.url, '_blank');
      }
    } else if (file.type === 'folder') {
      // open in Projects
    } else {
      setSelectedFile(file);
      setQuickLookOpen(true);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#181820] text-white select-none">
      {/* Finder Top Navigation & Action Toolbar */}
      <div className="h-11 px-3 bg-[#20202a] border-b border-white/10 flex items-center justify-between text-xs">
        {/* Left Back / Forward & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-zinc-400">
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-all disabled:opacity-30">
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-all disabled:opacity-30">
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
          <span className="font-bold text-white text-sm">{currentFolder}</span>
        </div>

        {/* Center View Switcher */}
        <div className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Icons Grid"
          >
            <FaTh className="w-3 h-3" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'list' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="List Table"
          >
            <FaList className="w-3 h-3" />
          </button>
          <button
            onClick={() => setViewMode('columns')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'columns' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Columns View"
          >
            <FaColumns className="w-3 h-3" />
          </button>
        </div>

        {/* Right Search Input */}
        <div className="relative w-40 sm:w-52">
          <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full pl-7 pr-3 py-1 rounded-md bg-white/10 border border-white/10 focus:border-blue-500 text-white text-xs focus:outline-none placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Finder 2-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#14141a]/95 border-r border-white/10 p-3 space-y-4 text-xs font-medium overflow-y-auto macos-scroll">
          {/* Favorites */}
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">
              Favorites
            </div>
            <div className="space-y-0.5">
              {(['Applications', 'Projects', 'Documents', 'Downloads', 'Recents'] as const).map((folder) => {
                const isActive = currentFolder === folder;
                return (
                  <button
                    key={folder}
                    onClick={() => {
                      setCurrentFolder(folder);
                      setSelectedFile(null);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 transition-all ${
                      isActive ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {folder === 'Applications' ? (
                      <img src={MACOS_ICONS.appstore} alt="Apps" className="w-4 h-4 object-contain" />
                    ) : folder === 'Projects' ? (
                      <FaFolder className="text-blue-400" />
                    ) : folder === 'Documents' ? (
                      <FaFileAlt className="text-zinc-400" />
                    ) : folder === 'Downloads' ? (
                      <FaStar className="text-amber-400" />
                    ) : (
                      <FaGlobe className="text-cyan-400" />
                    )}
                    <span>{folder}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* iCloud */}
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">
              iCloud
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => setCurrentFolder('Documents')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 text-zinc-300 hover:bg-white/5"
              >
                <FaCloud className="text-sky-400" />
                <span>iCloud Drive</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">
              Tags
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2 px-2.5 py-1 text-zinc-300 hover:bg-white/5 rounded-lg cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Full-Stack</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 text-zinc-300 hover:bg-white/5 rounded-lg cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>AI Agents</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 text-zinc-300 hover:bg-white/5 rounded-lg cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Cloud DevOps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content Pane */}
        <div className="flex-1 p-4 overflow-y-auto macos-scroll bg-[#181822]">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    onDoubleClick={() => handleFileDoubleClick(file)}
                    className={`flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all border text-center group ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-500 shadow-lg'
                        : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-2">
                      {file.type === 'folder' ? (
                        <FaFolder className="text-4xl text-blue-400 drop-shadow" />
                      ) : file.type === 'app' ? (
                        <img src={MACOS_ICONS.appstore} alt="App" className="w-12 h-12 object-contain drop-shadow" />
                      ) : file.type === 'pdf' ? (
                        <FaFilePdf className="text-4xl text-red-400 drop-shadow" />
                      ) : (
                        <FaFileCode className="text-4xl text-cyan-400 drop-shadow" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-white tracking-tight truncate w-full">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{file.size}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-mono text-[10px] uppercase">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Date Modified</th>
                  <th className="py-2 px-3">Size</th>
                  <th className="py-2 px-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFiles.map((file) => {
                  const isSelected = selectedFile?.id === file.id;
                  return (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      onDoubleClick={() => handleFileDoubleClick(file)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-white/5 text-zinc-300'
                      }`}
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        {file.type === 'folder' ? (
                          <FaFolder className="text-blue-400" />
                        ) : file.type === 'app' ? (
                          <img src={MACOS_ICONS.appstore} alt="App" className="w-4 h-4 object-contain" />
                        ) : file.type === 'pdf' ? (
                          <FaFilePdf className="text-red-400" />
                        ) : (
                          <FaFileCode className="text-cyan-400" />
                        )}
                        <span>{file.name}</span>
                      </td>
                      <td className="py-2 px-3 font-mono text-[11px] text-zinc-400">{file.modified}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-zinc-400">{file.size}</td>
                      <td className="py-2 px-3 uppercase text-[10px] text-zinc-400">{file.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Look Spacebar Modal */}
      {quickLookOpen && selectedFile && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          onClick={() => setQuickLookOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#1e1e26] border border-white/20 rounded-2xl shadow-2xl p-5 text-white animate-macos-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FaEye className="text-cyan-400" />
                <span className="font-bold text-sm">Quick Look // {selectedFile.name}</span>
              </div>
              <button onClick={() => setQuickLookOpen(false)} className="text-zinc-400 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-zinc-300 max-h-64 overflow-y-auto macos-scroll whitespace-pre-wrap border border-white/5">
              {selectedFile.content || selectedFile.description || 'No textual preview available.'}
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-zinc-400">
              <span>Size: {selectedFile.size} · Modified: {selectedFile.modified}</span>
              {selectedFile.url && (
                <a
                  href={selectedFile.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5"
                >
                  <span>Open Item</span>
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Finder Bottom Status Bar */}
      <div className="h-6 px-3 bg-[#16161e] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
        <span>{filteredFiles.length} items, 1.4 TB available on Macintosh HD</span>
        <span>Spacebar: Quick Look Preview</span>
      </div>
    </div>
  );
};

export default MacFinderApp;
