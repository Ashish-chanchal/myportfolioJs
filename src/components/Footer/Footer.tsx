import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../shared/Logo';

const Footer: React.FC = () => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`pt-12 pb-8 text-white relative transition-all ${
        isMinimal ? 'bg-zinc-950 border-t border-zinc-800/80' : 'bg-[#0a0a0a] border-t-2 border-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 ${isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'}`}>
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" onClick={scrollToTop}>
              <Logo size="lg" />
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-sans">
              Chronicles of high-performance engineering, scalable backends, real-time voice AI, and clinical machine learning models.
            </p>

            <div className="font-mono text-[11px] text-zinc-600">
              LOGGED AT NOIDA, UTTAR PRADESH, INDIA // UTC+5:30
            </div>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono font-bold text-xs text-accent uppercase tracking-wider">
              {isMinimal ? 'Navigation' : '// ARCHIVE WAYPOINTS'}
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">[00]</span> HOME
                </Link>
              </li>
              <li>
                <Link to="/works" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">[01]</span> WORKS ARCHIVE
                </Link>
              </li>
              <li>
                <Link to="/about-me" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">[02]</span> ABOUT & STORY
                </Link>
              </li>
              <li>
                <Link to="/contact-me" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-zinc-600">[03]</span> CONTACT RELAY
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 text-[11px]">
                  <span>[-]</span> PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels & Back to Top (3 cols) */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono font-bold text-xs text-accent uppercase tracking-wider mb-3">
                {isMinimal ? 'Connect' : '// MEDIA BEACONS'}
              </h4>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/ashishchanchal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 transition-all brutal-btn ${
                    isMinimal
                      ? 'rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      : 'bg-[#181818] border border-white text-white hover:bg-accent hover:text-black'
                  }`}
                  title="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/ashish-chanchal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 transition-all brutal-btn ${
                    isMinimal
                      ? 'rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      : 'bg-[#181818] border border-white text-white hover:bg-accent hover:text-black'
                  }`}
                  title="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/_ashishchanchal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 transition-all brutal-btn ${
                    isMinimal
                      ? 'rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      : 'bg-[#181818] border border-white text-white hover:bg-accent hover:text-black'
                  }`}
                  title="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ashish._chanchal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 transition-all brutal-btn ${
                    isMinimal
                      ? 'rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      : 'bg-[#181818] border border-white text-white hover:bg-accentSec hover:text-black'
                  }`}
                  title="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className={`px-3 py-2 flex items-center justify-between transition-all font-mono text-xs font-bold brutal-btn ${
                isMinimal
                  ? 'rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  : 'bg-[#181818] border-2 border-white text-white hover:bg-accent hover:text-black shadow-brutal-sm'
              }`}
            >
              <span>{isMinimal ? 'Back to top' : 'WARP TO TOP'}</span>
              <FaArrowUp className="w-3 h-3 ml-2" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} ASHISH CHANCHAL // ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
            <span className="text-zinc-400 font-medium">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
