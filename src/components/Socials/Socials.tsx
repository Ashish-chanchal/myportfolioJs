import React from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Heading from '../shared/Heading';
import { useTheme } from '../../context/ThemeContext';

const SocialsData = [
  {
    id: 0,
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ashishchanchal/',
    icon: <FaLinkedin className="w-5 h-5 text-accent" />,
    tag: '@ashishchanchal',
    color: '#00F0FF',
  },
  {
    id: 1,
    name: 'GitHub',
    link: 'https://github.com/Ashish-chanchal',
    icon: <FaGithub className="w-5 h-5 text-white" />,
    tag: '@Ashish-chanchal',
    color: '#FFFFFF',
  },
  {
    id: 2,
    name: 'Twitter / X',
    link: 'https://x.com/_ashishchanchal',
    icon: <FaTwitter className="w-5 h-5 text-accent" />,
    tag: '@_ashishchanchal',
    color: '#00F0FF',
  },
  {
    id: 3,
    name: 'Instagram',
    link: 'https://www.instagram.com/ashish._chanchal/',
    icon: <FaInstagram className="w-5 h-5 text-accentSec" />,
    tag: '@ashish._chanchal',
    color: '#C778DD',
  },
  {
    id: 4,
    name: 'Direct Email',
    link: 'mailto:akchanchal2002@gmail.com',
    icon: <FaEnvelope className="w-5 h-5 text-[#00FF66]" />,
    tag: 'akchanchal2002@gmail.com',
    color: '#00FF66',
  },
];

const Socials: React.FC = () => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';

  return (
    <div className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="ALL MEDIA RADARS"
          tag="// MULTI-CHANNEL FREQUENCIES"
          index="MEDIA_BEACONS"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {SocialsData.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 flex flex-col justify-between transition-all ${
                isBento
                  ? 'bento-tile hover:scale-[1.02]'
                  : isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600 rounded-2xl backdrop-blur-sm shadow-md hover:-translate-y-1'
                  : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
              }`}
            >
              <div className={`flex items-center justify-between pb-2 mb-3 ${isBento ? 'border-b border-white/10' : isMinimal ? 'border-b border-zinc-800/60' : 'border-b border-[#262626]'}`}>
                {social.icon}
                <span className="font-mono text-xs text-accent">↗</span>
              </div>
              <div>
                <h4 className={`text-base text-white ${isBento || isMinimal ? 'font-heading font-semibold' : 'font-heading font-black uppercase'}`}>
                  {social.name}
                </h4>
                <p className="font-mono text-[11px] text-zinc-400 truncate mt-0.5">
                  {social.tag}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;
