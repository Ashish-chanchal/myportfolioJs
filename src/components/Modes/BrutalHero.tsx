import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import heromain from '../../assets/hero/heromain.webp';

const ROLES = ['SOFTWARE DEVELOPER', 'AI & LLM ENGINEER', 'FULL-STACK ARCHITECT', 'SYSTEMS BUILDER'];
const STATS = [
  ['2+', 'YEARS IN INDUSTRY'],
  ['10+', 'APPS SHIPPED'],
  ['<3S', 'VOICE AI LATENCY'],
  ['88.9%', 'EEG ACCURACY'],
];
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const BrutalHero = () => {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="br-hero">
      <div className="br-grid">
        <div className="br-main">
          <span className="br-tag">HELLO_WORLD // I&apos;M ASHISH</span>
          <h1 className="br-h1">
            I build <mark>fast</mark> backends, <mark>voice AI</mark> &amp; things that ship.
          </h1>
          <p className="br-lead">
            Software developer &amp; AI systems engineer. NestJS microservices, real-time voice pipelines,
            clinical ML. No fluff, just production.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button text="See the work" onClick={() => go('projects')} variant="accent" size="lg" />
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

        <div className="br-side">
          <div className="br-photo">
            <img src={heromain} alt="Ashish Chanchal" />
            <span className="br-sticker">OPEN TO WORK</span>
          </div>
          <div className="br-role" key={role}>▶ {ROLES[role]}</div>
        </div>
      </div>

      <div className="br-stats">
        {STATS.map(([v, l]) => (
          <div key={l} className="br-stat">
            <b>{v}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>

      <div className="br-ticker" aria-hidden="true">
        <div className="br-ticker-track">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ['NESTJS', 'GRPC', 'REACT', 'THREE.JS', 'FLUTTER', 'AZURE', 'PYTHON', 'MCP'].map((t) => <span key={`${k}${t}`}>{t} ✱</span>)
          )}
        </div>
      </div>
      <div className="br-os">
        TRY <Link to="/macos">MACOS</Link> / <Link to="/windows11">WINDOWS 11</Link>
      </div>
    </div>
  );
};

export default BrutalHero;
