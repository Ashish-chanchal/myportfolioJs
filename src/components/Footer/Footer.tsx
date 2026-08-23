import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-white pt-12 pb-8 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b-2 border-[#262626]">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent text-black font-heading font-black text-xl px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#ffffff]">
                AC
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-wider">
                  ASHISH CHANCHAL
                </h3>
                <p className="font-mono text-xs text-accent">
                  SOFTWARE DEVELOPER & AI SYSTEMS ENGINEER
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#A3A3A3] max-w-sm leading-relaxed">
              Chronicles of high-performance engineering, scalable backends, real-time voice AI, and clinical machine learning models.
            </p>

            <div className="font-mono text-[11px] text-[#666666]">
              LOGGED AT NOIDA, UTTAR PRADESH, INDIA // UTC+5:30
            </div>
          </div>

          {/* Waypoints Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono font-bold text-xs text-accent uppercase tracking-wider">
              // ARCHIVE WAYPOINTS
            </h4>
            <ul className="space-y-1.5 font-mono text-xs">
              <li>
                <Link to="/" className="text-[#A3A3A3] hover:text-accent transition-colors flex items-center gap-1.5">
                  <span className="text-[#888888]">[00]</span> HOME // DEPARTURE
                </Link>
              </li>
              <li>
                <Link to="/works" className="text-[#A3A3A3] hover:text-accent transition-colors flex items-center gap-1.5">
                  <span className="text-[#888888]">[01]</span> WORKS // ARTIFACTS ARCHIVE
                </Link>
              </li>
              <li>
                <Link to="/about-me" className="text-[#A3A3A3] hover:text-accent transition-colors flex items-center gap-1.5">
                  <span className="text-[#888888]">[02]</span> ABOUT // CHRONICLE
                </Link>
              </li>
              <li>
                <Link to="/contact-me" className="text-[#A3A3A3] hover:text-accent transition-colors flex items-center gap-1.5">
                  <span className="text-[#888888]">[03]</span> CONTACT // TRANSMISSION
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-[#666666] hover:text-white transition-colors flex items-center gap-1.5 text-[11px]">
                  <span>[-]</span> PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels & Back to Top (3 cols) */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono font-bold text-xs text-accent uppercase tracking-wider mb-3">
                // MEDIA BEACONS
              </h4>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/ashishchanchal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#181818] border border-white text-white hover:bg-accent hover:text-black hover:border-black transition-all brutal-btn"
                  title="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/ashish-chanchal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#181818] border border-white text-white hover:bg-accent hover:text-black hover:border-black transition-all brutal-btn"
                  title="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/_ashishchanchal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#181818] border border-white text-white hover:bg-accent hover:text-black hover:border-black transition-all brutal-btn"
                  title="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ashish._chanchal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#181818] border border-white text-white hover:bg-accentSec hover:text-black hover:border-black transition-all brutal-btn"
                  title="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to Top Warp Button */}
            <button
              onClick={scrollToTop}
              className="bg-[#181818] border-2 border-white text-white font-mono text-xs font-bold px-3 py-2 flex items-center justify-between hover:bg-accent hover:text-black hover:border-black shadow-brutal-sm brutal-btn"
            >
              <span>WARP TO TOP</span>
              <FaArrowUp />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#888888]">
          <div>
            © {new Date().getFullYear()} ASHISH CHANCHAL // ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FF66] inline-block border border-black"></span>
            <span className="text-white font-bold">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
