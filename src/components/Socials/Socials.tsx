import React from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Heading from '../shared/Heading';

const SocialsData = [
  {
    id: 0,
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ashishchanchal/',
    icon: <FaLinkedin className="w-5 h-5 text-accent" />,
    tag: '@ashishchanchal',
  },
  {
    id: 1,
    name: 'GitHub',
    link: 'https://github.com/Ashish-chanchal',
    icon: <FaGithub className="w-5 h-5 text-white" />,
    tag: '@Ashish-chanchal',
  },
  {
    id: 2,
    name: 'Twitter / X',
    link: 'https://x.com/_ashishchanchal',
    icon: <FaTwitter className="w-5 h-5 text-accent" />,
    tag: '@_ashishchanchal',
  },
  {
    id: 3,
    name: 'Instagram',
    link: 'https://www.instagram.com/ashish._chanchal/',
    icon: <FaInstagram className="w-5 h-5 text-accentSec" />,
    tag: '@ashish._chanchal',
  },
  {
    id: 4,
    name: 'Direct Email',
    link: 'mailto:akchanchal2002@gmail.com',
    icon: <FaEnvelope className="w-5 h-5 text-[#00FF66]" />,
    tag: 'akchanchal2002@gmail.com',
  },
];

const Socials: React.FC = () => {
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
              className="bg-[#121212] border-2 border-white p-4 shadow-brutal hover:shadow-brutal-accent brutal-card flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#262626] mb-3">
                {social.icon}
                <span className="font-mono text-xs text-accent">↗</span>
              </div>
              <div>
                <h4 className="font-heading font-black text-base text-white uppercase">
                  {social.name}
                </h4>
                <p className="font-mono text-[11px] text-[#888888] truncate mt-0.5">
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
