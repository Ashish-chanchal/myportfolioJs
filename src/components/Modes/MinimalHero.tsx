import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import heromain from '../../assets/hero/heromain.webp';

const ROLES = ['software developer', 'AI & LLM engineer', 'full-stack architect', 'systems builder'];
const FACTS = [
  ['2+', 'years in industry'],
  ['10+', 'apps shipped'],
  ['<3s', 'voice AI latency'],
  ['88.9%', 'EEG accuracy'],
];
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const MinimalHero = () => {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mn-hero">
      <div className="mn-top">
        <img src={heromain} alt="Ashish Chanchal" className="mn-avatar" />
        <div>
          <div className="mn-name">Ashish Chanchal</div>
          <div className="mn-meta"><i className="mn-live" /> Noida, India · <span key={role} className="mn-role">{ROLES[role]}</span></div>
        </div>
      </div>

      <h1 className="mn-h1">
        Building scalable, <span className="mn-soft">intelligent</span> systems across code&nbsp;&amp;&nbsp;AI.
      </h1>

      <div className="mn-grid">
        <p className="mn-lead">
          Backend microservices in NestJS, real-time voice AI, interactive interfaces in React and Three.js,
          and clinical ML models. Small teams, high standards, shipped to production.
        </p>
        <div className="mn-cta">
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

      <dl className="mn-facts">
        {FACTS.map(([v, l]) => (
          <div key={l}>
            <dt>{v}</dt>
            <dd>{l}</dd>
          </div>
        ))}
      </dl>
      <div className="mn-links">
        Prefer a desktop? <Link to="/macos">macOS</Link> · <Link to="/windows11">Windows 11</Link>
      </div>
    </div>
  );
};

export default MinimalHero;
