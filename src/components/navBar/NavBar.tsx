import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Button from '../shared/Button';
import ThemeSwitcher from '../shared/ThemeSwitcher';

const NavItems = [
  { id: 0, code: '00', name: 'HOME', link: '/' },
  { id: 1, code: '01', name: 'WORKS', link: '/works' },
  { id: 2, code: '02', name: 'ABOUT', link: '/about-me' },
  { id: 3, code: '03', name: 'CONTACT', link: '/contact-me' },
];

const Navbar = ({
  setSelectedItem,
  selectedItem,
}: {
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  selectedItem: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const item = NavItems.find((nav) => nav.link === path);
    if (item) {
      setSelectedItem(item.id);
    }
  }, [location.pathname, setSelectedItem]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-2 border-white">
      {/* Top telemetry ticker strip */}
      <div className="bg-[#141414] text-white px-4 py-1 border-b border-[#262626] font-mono text-[10px] sm:text-xs flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-accent">
            <span className="w-2 h-2 bg-[#00FF66] inline-block border border-black animate-pulse"></span>
            JOURNEY_LOG // ASHISH CHANCHAL
          </span>
          <span className="hidden md:inline-block text-[#444444]">|</span>
          <span className="hidden md:inline-block font-mono text-[#A3A3A3]">
            LAT: 28.5355° N, 77.3910° E (NOIDA, IN)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block font-mono bg-[#1f1f1f] text-[#00FF66] px-2 py-0.5 text-[9px] uppercase font-bold border border-[#333]">
            AVAILABILITY: OPEN FOR ROLES & CONTRACTS
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name Badge */}
        <Link
          to="/"
          onClick={() => setSelectedItem(0)}
          className="flex items-center gap-3 group"
        >
          <div className="bg-accent text-black font-heading font-black text-lg px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#ffffff] group-hover:shadow-[2px_2px_0px_0px_#C778DD] transition-all">
            AC
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-base text-white tracking-wider uppercase group-hover:text-accent transition-colors">
              ASHISH CHANCHAL
            </span>
            <span className="font-mono text-[10px] text-[#A3A3A3]">
              DEV_JOURNEY // V2.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-3">
          {NavItems.map((item) => {
            const isActive = selectedItem === item.id;
            return (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setSelectedItem(item.id)}
                className={`font-mono text-xs px-3.5 py-1.5 border-2 transition-all brutal-btn ${
                  isActive
                    ? 'bg-accent text-black border-black font-black shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-[#141414] text-white border-[#333333] hover:border-white hover:bg-[#1f1f1f]'
                }`}
              >
                <span className="text-[#888888] mr-1">[{item.code}]</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right actions: Theme Switcher + Socials + CV */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Interactive Theme Switcher */}
          <ThemeSwitcher />

          <div className="flex items-center gap-1 bg-[#141414] p-1 border border-[#333]">
            <a
              href="https://www.linkedin.com/in/ashishchanchal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-white hover:bg-accent hover:text-black transition-colors"
              title="LinkedIn"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/ashish-chanchal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-white hover:bg-accent hover:text-black transition-colors"
              title="GitHub"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/ashish._chanchal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-white hover:bg-accent hover:text-black transition-colors"
              title="Instagram"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
          </div>

          <Button
            text="CV.PDF"
            link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
            variant="cyan"
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
            className="p-2 bg-[#181818] border-2 border-white text-white font-mono text-sm font-bold shadow-brutal-accent active:translate-x-[1px] active:translate-y-[1px]"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? '✕ CLOSE' : '☰ MENU'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0c0c0c] border-t-2 border-white p-4 space-y-2">
          {NavItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => {
                setSelectedItem(item.id);
                toggleMenu();
              }}
              className={`block font-mono text-sm px-4 py-2.5 border-2 ${
                selectedItem === item.id
                  ? 'bg-accent text-black border-black font-black'
                  : 'bg-[#181818] text-white border-[#333333]'
              }`}
            >
              <span className="text-[#888888] mr-2">[{item.code}]</span>
              {item.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
            <span className="font-mono text-xs text-[#888888]">CONNECT:</span>
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/ashishchanchal/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#181818] text-white border border-white text-xs"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/ashish-chanchal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#181818] text-white border border-white text-xs"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ashish._chanchal/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#181818] text-white border border-white text-xs"
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
