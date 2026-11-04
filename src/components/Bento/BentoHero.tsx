import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaWindows } from 'react-icons/fa';
import Button from '../shared/Button';
import heromain from '../../assets/hero/heromain.webp';

const ROLES = ['Software Developer', 'AI & LLM Engineer', 'Full-stack Architect', 'Systems Builder'];
const METRICS = [
  { label: 'Experience', val: '2+', unit: 'yrs', sub: 'Industry & systems' },
  { label: 'Production', val: '10+', unit: 'apps', sub: 'Deployed end-to-end' },
  { label: 'Voice AI latency', val: '<3', unit: 'sec', sub: 'Down from 15s' },
  { label: 'EEG model', val: '88.9', unit: '%', sub: 'Detection accuracy' },
];
const STACK = ['NestJS', 'gRPC', 'React', 'Next.js', 'TypeScript', 'Three.js', 'Flutter', 'Azure', 'Python', 'MCP', 'WebSockets', 'MongoDB'];

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const BentoHero = () => {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bx-hero grid grid-cols-12 gap-3.5 md:gap-4">
      {/* headline */}
      <div className="bento-tile bx-headline col-span-12 lg:col-span-8 lg:row-span-2 p-6 sm:p-10 flex flex-col justify-between gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="bx-chip"><i className="bx-live" /> Available for high-impact roles</span>
            <span className="bx-chip is-quiet">Noida · UTC+5:30</span>
          </div>
          <h1 className="bx-h1">
            Engineering the <span className="bx-grad">future of software &amp; AI.</span>
          </h1>
          <p className="bx-lead">
            Software developer and AI systems engineer. I build resilient NestJS microservices, real-time voice AI
            pipelines and clinical ML models, and I ship them to production.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button text="Explore work" onClick={() => go('projects')} variant="accent" size="lg" />
          <Button text="Experience" onClick={() => go('experience')} variant="dark" size="lg" />
          <Button
            text="Download CV"
            link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
            variant="white"
            size="lg"
            external
          />
        </div>
      </div>

      {/* portrait */}
      <div className="bento-tile bx-photo col-span-12 sm:col-span-6 lg:col-span-4 lg:row-span-2 min-h-[340px]">
        <img className="bx-photo-bg" src={heromain} alt="" aria-hidden="true" />
        <img className="bx-photo-fg" src={heromain} alt="Ashish Chanchal" />
        <div className="bx-photo-shade" />
        <div className="bx-photo-meta">
          <div>
            <div className="bx-name">Ashish Chanchal</div>
            <div className="bx-role">{ROLES[role]}</div>
          </div>
          <span className="bx-chip is-glass">Open to work</span>
        </div>
      </div>

      {/* role rotator */}
      <div className="bento-tile col-span-12 sm:col-span-6 lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between gap-4 min-h-[150px]">
        <span className="bx-eyebrow">Currently</span>
        <div className="bx-roleline" key={role}>{ROLES[role]}</div>
        <div className="flex gap-1.5">
          {ROLES.map((_, i) => <span key={i} className={`bx-dot ${i === role ? 'is-on' : ''}`} />)}
        </div>
      </div>

      {/* metrics */}
      {METRICS.map((m) => (
        <div key={m.label} className="bento-tile col-span-6 sm:col-span-3 lg:col-span-2 p-5 flex flex-col justify-between gap-6">
          <span className="bx-eyebrow">{m.label}</span>
          <div>
            <div className="bx-stat">{m.val}<small>{m.unit}</small></div>
            <div className="bx-sub">{m.sub}</div>
          </div>
        </div>
      ))}

      {/* stack marquee */}
      <div className="bento-tile col-span-12 lg:col-span-8 py-5 flex flex-col gap-4 justify-center">
        <span className="bx-eyebrow px-6">Daily stack</span>
        <div className="bx-marquee">
          <div className="bx-track">
            {[...STACK, ...STACK].map((s, i) => <span key={i} className="bx-tag">{s}</span>)}
          </div>
        </div>
      </div>

      {/* OS modes */}
      <div className="bento-tile col-span-12 lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between gap-4">
        <span className="bx-eyebrow">Try another interface</span>
        <div className="flex flex-wrap gap-2.5">
          <Link to="/macos" className="bx-os"><FaApple /> macOS</Link>
          <Link to="/windows11" className="bx-os"><FaWindows /> Windows 11</Link>
        </div>
      </div>
    </div>
  );
};

export default BentoHero;
