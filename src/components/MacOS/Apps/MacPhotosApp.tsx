import React, { useState } from 'react';
import { FaImage, FaFolder, FaTimes } from 'react-icons/fa';

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  aspect?: string;
}

export const MacPhotosApp: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const PHOTOS: PhotoItem[] = [
    {
      id: 'p-1',
      title: 'Sociantra UI & Agent Network',
      category: 'Projects',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p-2',
      title: 'TODOAI Autonomous Dashboard',
      category: 'Architecture',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p-3',
      title: 'VibePulse Realtime Equalizer',
      category: 'Projects',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p-4',
      title: 'CineVerse Media Engine',
      category: 'Projects',
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p-5',
      title: 'Cloud Infrastructure & Kubernetes',
      category: 'DevOps',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p-6',
      title: 'Developer Workstation & Dual Monitors',
      category: 'Workspace',
      url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Left Photos Sidebar */}
      <div className="w-48 bg-[#14141a]/95 border-r border-white/10 p-3 space-y-4 text-xs font-medium">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">
            Library
          </div>
          <div className="space-y-0.5">
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg bg-blue-600 text-white flex items-center gap-2 font-semibold">
              <FaImage className="text-xs" />
              <span>All Photos</span>
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-white/5 flex items-center gap-2">
              <FaFolder className="text-yellow-500 text-xs" />
              <span>Projects</span>
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-white/5 flex items-center gap-2">
              <FaFolder className="text-cyan-400 text-xs" />
              <span>Architecture</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="flex-1 p-5 overflow-y-auto macos-scroll bg-[#1c1c24]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all aspect-video shadow-md"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="font-semibold text-xs text-white truncate drop-shadow">{photo.title}</span>
                <span className="text-[10px] text-cyan-400 font-mono drop-shadow">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Zoom */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl bg-[#1e1e24] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-2 animate-macos-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white"
            >
              <FaTimes />
            </button>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} className="rounded-2xl w-full max-h-[70vh] object-cover" />
            <div className="p-4 flex justify-between items-center text-xs">
              <span className="font-bold text-sm">{selectedPhoto.title}</span>
              <span className="text-cyan-400 font-mono">{selectedPhoto.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacPhotosApp;
