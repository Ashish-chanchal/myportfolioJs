import React, { useState } from 'react';
import {
  FaFileCode,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaSearch,
  FaExternalLinkAlt,
  FaGithub,
  FaThLarge,
  FaList,
} from 'react-icons/fa';

import todoaiImg from '../../../assets/projects/todoai.png';
import sociantraImg from '../../../assets/projects/sociantra.png';
import estypeshopImg from '../../../assets/projects/estypeshop.png';
import sixteenclothingImg from '../../../assets/projects/sixteenclothing.png';
import vibepulseImg from '../../../assets/projects/vibepulse.png';
import cineverseImg from '../../../assets/projects/cineverse.png';
import { WIN11_ICONS } from '../icons';

interface ExplorerFile {
  id: number;
  title: string;
  category: string;
  tech: string;
  img: string;
  desc: string;
  liveLink?: string;
  repoLink?: string;
  size: string;
  date: string;
}

const EXPLORER_PROJECTS: ExplorerFile[] = [
  {
    id: 1,
    title: 'TODOAI Task Orchestrator',
    category: 'AI & Automation',
    tech: 'React, Node.js, MCP Protocol, SQLite',
    img: todoaiImg,
    desc: 'Model Context Protocol (MCP) AI system automating task breakdowns by 80% with real-time recurring cron schedules.',
    liveLink: 'https://github.com/Ashish-chanchal/todoai',
    repoLink: 'https://github.com/Ashish-chanchal/todoai',
    size: '14.2 MB',
    date: '2026-08-15',
  },
  {
    id: 2,
    title: 'Sociantra Conversational AI',
    category: 'Conversational Voice AI',
    tech: 'React, Azure Cloud, FastAPI, WebSockets',
    img: sociantraImg,
    desc: 'Low-latency real-time voice streaming system cutting response delay from 15s down to <3s.',
    liveLink: 'https://sociantra.ashishchanchal.in/',
    repoLink: 'https://github.com/Ashish-chanchal',
    size: '28.6 MB',
    date: '2026-07-22',
  },
  {
    id: 3,
    title: 'VibePulse 3D Sound Engine',
    category: '3D Web & Audio',
    tech: 'React, Three.js, Web Audio API, WebGL',
    img: vibepulseImg,
    desc: 'Cyberpunk audio-reactive 3D visualizer sustaining locked 60 FPS performance with custom WebGL shaders.',
    liveLink: 'https://vibepulse.vercel.app/',
    repoLink: 'https://github.com/Ashish-chanchal/VibePulse',
    size: '35.1 MB',
    date: '2026-06-10',
  },
  {
    id: 4,
    title: 'CineVerse Movie Portal',
    category: 'Web Application',
    tech: 'React, TMDB API, TailwindCSS, Framer Motion',
    img: cineverseImg,
    desc: 'Interactive cinematic database with lightning-fast catalog search, dynamic filters, and trailer integration.',
    liveLink: 'https://cineverse-one.vercel.app/',
    repoLink: 'https://github.com/Ashish-chanchal/CineVerse',
    size: '18.4 MB',
    date: '2026-05-18',
  },
  {
    id: 5,
    title: 'ESTypeShop E-Commerce Store',
    category: 'Full-Stack E-Commerce',
    tech: 'React, TypeScript, Redux Toolkit, Stripe',
    img: estypeshopImg,
    desc: 'Type-safe multi-category retail store with real-time cart persistence and secure payment gateways.',
    liveLink: 'https://github.com/Ashish-chanchal/ESTypeshop',
    repoLink: 'https://github.com/Ashish-chanchal/ESTypeshop',
    size: '22.0 MB',
    date: '2026-04-02',
  },
  {
    id: 6,
    title: 'Sixteen Clothing Brand',
    category: 'Frontend Web App',
    tech: 'HTML5, CSS3, JavaScript, Responsive Design',
    img: sixteenclothingImg,
    desc: 'Modern apparel fashion portfolio with fluid animations and responsive mobile ergonomics.',
    liveLink: 'https://github.com/Ashish-chanchal/sixteenclothing',
    repoLink: 'https://github.com/Ashish-chanchal/sixteenclothing',
    size: '9.8 MB',
    date: '2026-03-14',
  },
];

interface FileExplorerAppProps {
  onOpenInEdge?: (url: string) => void;
  initialFolder?: 'ThisPC' | 'Projects' | 'Documents' | 'Skills' | 'DriveC' | 'DriveD' | 'DriveE' | 'DriveZ';
}

export const FileExplorerApp: React.FC<FileExplorerAppProps> = ({ onOpenInEdge, initialFolder = 'ThisPC' }) => {
  const [selectedFolder, setSelectedFolder] = useState<
    'ThisPC' | 'Projects' | 'Documents' | 'Skills' | 'DriveC' | 'DriveD' | 'DriveE' | 'DriveZ' | 'Downloads'
  >(initialFolder);
  const [selectedFile, setSelectedFile] = useState<ExplorerFile | null>(EXPLORER_PROJECTS[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = EXPLORER_PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const drives = [
    {
      letter: 'C:',
      name: 'Local Disk (C:)',
      tag: 'Windows 11 OS',
      freeGB: 312,
      totalGB: 476,
      color: 'bg-blue-500',
      folderKey: 'DriveC' as const,
    },
    {
      letter: 'D:',
      name: 'Projects & Code (D:)',
      tag: 'NVMe Dev Volume',
      freeGB: 680,
      totalGB: 1024,
      color: 'bg-cyan-500',
      folderKey: 'DriveD' as const,
    },
    {
      letter: 'E:',
      name: 'AI Models & Datasets (E:)',
      tag: 'ML Weights & Audio',
      freeGB: 1420,
      totalGB: 2048,
      color: 'bg-purple-500',
      folderKey: 'DriveE' as const,
    },
    {
      letter: 'Z:',
      name: 'Azure Cloud Mirror (Z:)',
      tag: 'Network Drive',
      freeGB: 4100,
      totalGB: 5120,
      color: 'bg-emerald-500',
      folderKey: 'DriveZ' as const,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#191919] text-zinc-200 text-xs select-none font-sans">
      {/* Top Navigation & Action Toolbar */}
      <div className="p-2 border-b border-white/10 bg-[#202020] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedFolder('ThisPC')}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
            title="Back to This PC"
          >
            <FaArrowLeft className="w-3 h-3" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white">
            <FaArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setSelectedFolder('ThisPC')}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
            title="Up to This PC"
          >
            <FaArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 bg-[#141414] border border-white/10 rounded-md px-3 py-1 flex items-center gap-2 text-zinc-300 font-mono text-[11px]">
          <img src={WIN11_ICONS.thisPc} alt="Folder" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
          <span className="text-zinc-500">This PC &gt;</span>
          <span className="text-white font-bold">
            {selectedFolder === 'ThisPC'
              ? 'Devices and drives'
              : selectedFolder === 'DriveC'
              ? 'Local Disk (C:)'
              : selectedFolder === 'DriveD'
              ? 'Projects & Code (D:)'
              : selectedFolder === 'DriveE'
              ? 'AI Models & Datasets (E:)'
              : selectedFolder === 'DriveZ'
              ? 'Azure Cloud Mirror (Z:)'
              : selectedFolder}
          </span>
        </div>

        {/* Search Input */}
        <div className="w-48 bg-[#141414] border border-white/10 rounded-md px-2.5 py-1 flex items-center gap-2 text-[11px]">
          <FaSearch className="text-zinc-500 w-2.5 h-2.5" />
          <input
            type="text"
            placeholder={`Search ${selectedFolder}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-xs"
          />
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[#141414] border border-white/10 rounded p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'}`}
            title="Grid View"
          >
            <FaThLarge className="w-3 h-3" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'}`}
            title="List View"
          >
            <FaList className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Workspace (Sidebar + Files + Preview Pane) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Quick Access Sidebar */}
        <div className="w-48 bg-[#1e1e1e] border-r border-white/10 p-2 space-y-1 font-mono text-[11px] overflow-y-auto win11-scroll">
          <div className="text-[10px] text-zinc-500 font-bold px-2 py-1 uppercase tracking-wider">
            Quick Access
          </div>

          <button
            onClick={() => setSelectedFolder('Projects')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all ${
              selectedFolder === 'Projects' ? 'bg-blue-600/30 text-blue-400 font-bold border border-blue-500/40' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <img src={WIN11_ICONS.explorer} alt="Projects" className="w-4 h-4 object-contain" />
            <span>Projects ({EXPLORER_PROJECTS.length})</span>
          </button>

          <button
            onClick={() => setSelectedFolder('Documents')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all ${
              selectedFolder === 'Documents' ? 'bg-amber-600/30 text-amber-400 font-bold border border-amber-500/40' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <img src={WIN11_ICONS.word} alt="Docs" className="w-4 h-4 object-contain" />
            <span>Documents (3)</span>
          </button>

          <button
            onClick={() => setSelectedFolder('Skills')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all ${
              selectedFolder === 'Skills' ? 'bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <img src={WIN11_ICONS.vscode} alt="Skills" className="w-4 h-4 object-contain" />
            <span>Tech Stack (6)</span>
          </button>

          <div className="pt-3 text-[10px] text-zinc-500 font-bold px-2 py-1 uppercase tracking-wider flex items-center justify-between">
            <span>This PC</span>
            <button
              onClick={() => setSelectedFolder('ThisPC')}
              className="text-[10px] text-blue-400 hover:underline"
            >
              View All
            </button>
          </div>

          <button
            onClick={() => setSelectedFolder('ThisPC')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all ${
              selectedFolder === 'ThisPC' ? 'bg-blue-600/30 text-white font-bold border border-blue-500/40' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <img src={WIN11_ICONS.thisPc} alt="This PC" className="w-4 h-4 object-contain" />
            <span>This PC</span>
          </button>

          <button
            onClick={() => setSelectedFolder('DriveC')}
            className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md transition-all pl-5 text-[10px] ${
              selectedFolder === 'DriveC' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span>💽</span>
            <span>Local Disk (C:)</span>
          </button>

          <button
            onClick={() => setSelectedFolder('DriveD')}
            className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md transition-all pl-5 text-[10px] ${
              selectedFolder === 'DriveD' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span>💽</span>
            <span>Projects (D:)</span>
          </button>

          <button
            onClick={() => setSelectedFolder('DriveE')}
            className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md transition-all pl-5 text-[10px] ${
              selectedFolder === 'DriveE' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span>💽</span>
            <span>AI Models (E:)</span>
          </button>

          <button
            onClick={() => setSelectedFolder('DriveZ')}
            className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md transition-all pl-5 text-[10px] ${
              selectedFolder === 'DriveZ' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            <span>🌐</span>
            <span>Azure Mirror (Z:)</span>
          </button>
        </div>

        {/* Middle File Grid / List Area */}
        <div className="flex-1 p-4 overflow-y-auto win11-scroll bg-[#151515]">
          {/* ══════════════════════════════════════════════
              THIS PC HOME VIEW (Partitions + Quick Folders)
          ══════════════════════════════════════════════ */}
          {selectedFolder === 'ThisPC' ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Folders Section */}
              <div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>Folders (6)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    { name: 'Desktop', icon: '🖥️', folder: 'Projects' as const, items: '14 items' },
                    { name: 'Documents', icon: '📄', folder: 'Documents' as const, items: '3 files' },
                    { name: 'Downloads', icon: '⬇️', folder: 'Downloads' as const, items: '4 items' },
                    { name: 'Projects', icon: '📁', folder: 'DriveD' as const, items: '6 repos' },
                    { name: 'Skills & Stack', icon: '⚡', folder: 'Skills' as const, items: '6 clusters' },
                    { name: 'AI Models', icon: '🧠', folder: 'DriveE' as const, items: '3 checkpoints' },
                  ].map((f) => (
                    <div
                      key={f.name}
                      onDoubleClick={() => setSelectedFolder(f.folder)}
                      onClick={() => setSelectedFolder(f.folder)}
                      className="p-3 bg-[#1e1e1e] hover:bg-[#262626] border border-white/10 rounded-lg cursor-pointer flex flex-col items-center gap-1.5 text-center transition-all hover:border-blue-500/50 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{f.icon}</span>
                      <span className="font-bold text-white text-xs truncate w-full">{f.name}</span>
                      <span className="text-[10px] text-zinc-500">{f.items}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices and Drives (Partitions) */}
              <div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Devices and drives (4 Partitions)</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Total 8.6 TB Storage</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {drives.map((d) => {
                    const usedPercent = Math.round(((d.totalGB - d.freeGB) / d.totalGB) * 100);
                    return (
                      <div
                        key={d.letter}
                        onClick={() => setSelectedFolder(d.folderKey)}
                        onDoubleClick={() => setSelectedFolder(d.folderKey)}
                        className="p-3.5 bg-[#1e1e1e] hover:bg-[#262626] border border-white/10 hover:border-blue-500/50 rounded-xl cursor-pointer flex items-center gap-3.5 transition-all shadow-md group"
                      >
                        {/* Drive Disk Icon */}
                        <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                          {d.letter === 'Z:' ? '🌐' : '💽'}
                        </div>

                        {/* Drive Info & Storage Bar */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-white text-xs truncate">{d.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                              {d.tag}
                            </span>
                          </div>

                          {/* Windows 11 Storage Bar */}
                          <div className="w-full bg-zinc-800 h-3 rounded-sm my-1.5 overflow-hidden border border-white/5 relative">
                            <div
                              className={`h-full ${d.color} transition-all duration-500`}
                              style={{ width: `${usedPercent}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                            <span>{d.freeGB >= 1000 ? `${(d.freeGB / 1024).toFixed(1)} TB` : `${d.freeGB} GB`} free</span>
                            <span className="text-zinc-500">of {d.totalGB >= 1000 ? `${(d.totalGB / 1024).toFixed(0)} TB` : `${d.totalGB} GB`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : selectedFolder === 'DriveC' ? (
            /* Local Disk C View */
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-400 text-xs">Local Disk (C:) — Windows 11 System OS</div>
                  <div className="text-[10px] text-zinc-400">NTFS Partition · 312 GB free of 476 GB</div>
                </div>
                <button
                  onClick={() => setSelectedFolder('ThisPC')}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px]"
                >
                  Back to This PC
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Program Files', icon: '📁', size: '42.1 GB', items: '2,410 files' },
                  { name: 'Program Files (x86)', icon: '📁', size: '18.4 GB', items: '1,120 files' },
                  { name: 'Users', icon: '📁', size: '84.6 GB', items: '14,800 files' },
                  { name: 'Windows', icon: '📁', size: '28.2 GB', items: 'System Core' },
                  { name: 'Ashish_Home', icon: '👤', size: '64.2 GB', items: 'User Profile' },
                  { name: 'System32', icon: '⚙️', size: '12.8 GB', items: 'Protected' },
                ].map((f) => (
                  <div
                    key={f.name}
                    className="p-3 bg-[#1e1e1e] hover:bg-[#252525] border border-white/10 rounded-lg flex items-center gap-3 cursor-pointer"
                  >
                    <span className="text-xl">{f.icon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-xs truncate">{f.name}</div>
                      <div className="text-[10px] text-zinc-500">{f.items}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedFolder === 'DriveD' || selectedFolder === 'Projects' ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedFile(project)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col gap-2 ${
                      selectedFile?.id === project.id
                        ? 'bg-blue-600/20 border-blue-500/80 shadow-md'
                        : 'bg-[#1e1e1e] border-white/10 hover:border-white/25 hover:bg-[#252525]'
                    }`}
                  >
                    <div className="h-28 rounded overflow-hidden bg-black relative">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-accent">
                        {project.category}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs truncate">{project.title}</div>
                      <div className="text-[10px] text-zinc-400 font-mono truncate">{project.tech}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-mono text-zinc-500 border-b border-white/10">
                  <span className="col-span-6">Name</span>
                  <span className="col-span-3">Category</span>
                  <span className="col-span-2">Date Modified</span>
                  <span className="col-span-1 text-right">Size</span>
                </div>
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedFile(project)}
                    className={`grid grid-cols-12 px-3 py-2 rounded items-center cursor-pointer transition-all ${
                      selectedFile?.id === project.id ? 'bg-blue-600/30 text-white font-bold' : 'hover:bg-white/5 text-zinc-300'
                    }`}
                  >
                    <span className="col-span-6 flex items-center gap-2 truncate">
                      <FaFileCode className="text-blue-400 flex-shrink-0" />
                      {project.title}
                    </span>
                    <span className="col-span-3 text-zinc-400 truncate">{project.category}</span>
                    <span className="col-span-2 text-zinc-500 font-mono text-[10px]">{project.date}</span>
                    <span className="col-span-1 text-right text-zinc-500 font-mono text-[10px]">{project.size}</span>
                  </div>
                ))}
              </div>
            )
          ) : selectedFolder === 'DriveE' ? (
            /* AI Models & Weights Partition */
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-purple-400 text-xs">AI Models & Datasets (E:) — PyTorch & Model Checkpoints</div>
                  <div className="text-[10px] text-zinc-400">1.42 TB free of 2.0 TB · CUDA & TensorRT Cache</div>
                </div>
                <button
                  onClick={() => setSelectedFolder('ThisPC')}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px]"
                >
                  Back to This PC
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'DRDO_Biomedical_EEG_Classifier.pt', size: '1.2 GB', desc: 'Pre-trained neural model for clinical anomaly diagnostics' },
                  { name: 'Sociantra_Voice_Latency_Engine.onnx', size: '640 MB', desc: 'Quantized fast WebSocket speech synthesizer' },
                  { name: 'VibePulse_WebGL_Shaders.bin', size: '128 MB', desc: 'Audio reactive fragment compute shaders' },
                  { name: 'TODOAI_MCP_FineTuned_Weights.safetensors', size: '2.8 GB', desc: 'Autonomous task orchestration checkpoints' },
                ].map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🧠</span>
                      <div>
                        <div className="font-bold text-white text-xs">{m.name}</div>
                        <div className="text-[10px] text-zinc-400">{m.desc}</div>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-400 text-[10px]">{m.size}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedFolder === 'DriveZ' ? (
            /* Azure Cloud Storage Partition */
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-400 text-xs">Azure Cloud Mirror (Z:) — Distributed Kubernetes & Registries</div>
                  <div className="text-[10px] text-zinc-400">4.1 TB free of 5.0 TB · Connected via Azure Edge</div>
                </div>
                <button
                  onClick={() => setSelectedFolder('ThisPC')}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px]"
                >
                  Back to This PC
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Azure_Container_Apps_Cluster/', size: '3.4 GB', type: 'Production K8s Microservices' },
                  { name: 'PostgreSQL_Distributed_Snapshots/', size: '12.4 GB', type: 'Automated Real-time Backups' },
                  { name: 'Redis_Cache_Cluster_Node1/', size: '1.2 GB', type: 'In-Memory Session Store' },
                  { name: 'FastAPI_WebSocket_Gateway/', size: '820 MB', type: 'Microservice Endpoints' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🌐</span>
                      <div>
                        <div className="font-bold text-white text-xs">{item.name}</div>
                        <div className="text-[10px] text-zinc-400">{item.type}</div>
                      </div>
                    </div>
                    <span className="font-mono text-zinc-400 text-[10px]">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedFolder === 'Downloads' ? (
            /* Downloads View */
            <div className="space-y-2 animate-fadeIn">
              <div className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📦</span>
                  <div>
                    <div className="font-bold text-white text-xs">Ashish_Chanchal_Resume_2026.pdf</div>
                    <div className="text-[10px] text-zinc-400">Downloaded today · 184 KB</div>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Open
                </a>
              </div>
              <div className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📦</span>
                  <div>
                    <div className="font-bold text-white text-xs">TODOAI_MCP_Server_v1.4.tar.gz</div>
                    <div className="text-[10px] text-zinc-400">Downloaded yesterday · 14.2 MB</div>
                  </div>
                </div>
                <span className="text-zinc-500 font-mono text-[10px]">Complete</span>
              </div>
            </div>
          ) : selectedFolder === 'Documents' ? (
            <div className="space-y-2">
              <div className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={WIN11_ICONS.pdf} alt="PDF" className="w-8 h-8 object-contain" />
                  <div>
                    <div className="font-bold text-white">Ashish_Chanchal_Resume_2026.pdf</div>
                    <div className="text-[10px] text-zinc-400">Software Developer & AI Systems Engineer · 184 KB</div>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-blue-500"
                >
                  <span>Download</span>
                  <FaExternalLinkAlt className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center gap-3">
                <img src={WIN11_ICONS.word} alt="Word" className="w-8 h-8 object-contain" />
                <div>
                  <div className="font-bold text-white">DRDO_Biomedical_ML_Research.docx</div>
                  <div className="text-[10px] text-zinc-400">Predictive clinical ML neural models documentation · 2.4 MB</div>
                </div>
              </div>

              <div className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg flex items-center gap-3">
                <img src={WIN11_ICONS.notepad} alt="Notepad" className="w-8 h-8 object-contain" />
                <div>
                  <div className="font-bold text-white">Architecture_Tenets_Production.md</div>
                  <div className="text-[10px] text-zinc-400">Distributed microservices and real-time audio SLA rules · 42 KB</div>
                </div>
              </div>
            </div>
          ) : (
            /* Skills Tab */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'Core Frontend', list: 'React, Next.js, TypeScript, Three.js, TailwindCSS, HTML5/CSS3' },
                { name: 'Backend & Microservices', list: 'NestJS, Node.js, Express, Python, FastAPI, WebSockets' },
                { name: 'Mobile Architecture', list: 'Flutter, Dart, React Native, Android Studio, Cross-Platform' },
                { name: 'Databases & In-Memory Cache', list: 'PostgreSQL, MongoDB, Redis, SQLite, Firebase' },
                { name: 'Machine Learning & AI', list: 'PyTorch, Scikit-Learn, OpenCV, NumPy, Pandas, MCP Protocol' },
                { name: 'DevOps & Tooling', list: 'Azure Cloud, Docker, Git, CI/CD Actions, Postman, Linux' },
              ].map((s, idx) => (
                <div key={idx} className="p-3 bg-[#1e1e1e] border border-white/10 rounded-lg">
                  <div className="font-bold text-accent mb-1 flex items-center gap-1.5">
                    <FaFileCode />
                    <span>{s.name}</span>
                  </div>
                  <div className="text-[11px] text-zinc-300 font-mono leading-relaxed">{s.list}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Preview Drawer (if a file is selected) */}
        {selectedFile && selectedFolder === 'Projects' && (
          <div className="w-72 bg-[#1b1b1b] border-l border-white/10 p-4 flex flex-col justify-between overflow-y-auto win11-scroll">
            <div className="space-y-3">
              <div className="h-36 rounded-lg overflow-hidden border border-white/10 bg-black">
                <img src={selectedFile.img} alt={selectedFile.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-accent font-bold uppercase">{selectedFile.category}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{selectedFile.title}</h3>
              </div>

              <div className="p-2.5 rounded bg-[#141414] border border-white/5 text-[11px] text-zinc-300 font-sans leading-relaxed">
                {selectedFile.desc}
              </div>

              <div className="space-y-1 font-mono text-[10px] text-zinc-400">
                <div><span className="text-zinc-500">Tech:</span> {selectedFile.tech}</div>
                <div><span className="text-zinc-500">Modified:</span> {selectedFile.date}</div>
                <div><span className="text-zinc-500">Size:</span> {selectedFile.size}</div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              {selectedFile.liveLink && (
                <button
                  onClick={() => {
                    if (onOpenInEdge && selectedFile.liveLink) {
                      onOpenInEdge(selectedFile.liveLink);
                    }
                  }}
                  className="w-full py-2 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  <span>Launch Live App in Windows</span>
                </button>
              )}
              {selectedFile.repoLink && (
                <button
                  onClick={() => {
                    if (onOpenInEdge && selectedFile.repoLink) {
                      onOpenInEdge(selectedFile.repoLink);
                    }
                  }}
                  className="w-full py-1.5 px-3 rounded bg-[#2a2a2a] hover:bg-[#333333] border border-white/10 text-zinc-200 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>View Source Code</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="px-3 py-1 bg-[#1c1c1c] border-t border-white/10 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
        <span>{selectedFolder === 'Projects' ? `${filteredProjects.length} items` : 'System Ready'}</span>
        <span>Local Disk (C:) Free Space: 742 GB of 1 TB</span>
      </div>
    </div>
  );
};

export default FileExplorerApp;
