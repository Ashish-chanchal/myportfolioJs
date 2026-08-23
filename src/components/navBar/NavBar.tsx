import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Button from '../shared/Button';
import ThemeSwitcher from '../shared/ThemeSwitcher';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../shared/Logo';

interface NavbarProps {
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  selectedItem: number;
}

const NavItems = [
  { id: 0, name: 'HOME', link: '/', code: '00' },
  { id: 1, name: 'WORKS', link: '/works', code: '01' },
  { id: 2, name: 'ABOUT', link: '/about-me', code: '02' },
  { id: 3, name: 'CONTACT', link: '/contact-me', code: '03' },
];

const Navbar: React.FC<NavbarProps> = ({ setSelectedItem, selectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isEditorial
          ? 'bg-[#09090b]/95 border-b border-white/15 backdrop-blur-xl'
          : isBento
          ? 'bg-zinc-950/70 border-b border-white/8 backdrop-blur-2xl'
          : isMinimal
          ? 'bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-md'
          : 'bg-[#0a0a0a] border-b-2 border-white'
      }`}
    >
      {/* Editorial Top Masthead Dateline */}
      {isEditorial && (
        <div className="bg-[#0e0e12] border-b border-white/10 px-4 py-1 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-serif italic text-xs">The Engineering Gazette</span>
            <span className="text-zinc-600">//</span>
            <span>VOL. XXIV · NO. 01</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            <span>NOIDA // NEW DELHI // GLOBAL DISPATCH</span>
            <span className="text-accent font-semibold">ISSUE: 2026 EDITION</span>
          </div>
        </div>
      )}

      {/* Brutalist Top Terminal Bar (only in brutalist mode) */}
      {!isMinimal && !isBento && !isEditorial && (
        <div className="bg-[#141414] border-b border-[#262626] px-4 py-1 flex items-center justify-between text-[11px] font-mono text-[#888888]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
            <span className="text-white font-bold">ASHISH_OS // SYS_STATUS: OPTIMAL</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-accent font-bold">LOCATION: INDIA [IST]</span>
            <span>BUILD: v2.4.0</span>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={() => setSelectedItem(0)}
          className="flex items-center gap-3 group"
        >
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden lg:flex items-center gap-1.5 ${
            isEditorial
              ? 'px-3 py-1 border-x border-white/10 space-x-1'
              : isBento
              ? 'bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md'
              : isMinimal
              ? 'bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800/80'
              : ''
          }`}
        >
          {NavItems.map((item) => {
            const isActive = selectedItem === item.id;
            return (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setSelectedItem(item.id)}
                className={`transition-all ${
                  isEditorial
                    ? `px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all ${
                        isActive
                          ? 'text-white font-serif font-bold italic border-b-2 border-accent pb-1'
                          : 'text-zinc-400 hover:text-white hover:border-b-2 hover:border-zinc-500 pb-1 font-serif'
                      }`
                    : isBento
                    ? `font-mono text-xs px-4 py-1.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-white/15 text-white font-bold border border-white/20 shadow-sm backdrop-blur-sm'
                          : 'text-zinc-300 hover:text-white hover:bg-white/10'
                      }`
                    : isMinimal
                    ? `font-mono text-xs px-4 py-1.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`
                    : `font-mono text-xs px-3.5 py-1.5 border-2 brutal-btn ${
                        isActive
                          ? 'bg-accent text-black border-black font-black shadow-[2px_2px_0px_0px_#ffffff]'
                          : 'bg-[#141414] text-white border-[#333333] hover:border-white hover:bg-[#1f1f1f]'
                      }`
                }`}
              >
                {!isMinimal && !isBento && !isEditorial && <span className="text-[#888888] mr-1">[{item.code}]</span>}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right actions: Theme Switcher + Socials + CV */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeSwitcher />

          <div
            className={`flex items-center gap-1 ${
              isEditorial
                ? 'p-1 border border-white/10 rounded-md bg-white/3'
                : isBento
                ? 'bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md'
                : isMinimal
                ? 'bg-zinc-900/80 p-1 rounded-full border border-zinc-800'
                : 'bg-[#141414] p-1 border border-[#333]'
            }`}
          >
            <a
              href="https://www.linkedin.com/in/ashishchanchal/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 text-zinc-300 hover:text-white transition-colors ${
                isBento || isMinimal ? 'rounded-full hover:bg-white/10' : isEditorial ? 'hover:text-accent' : 'hover:text-accent'
              }`}
              title="LinkedIn"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/ashish-chanchal"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 text-zinc-300 hover:text-white transition-colors ${
                isBento || isMinimal ? 'rounded-full hover:bg-white/10' : isEditorial ? 'hover:text-accent' : 'hover:text-accent'
              }`}
              title="GitHub"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/ashish._chanchal/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 text-zinc-300 hover:text-white transition-colors ${
                isBento || isMinimal ? 'rounded-full hover:bg-white/10' : isEditorial ? 'hover:text-accentSec' : 'hover:text-accentSec'
              }`}
              title="Instagram"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
          </div>

          <Button
            text="Get CV"
            link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
            variant={isEditorial ? 'white' : 'cyan'}
            size="sm"
            external
          />
        </div>

        {/* Mobile Actions: Theme Switcher + Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitcher compact />
          <Button
            text="CV"
            link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
            variant="cyan"
            size="sm"
            external
          />
          <button
            onClick={toggleMenu}
            className={`p-2 text-white font-mono text-xs font-bold transition-all ${
              isEditorial
                ? 'rounded-md border border-zinc-700 bg-zinc-900'
                : isMinimal
                ? 'rounded-full border border-zinc-800 bg-zinc-900'
                : isBento
                ? 'rounded-full border border-white/10 bg-white/5 backdrop-blur-md'
                : 'border-2 border-white bg-[#141414]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className={`lg:hidden p-4 space-y-2 border-t ${
            isMinimal
              ? 'bg-zinc-950/95 border-zinc-800 backdrop-blur-xl'
              : 'bg-[#0c0c0c] border-white'
          }`}
        >
          {NavItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => {
                setSelectedItem(item.id);
                toggleMenu();
              }}
              className={`block font-mono text-sm px-4 py-2.5 transition-all ${
                isMinimal
                  ? `rounded-xl ${
                      selectedItem === item.id
                        ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`
                  : `border-2 ${
                      selectedItem === item.id
                        ? 'bg-accent text-black border-black font-black'
                        : 'bg-[#181818] text-white border-[#333333]'
                    }`
              }`}
            >
              {!isMinimal && <span className="text-[#888888] mr-2">[{item.code}]</span>}
              {item.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500">CONNECT:</span>
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/ashishchanchal/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-zinc-300 hover:text-white ${
                  isMinimal ? 'rounded-lg bg-zinc-900 border border-zinc-800' : 'bg-[#181818] border border-white'
                }`}
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/ashish-chanchal"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-zinc-300 hover:text-white ${
                  isMinimal ? 'rounded-lg bg-zinc-900 border border-zinc-800' : 'bg-[#181818] border border-white'
                }`}
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ashish._chanchal/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-zinc-300 hover:text-white ${
                  isMinimal ? 'rounded-lg bg-zinc-900 border border-zinc-800' : 'bg-[#181818] border border-white'
                }`}
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
