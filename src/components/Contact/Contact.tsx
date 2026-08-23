import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaCopy, FaCheck } from 'react-icons/fa';
import Heading from '../shared/Heading';
import Button from '../shared/Button';
import { useTheme } from '../../context/ThemeContext';

const SOCIALS = [
  {
    name: 'LinkedIn',
    handle: 'ashishchanchal',
    link: 'https://www.linkedin.com/in/ashishchanchal/',
    icon: <FaLinkedin className="w-4 h-4" />,
    color: '#00F0FF',
  },
  {
    name: 'GitHub',
    handle: 'Ashish-chanchal',
    link: 'https://github.com/Ashish-chanchal',
    icon: <FaGithub className="w-4 h-4" />,
    color: '#ffffff',
  },
  {
    name: 'Twitter / X',
    handle: '@_ashishchanchal',
    link: 'https://x.com/_ashishchanchal',
    icon: <FaTwitter className="w-4 h-4" />,
    color: '#00F0FF',
  },
  {
    name: 'Instagram',
    handle: '@ashish._chanchal',
    link: 'https://www.instagram.com/ashish._chanchal/',
    icon: <FaInstagram className="w-4 h-4" />,
    color: '#C778DD',
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';
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

        {/* ══════════════════════════════════════════════════════
             MODE 1: RETRO / VINTAGE BBS MODEM TRANSMISSION DESK
        ══════════════════════════════════════════════════════ */}
        {isRetro ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4 font-mono">
            {/* Left Column: BBS Transmission Desk (7 cols) */}
            <div className="lg:col-span-7 retro-window p-1">
              <div className="bg-[#38322b] px-3 py-1.5 flex items-center justify-between text-xs text-white border-b border-[#5a5247]">
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold">■</span>
                  <span className="font-pixel text-[11px] text-accent">BBS_NODE_01 // CARRIER_DETECT</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-bold">[ONLINE: 9600 BAUD]</span>
              </div>

              <div className="p-5 sm:p-7 bg-[#1a1714] flex flex-col gap-5">
                <div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-white tracking-wide mb-2">
                    &gt; INITIATE COMM_PACKET.EXE
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                    Ready to collaborate on high-throughput backend microservices, real-time voice AI pipelines, or production web apps? Transmit a packet below.
                  </p>
                </div>

                {/* Email Telex Desk */}
                <div className="p-3 bg-[#100e0c] border border-[#3d362e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-accent w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500">ELECTRONIC_MAIL_ADDR</div>
                      <div className="text-sm font-bold text-white font-mono select-all">{email}</div>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="retro-btn px-3 py-1.5 text-xs flex items-center justify-center gap-1.5 font-pixel"
                  >
                    {copied ? <><FaCheck /><span>COPIED_OK</span></> : <><FaCopy /><span>COPY_ADDR</span></>}
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={`mailto:${email}`}
                    className="retro-btn px-4 py-2 text-xs font-pixel flex items-center gap-1.5 font-bold"
                  >
                    <span>✉</span>
                    <span>SEND_DIRECT_MAIL</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashishchanchal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-btn px-4 py-2 text-xs font-pixel flex items-center gap-1.5"
                  >
                    <span>🔗</span>
                    <span>LINKEDIN.COM</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Communications Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="retro-window p-2.5 bg-[#2a2520] border border-[#5a5247] flex items-center justify-between text-xs font-pixel text-accent">
                <span>&gt;&gt; EXTERNAL FREQUENCIES</span>
                <span className="text-white">COM1..COM4</span>
              </div>

              <div className="space-y-2">
                {SOCIALS.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-window p-2.5 bg-[#181512] flex items-center justify-between hover:bg-[#221e1a] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ color: s.color }}>{s.icon}</span>
                      <div>
                        <div className="text-xs font-pixel text-white">{s.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{s.handle}</div>
                      </div>
                    </div>
                    <span className="text-accent text-xs font-bold font-mono">[CONNECT ↗]</span>
                  </a>
                ))}
              </div>

              {/* Status */}
              <div className="retro-window p-3 bg-[#12100e] text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <span>●</span> HARDWARE STATUS: READY
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Open for software engineering appointments & AI advisory contracts. Packet reply SLA: &lt;24 hrs.
                </p>
              </div>
            </div>
          </div>

        ) : isEditorial ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
            {/* Left Column: Editorial Inquiry Desk (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0e0e12] border border-white/12 rounded-md flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[10px] text-zinc-400">
                  <span className="font-serif italic text-accent font-bold text-xs">OFFICE OF COMMUNICATIONS</span>
                  <span>DISPATCH // OPEN</span>
                </div>

                <h3 className="font-editorial text-3xl font-bold text-white tracking-tight italic mb-3 leading-snug">
                  Initiate correspondence on <br />
                  <span className="text-accent not-italic">software & AI systems.</span>
                </h3>

                <p className="font-serif text-sm text-zinc-300 leading-relaxed mb-6">
                  Seeking an autonomous Software Developer to build high-performance distributed backends, deploy real-time voice AI pipelines, or architect full-stack applications? Send a formal dispatch below.
                </p>

                {/* Email Desk Slip */}
                <div className="p-4 rounded bg-[#121216] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-accent w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">ELECTRONIC MAIL DESK</div>
                      <div className="font-serif italic text-sm sm:text-base font-semibold text-white select-all">
                        {email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className={`font-serif italic text-xs font-semibold px-4 py-2 rounded border transition-all flex items-center justify-center gap-2 ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {copied ? <><FaCheck /><span>Address Copied</span></> : <><FaCopy /><span>Copy Address</span></>}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button text="Send Direct Message" link={`mailto:${email}`} variant="accent" size="md" external />
                  <Button text="LinkedIn Dispatch" link="https://www.linkedin.com/in/ashishchanchal/" variant="white" size="md" external />
                </div>
              </div>
            </div>

            {/* Right Column: Press & Media Frequencies (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0e0e12] border border-white/12 rounded-md">
                <div className="font-serif italic font-bold text-xs text-accent uppercase pb-2 mb-4 border-b border-white/10">
                  Media & Social Bureaus
                </div>

                <div className="space-y-2.5">
                  {SOCIALS.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded bg-[#121216] border border-white/8 hover:border-white/20 transition-all font-serif"
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ color: s.color }}>{s.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-white italic">{s.name}</div>
                          <div className="font-mono text-[10px] text-zinc-500 not-italic">{s.handle}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-accent">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Gazette Availability Status */}
              <div className="p-4 bg-[#0e0e12] border border-white/12 rounded-md font-serif">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1 italic">
                  <span>●</span> Current Gazette Status
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  Open for Full-Time Software Engineering appointments, AI systems advisory contracts, and open-source collaborations. Response SLA: &lt;24 hours.
                </p>
              </div>
            </div>
          </div>

        ) : isBento ? (
          /* ── Bento: asymmetric 12-col glass tiles ── */
          <div className="grid grid-cols-12 gap-4 mt-2">

            {/* Main CTA tile — 8 cols */}
            <div className="col-span-12 lg:col-span-8 bento-tile p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse inline-block" />
                <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Open for Opportunities
                </span>
                <span className="ml-auto font-mono text-[11px] text-zinc-500">NOIDA // UTC+5:30</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight mb-3">
                  Let's collaborate on <br />
                  <span className="text-accent">software & AI systems.</span>
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Looking for a high-performance Software Developer to build scalable backends, deploy
                  real-time voice AI microservices, or architect full-stack applications?
                </p>
              </div>

              {/* Email copy card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Email Address</div>
                    <div className="font-mono text-sm font-semibold text-white select-all">{email}</div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className={`font-mono text-xs font-semibold px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/6 text-zinc-300 border-white/15 hover:bg-white/12 hover:text-white'
                  }`}
                >
                  {copied ? <><FaCheck /><span>Copied!</span></> : <><FaCopy /><span>Copy</span></>}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button text="Send Direct Email" link={`mailto:${email}`} variant="accent" size="md" external />
                <Button text="LinkedIn Message" link="https://www.linkedin.com/in/ashishchanchal/" variant="dark" size="md" external />
              </div>
            </div>

            {/* Social tiles — 4 cols, 2×2 grid */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-tile p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-mono font-semibold text-xs text-white leading-tight">{s.name}</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-0.5">{s.handle}</div>
                  </div>
                  <span className="text-xs mt-auto" style={{ color: s.color }}>↗</span>
                </a>
              ))}
            </div>

            {/* Status tile — full width bottom */}
            <div className="col-span-12 bento-tile p-5 flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse flex-shrink-0" />
              <div>
                <div className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Current Status</div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Open for Full-Time Software Engineering roles, AI systems engineering contracts, and
                  open-source collaborations. Response SLA: &lt;24 hours.
                </p>
              </div>
            </div>
          </div>

        ) : (
          /* ── Classic layout (minimalist / brutalist) ── */
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

                <h3 className={`text-2xl sm:text-3xl font-heading text-white tracking-tight mb-4 ${isMinimal ? 'font-bold' : 'font-black uppercase'}`}>
                  Let's collaborate on <br />
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
                      <div className="font-mono text-sm sm:text-base font-bold text-white select-all">{email}</div>
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
                    {copied ? <><FaCheck /><span>COPIED!</span></> : <><FaCopy /><span>COPY ADDRESS</span></>}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button text="Send Direct Email" link={`mailto:${email}`} variant="accent" size="md" external />
                  <Button text="LinkedIn Message" link="https://www.linkedin.com/in/ashishchanchal/" variant="dark" size="md" external />
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
                  {SOCIALS.map((s, idx) => (
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
                        <span style={{ color: s.color }}>{s.icon}</span>
                        <div>
                          <div className="font-mono font-bold text-xs text-white">{s.name.toUpperCase()}</div>
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
        )}
      </div>
    </section>
  );
};

export default Contact;
