import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaCompass,
  FaSearch,
  FaCrosshairs,
  FaExternalLinkAlt,
  FaBuilding,
  FaRoute,
} from 'react-icons/fa';

interface LocationPin {
  id: string;
  name: string;
  category: string;
  coords: string;
  details: string;
  address: string;
  tag: string;
}

const LOCATIONS: LocationPin[] = [
  {
    id: 'noida',
    name: 'Noida / Delhi NCR',
    category: 'Current Base',
    coords: '28.5355° N, 77.3910° E',
    details: 'Software Engineering Hub & Base of Operations. Leading architectural design, modern React/Node platforms, and distributed systems.',
    address: 'Sector 62, Noida, Uttar Pradesh, India',
    tag: 'Base',
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    category: 'Capital Region',
    coords: '28.6139° N, 77.2090° E',
    details: 'Key tech conferences, startups, developer meetups, and academic institutions.',
    address: 'Connaught Place / South Extension, New Delhi',
    tag: 'Network',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Silicon Valley of India)',
    category: 'Collaborations',
    coords: '12.9716° N, 77.5946° E',
    details: 'Frequent collaboration hub with AI innovators, VC networks, and cloud platforms.',
    address: 'Indiranagar / Koramangala, Bengaluru',
    tag: 'Tech Hub',
  },
  {
    id: 'remote',
    name: 'Global / Remote',
    category: 'Worldwide',
    coords: '0.0000° N, 0.0000° E',
    details: 'Open to worldwide asynchronous and synchronous engineering partnerships across US, Europe, and Asia Pacific timezones.',
    address: 'Worldwide Cloud Deployment (AWS / GCP / Vercel)',
    tag: 'Global',
  },
];

export const MacMapsApp: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationPin>(LOCATIONS[0]);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'transit'>('standard');
  const [search, setSearch] = useState('');

  const filteredLocations = LOCATIONS.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex bg-[#1e1e24] text-zinc-200 select-none text-xs font-sans overflow-hidden">
      {/* Left Search & Locations Sidebar */}
      <div className="w-80 bg-[#16161b]/95 border-r border-white/10 flex flex-col p-4 flex-shrink-0">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <FaCompass className="text-red-500 text-lg" />
          <h2 className="text-sm font-bold text-white tracking-tight">Apple Maps — Coordinates</h2>
        </div>

        {/* Search */}
        <div className="py-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places or coordinates"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Locations List */}
        <div className="flex-1 overflow-y-auto space-y-2 macos-scroll pr-1">
          <div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider px-1">
            Pinned Locations
          </div>

          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`p-3 rounded-xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-500 shadow-md text-white'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <FaMapMarkerAlt className={isSelected ? 'text-red-400' : 'text-zinc-400'} />
                    <span>{loc.name}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-white/10 text-zinc-300">
                    {loc.tag}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 truncate mb-1">
                  {loc.address}
                </div>
                <div className="font-mono text-[10px] text-zinc-500">
                  {loc.coords}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info card footer */}
        <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-zinc-400 space-y-1">
          <div className="flex items-center justify-between text-white font-medium">
            <span>Location Services</span>
            <span className="text-emerald-400 font-mono text-[10px]">PRECISE</span>
          </div>
          <div>UTC +05:30 (Indian Standard Time)</div>
        </div>
      </div>

      {/* Right Map Canvas & Details View */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0c101c]">
        {/* Top Floating Map Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-xl shadow-2xl pointer-events-auto flex items-center gap-2">
            <FaBuilding className="text-blue-400" />
            <span className="font-medium text-white text-xs">{selectedLocation.name}</span>
            <span className="text-[10px] text-zinc-400 font-mono">({selectedLocation.coords})</span>
          </div>

          <div className="bg-black/60 backdrop-blur-xl border border-white/15 p-1 rounded-xl shadow-2xl pointer-events-auto flex items-center gap-1">
            <button
              onClick={() => setMapType('standard')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mapType === 'standard' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mapType === 'satellite' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('transit')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mapType === 'transit' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Transit
            </button>
          </div>
        </div>

        {/* Stylized Visual Map Display */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Concentric Radar Rings */}
          <div className="w-96 h-96 rounded-full border border-blue-500/20 flex items-center justify-center animate-pulse">
            <div className="w-64 h-64 rounded-full border border-blue-400/30 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-cyan-400/40 flex items-center justify-center">
                {/* Center Pin Marker */}
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_20px_#ef4444]">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1 shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Sheet Card */}
          <div className="absolute bottom-6 left-6 right-6 max-w-xl mx-auto bg-[#181820]/95 backdrop-blur-2xl border border-white/15 p-4 rounded-2xl shadow-2xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedLocation.name}</h3>
                <p className="text-[11px] text-zinc-400">{selectedLocation.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedLocation.name + ' ' + selectedLocation.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Open in Web Maps</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedLocation.details}
            </p>

            <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1">
                <FaCrosshairs className="text-zinc-500" />
                <span>{selectedLocation.coords}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRoute className="text-zinc-500" />
                <span>Zone: Asia/Kolkata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacMapsApp;
