import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus, FaExpand } from 'react-icons/fa';

import todoaiImg from '../../../assets/projects/todoai.png';
import sociantraImg from '../../../assets/projects/sociantra.png';
import vibepulseImg from '../../../assets/projects/vibepulse.png';
import cineverseImg from '../../../assets/projects/cineverse.png';
import estypeshopImg from '../../../assets/projects/estypeshop.png';
import sixteenclothingImg from '../../../assets/projects/sixteenclothing.png';
import heromainImg from '../../../assets/hero/heromain.webp';

const PHOTOS = [
  { id: 1, title: 'TODOAI // Natural Language Task Manager', img: todoaiImg, caption: 'Model Context Protocol (MCP) Autonomous Task Agent' },
  { id: 2, title: 'Sociantra // Conversational Voice AI Platform', img: sociantraImg, caption: 'Real-time WebSocket audio streaming on Azure Cloud' },
  { id: 3, title: 'VibePulse // 3D Cyberpunk Sound Engine', img: vibepulseImg, caption: 'Locked 60 FPS Three.js & WebGL Audio Visualizer' },
  { id: 4, title: 'CineVerse // Cinema Portal Experience', img: cineverseImg, caption: 'Interactive movie database with dynamic trailer playback' },
  { id: 5, title: 'ESTypeShop // Full-Stack E-Commerce', img: estypeshopImg, caption: 'Type-safe multi-category retail store with Stripe payment' },
  { id: 6, title: 'Sixteen Clothing // Modern Brand App', img: sixteenclothingImg, caption: 'Modern fashion storefront with fluid micro-interactions' },
  { id: 7, title: 'Ashish Chanchal // Developer Studio Portrait', img: heromainImg, caption: 'Software Developer & AI Systems Engineer (Noida, India)' },
];

export const PhotosApp: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoom, setZoom] = useState(1);

  const activePhoto = PHOTOS[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PHOTOS.length);
    setZoom(1);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
    setZoom(1);
  };

  return (
    <div className="h-full flex flex-col bg-[#161618] text-zinc-200 text-xs select-none">
      {/* Top Toolbar */}
      <div className="p-2.5 bg-[#1b1b1e] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-xs">{activePhoto.title}</span>
          <span className="text-[10px] text-zinc-500 font-mono">({activeIdx + 1} of {PHOTOS.length})</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
            title="Zoom Out"
          >
            <FaSearchMinus className="w-3 h-3" />
          </button>
          <span className="font-mono text-[10px] text-zinc-400 px-1">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
            title="Zoom In"
          >
            <FaSearchPlus className="w-3 h-3" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white ml-2"
            title="Reset Zoom"
          >
            <FaExpand className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden bg-[#0c0c0e]">
        {/* Prev / Next Chevrons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white z-20 border border-white/10 transition-all hover:scale-110"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        <div className="max-w-3xl max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
          <img src={activePhoto.img} alt={activePhoto.title} className="w-full h-full object-contain" />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white z-20 border border-white/10 transition-all hover:scale-110"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
          <span className="px-4 py-1.5 rounded-full bg-black/80 border border-white/10 text-zinc-300 text-[11px] font-medium shadow-lg">
            {activePhoto.caption}
          </span>
        </div>
      </div>

      {/* Bottom Thumbnail Filmstrip */}
      <div className="p-2 bg-[#1b1b1e] border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto win11-scroll">
        {PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => {
              setActiveIdx(idx);
              setZoom(1);
            }}
            className={`w-14 h-10 rounded overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${
              activeIdx === idx ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={photo.img} alt={photo.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosApp;
