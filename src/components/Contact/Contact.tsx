import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaCopy, FaCheck } from 'react-icons/fa';
import Heading from '../shared/Heading';
import Button from '../shared/Button';
import { useTheme } from '../../context/ThemeContext';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const email = 'akchanchal2002@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="TRANSMISSION RELAY"
          tag="// DIRECT COMMUNICATIONS"
          index="WAYPOINT_05"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Left Column: Direct Message Box (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 md:p-8 transition-all ${
                isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40'
                  : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
              }`}
            >
              <div className={`flex items-center justify-between pb-3 mb-6 ${isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    {isMinimal ? 'Open for Opportunities' : 'CHANNEL_OPEN // READY FOR INQUIRIES'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">NOIDA // UTC+5:30</span>
              </div>

              <h3
                className={`text-2xl sm:text-3xl font-heading text-white tracking-tight mb-4 ${
                  isMinimal ? 'font-bold' : 'font-black uppercase'
                }`}
              >
                Let’s collaborate on <br />
                <span className="text-accent">software & AI systems.</span>
              </h3>

              <p className={`text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 ${isMinimal ? 'font-sans' : 'font-mono'}`}>
                Looking for a high-performance Software Developer to build scalable backends, deploy
                real-time voice AI microservices, or architect full-stack applications? Send a direct
                message and let's build impactful systems.
              </p>

              {/* Email Copy Card */}
              <div
                className={`p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isMinimal
                    ? 'bg-zinc-950/60 border border-zinc-800/80 rounded-2xl'
                    : 'bg-[#181818] border-2 border-white shadow-brutal-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-accent w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-zinc-400">EMAIL ADDRESS</div>
                    <div className="font-mono text-sm sm:text-base font-bold text-white select-all">
                      {email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className={`font-mono text-xs font-bold px-3.5 py-2 border transition-all brutal-btn flex items-center justify-center gap-2 ${
                    isMinimal
                      ? copied
                        ? 'bg-emerald-500 text-black border-transparent rounded-full font-semibold'
                        : 'bg-zinc-800 text-white border-zinc-700 rounded-full hover:bg-zinc-700'
                      : copied
                      ? 'bg-[#00FF66] text-black border-black shadow-none'
                      : 'bg-accent text-black border-black shadow-[2px_2px_0px_0px_#ffffff]'
                  }`}
                >
                  {copied ? (
                    <>
                      <FaCheck />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  text="Send Direct Email"
                  link={`mailto:${email}`}
                  variant="accent"
                  size="md"
                  external
                />
                <Button
                  text="LinkedIn Message"
                  link="https://www.linkedin.com/in/ashishchanchal/"
                  variant="dark"
                  size="md"
                  external
                />
              </div>
            </div>
          </div>

          {/* Right Column: Social Channels Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-5 ${
                isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-sm shadow-xl'
                  : 'bg-[#121212] border-2 border-white shadow-brutal'
              }`}
            >
              <div className={`font-mono font-bold text-xs text-accent uppercase pb-2 mb-4 ${isMinimal ? 'border-b border-zinc-800/60' : 'border-b border-[#262626]'}`}>
                {isMinimal ? 'Social & Channels' : '// MEDIA & SOCIAL CHANNELS'}
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    name: 'LINKEDIN',
                    handle: 'ashishchanchal',
                    link: 'https://www.linkedin.com/in/ashishchanchal/',
                    icon: <FaLinkedin className="w-4 h-4 text-accent" />,
                  },
                  {
                    name: 'GITHUB',
                    handle: 'Ashish-chanchal',
                    link: 'https://github.com/Ashish-chanchal',
                    icon: <FaGithub className="w-4 h-4 text-white" />,
                  },
                  {
                    name: 'TWITTER / X',
                    handle: '@_ashishchanchal',
                    link: 'https://x.com/_ashishchanchal',
                    icon: <FaTwitter className="w-4 h-4 text-accent" />,
                  },
                  {
                    name: 'INSTAGRAM',
                    handle: '@ashish._chanchal',
                    link: 'https://www.instagram.com/ashish._chanchal/',
                    icon: <FaInstagram className="w-4 h-4 text-accentSec" />,
                  },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 transition-all brutal-btn ${
                      isMinimal
                        ? 'rounded-xl bg-zinc-950/50 border border-zinc-800/70 hover:border-zinc-600 hover:bg-zinc-900/80'
                        : 'bg-[#181818] border border-[#333333] hover:border-white hover:bg-[#222222]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {s.icon}
                      <div>
                        <div className="font-mono font-bold text-xs text-white">{s.name}</div>
                        <div className="font-mono text-[10px] text-zinc-400">{s.handle}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-accent">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Box */}
            <div
              className={`p-4 font-mono text-xs text-zinc-300 ${
                isMinimal
                  ? 'rounded-2xl bg-zinc-900/40 border border-zinc-800/80'
                  : 'bg-[#181818] border-2 border-white shadow-brutal-sm'
              }`}
            >
              <div className="flex items-center gap-2 text-[#00FF66] font-bold mb-1">
                <span>●</span> CURRENT STATUS
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Open for Full-Time Software Engineering roles, AI systems engineering contracts, and
                open-source collaborations. Response SLA: &lt;24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
