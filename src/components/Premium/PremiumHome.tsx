import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedinIn, FaRegCopy, FaCheck } from 'react-icons/fa';
import { LuArrowUpRight, LuDownload, LuMail } from 'react-icons/lu';
import { techData } from '../Skills/Skills';
import './premium.css';

gsap.registerPlugin(ScrollTrigger);

export interface PremiumProject {
  id: number;
  title: string;
  image?: string;
  tech: string;
  description: string[];
  livelink?: string;
  link?: string;
  category: string;
  team?: { name: string; link: string };
}

export interface PremiumExperience {
  id: number;
  tech: string;
  title: string;
  period: string;
  location: string;
  description: string[];
}

const EMAIL = 'akchanchal2002@gmail.com';
const RESUME = 'https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link';
const ROLES = ['software developer', 'AI & LLM engineer', 'full-stack architect', 'systems builder'];
const PEACH = 'var(--pm-peach)', MINT = 'var(--pm-mint)', LILAC = 'var(--pm-lilac)', BUTTER = 'var(--pm-butter)', SKY = 'var(--pm-sky)';
const COLORS = [PEACH, MINT, LILAC, BUTTER, SKY];
const STATS = [
  { to: 2, prefix: '', suffix: '+', dec: 0, l: 'Years building in industry', c: PEACH },
  { to: 10, prefix: '', suffix: '+', dec: 0, l: 'Apps shipped end-to-end', c: MINT },
  { to: 3, prefix: '<', suffix: 's', dec: 0, l: 'Voice AI latency, down from 15s', c: LILAC },
  { to: 88.9, prefix: '', suffix: '%', dec: 1, l: 'EEG classification accuracy', c: BUTTER },
];
const PRINCIPLES = [
  { t: 'Fast by default', d: 'Cutting AI voice response from 15s to 3s with function streaming and WebSocket architectures.', c: PEACH },
  { t: 'Built to scale', d: 'NestJS, gRPC and Azure DevOps CI/CD designed for fault tolerance and rapid growth.', c: MINT },
  { t: 'Alive on screen', d: 'WebGL, Three.js 3D avatars and precise UI systems that feel good to use.', c: LILAC },
];
const STICKERS = [
  { t: 'NestJS', c: PEACH, style: { right: '3%', top: '13%' }, speed: 120 },
  { t: 'React', c: MINT, style: { right: '24%', top: '56%' }, speed: 60 },
  { t: 'Voice AI', c: LILAC, style: { right: '6%', top: '60%' }, speed: 160 },
  { t: 'MCP', c: BUTTER, style: { right: '31%', top: '14%' }, speed: 90 },
  { t: 'Flutter', c: SKY, style: { right: '17%', top: '80%' }, speed: 40 },
];
const FILTERS = ['All', 'AI & systems', 'Web', 'Mobile & ML'] as const;
type Filter = (typeof FILTERS)[number];

const groupOf = (c: string): Filter => {
  if (/AI|MCP|Microservices/i.test(c)) return 'AI & systems';
  if (/Frontend|Full-Stack|Commerce|Streaming|Audio/i.test(c)) return 'Web';
  return 'Mobile & ML';
};

const Words = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((w, i) => (
      <span className="pm-w" key={i}><span className="pm-wi">{w}&nbsp;</span></span>
    ))}
  </>
);

const Pill = ({ c, children }: { c: string; children: string }) => (
  <span className="pm-w"><span className="pm-wi"><span className="pm-pill" style={{ ['--pc' as string]: c }}>{children}</span>&nbsp;</span></span>
);

const ProjectCard = ({ p, i }: { p: PremiumProject; i: number }) => {
  const [name, ...rest] = p.title.split(' // ');
  const subtitle = rest.join(' // ');
  const tags = p.tech.split(' · ').slice(0, 5);
  return (
    <div className="pm-sc" style={{ ['--i' as string]: i }}>
      <article className="pm-card" style={{ background: COLORS[i % COLORS.length] }}>
        <div className="pm-cbody">
          <div><span className="pm-num">{String(i + 1).padStart(2, '0')}</span><span className="pm-cat">{p.category}</span></div>
          <h3>{name}</h3>
          {subtitle && <p className="pm-tl">{subtitle}</p>}
          <p>{p.description[0]}</p>
          <div className="pm-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="pm-cta">
            {p.livelink && <a className="pm-btn is-ink is-sm" href={p.livelink} target="_blank" rel="noreferrer">Live site <LuArrowUpRight /></a>}
            {p.link && <a className="pm-btn is-sm" href={p.link} target="_blank" rel="noreferrer"><FaGithub /> Source</a>}
            {p.team && <a className="pm-btn is-sm" href={p.team.link} target="_blank" rel="noreferrer">with {p.team.name}</a>}
          </div>
        </div>
        <div className="pm-shot">
          {p.image ? <img src={p.image} alt={name} loading="lazy" /> : <div className="pm-ph">{name.slice(0, 2)}</div>}
        </div>
      </article>
    </div>
  );
};

const PremiumHome = ({ projects, experience }: { projects: PremiumProject[]; experience: PremiumExperience[] }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const firstStack = useRef(true);
  const [role, setRole] = useState(0);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');
  const [stackIdx, setStackIdx] = useState(0);

  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => groupOf(p.category) === filter)), [projects, filter]);
  const marquee = useMemo(() => techData.flatMap((g) => g.technologies), []);
  const stack = techData[stackIdx];

  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);

  /* Page-level GSAP: runs once */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.toArray;

      gsap.to('.pm-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      // hero intro
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.pm-hello', { y: 20, opacity: 0, duration: 0.7 })
        .from('.pm-hero .pm-wi', { yPercent: 120, rotate: 5, duration: 1.1, stagger: 0.07 }, '-=0.4')
        .from('.pm-hero .pm-pill', { backgroundSize: '0% 100%', duration: 0.8, stagger: 0.15, ease: 'power3.inOut' }, '-=0.5')
        .from(['.pm-lead', '.pm-hero .pm-cta > *'], { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.7')
        .from('.pm-sticker', { scale: 0, rotate: -40, duration: 0.9, ease: 'back.out(2.2)', stagger: 0.1 }, '-=0.8');

      // hero parallax + idle wobble
      q<HTMLElement>('.pm-sticker').forEach((el, i) => {
        gsap.to(el, { y: -Number(el.dataset.speed || 60), ease: 'none', scrollTrigger: { trigger: '.pm-hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to(el, { rotate: i % 2 ? 4 : -4, duration: 2 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });
      q<HTMLElement>('.pm-blob').forEach((el, i) => {
        gsap.to(el, { y: (i + 1) * -90, x: i % 2 ? 40 : -40, ease: 'none', scrollTrigger: { trigger: '.pm-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      });

      // stats: pop in + count up
      gsap.from('.pm-stat', { y: 70, opacity: 0, rotate: (i) => (i % 2 ? 4 : -4), duration: 0.9, ease: 'back.out(1.6)', stagger: 0.1, scrollTrigger: { trigger: '.pm-stats', start: 'top 88%' } });
      q<HTMLElement>('.pm-stat b').forEach((el) => {
        const to = Number(el.dataset.to), dec = Number(el.dataset.dec), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = `${pre}${o.v.toFixed(dec)}${suf}`; } });
      });

      // marquee reacts to scroll velocity
      const track = gsap.to('.pm-track', { xPercent: -50, duration: 36, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          gsap.to(track, { timeScale: (1 + Math.abs(self.getVelocity()) / 220) * self.direction, duration: 0.15, overwrite: true, onComplete: () => { gsap.to(track, { timeScale: 1, duration: 1.2 }); } });
        },
      });

      // headings
      q<HTMLElement>('.pm-split').forEach((h) => {
        gsap.from(h.querySelectorAll('.pm-wi'), { yPercent: 120, rotate: 4, duration: 0.9, ease: 'power4.out', stagger: 0.05, scrollTrigger: { trigger: h, start: 'top 85%' } });
      });
      q<HTMLElement>('.pm-kick').forEach((k) => {
        gsap.from(k, { scale: 0, rotate: -20, duration: 0.7, ease: 'back.out(2.4)', scrollTrigger: { trigger: k, start: 'top 90%' } });
      });

      // timeline
      gsap.to('.pm-tl-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.pm-timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } });
      q<HTMLElement>('.pm-tl-item').forEach((el, i) => {
        gsap.from(el, { x: i % 2 ? 60 : -60, opacity: 0, rotate: i % 2 ? 1.5 : -1.5, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      // principles
      gsap.from('.pm-pr > div', { y: 100, opacity: 0, rotate: (i) => [-5, 2, 6][i % 3], duration: 1, ease: 'back.out(1.5)', stagger: 0.14, scrollTrigger: { trigger: '.pm-pr', start: 'top 82%' } });

      // contact
      gsap.fromTo('.pm-contact', { scale: 0.84, borderRadius: 220 }, { scale: 1, borderRadius: 48, ease: 'none', scrollTrigger: { trigger: '.pm-contact', start: 'top 100%', end: 'top 30%', scrub: true } });
      q<HTMLElement>('.pm-orb').forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? -80 : 80, rotate: 40, ease: 'none', scrollTrigger: { trigger: '.pm-contact', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
      gsap.from('.pm-contact .pm-cta > *', { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.pm-contact .pm-cta', start: 'top 92%' } });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener('load', refresh); mm.revert(); };
  }, []);

  /* Project deck: rebuilt whenever the filter changes */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.pm-sc');
      cards.forEach((el, i) => {
        const inner = el.querySelector('.pm-card');
        gsap.from(inner, { y: 90, opacity: 0, rotate: i % 2 ? 2.5 : -2.5, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
        const next = cards[i + 1];
        if (next) {
          gsap.to(inner, { scale: 0.93, ease: 'none', scrollTrigger: { trigger: next, start: 'top 88%', end: `top ${96 + (i + 1) * 16}px`, scrub: true } });
        }
        const img = el.querySelector('.pm-shot img');
        if (img) gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, deckRef);
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [shown]);

  /* Stack chips pop when a tab changes */
  useLayoutEffect(() => {
    if (firstStack.current) { firstStack.current = false; return; }
    const ctx = gsap.context(() => {
      gsap.from('.pm-chips span', { scale: 0.5, opacity: 0, y: 16, rotate: () => gsap.utils.random(-8, 8), duration: 0.55, ease: 'back.out(2.2)', stagger: 0.035 });
    }, stackRef);
    return () => ctx.revert();
  }, [stackIdx]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <div className="pm-root" ref={rootRef}>
      <div className="pm-progress" />

      <section className="pm-hero" id="hero">
        <div className="pm-blob" style={{ width: 460, height: 460, background: PEACH, right: '-8%', top: '-6%' }} />
        <div className="pm-blob" style={{ width: 300, height: 300, background: MINT, left: '-6%', top: '48%' }} />
        <div className="pm-blob" style={{ width: 160, height: 160, background: LILAC, left: '42%', top: '8%' }} />
        <div className="pm-stickers" aria-hidden="true">
          {STICKERS.map((s) => (
            <span key={s.t} className="pm-sticker" data-speed={s.speed} style={{ ...s.style, background: s.c }}>{s.t}</span>
          ))}
        </div>
        <div className="pm-wrap">
          <span className="pm-hello"><span className="pm-dot" />Open to work · Noida, India</span>
          <h1 className="pm-h1">
            <Words text="Hey, I make" />
            <Pill c={PEACH}>fast,</Pill>
            <Pill c={MINT}>smart</Pill>
            <Words text="and" />
            <Pill c={LILAC}>friendly</Pill>
            <Words text="software." />
          </h1>
          <p className="pm-lead">
            I&apos;m Ashish, a <span className="pm-role">{ROLES[role]}</span>. From real-time voice assistants to clinical ML, I turn hard problems into things people enjoy using.
          </p>
          <div className="pm-cta">
            <button className="pm-btn is-ink" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>See my work <LuArrowUpRight /></button>
            <a className="pm-btn" href={RESUME} target="_blank" rel="noreferrer"><LuDownload /> Resume</a>
            <button className="pm-btn" onClick={copyEmail}>{copied ? <FaCheck /> : <FaRegCopy />} {copied ? 'Copied' : 'Copy email'}</button>
            <a className="pm-btn" href="https://github.com/Ashish-chanchal" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a className="pm-btn" href="https://www.linkedin.com/in/ashishchanchal/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>

          <div className="pm-stats">
            {STATS.map((s) => (
              <div className="pm-stat" key={s.l} style={{ background: s.c }}>
                <b data-to={s.to} data-dec={s.dec} data-pre={s.prefix} data-suf={s.suffix}>{s.prefix}{s.to.toFixed(s.dec)}{s.suffix}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-marq" aria-hidden="true">
          <div className="pm-track">
            {[...marquee, ...marquee].map((t, i) => <span key={`${t}-${i}`}>{t}</span>)}
          </div>
        </div>
      </section>

      <div className="pm-wrap">
        <section className="pm-section" id="work">
          <div className="pm-head">
            <div>
              <span className="pm-kick">Selected work</span>
              <h2 className="pm-h2 pm-split"><Words text="Things I've made, shipped and loved." /></h2>
            </div>
            <div className="pm-filters">
              {FILTERS.map((f) => <button key={f} className={filter === f ? 'is-active' : ''} onClick={() => setFilter(f)}>{f}</button>)}
            </div>
          </div>
          <div className="pm-deck" ref={deckRef}>
            {shown.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        </section>

        <section className="pm-section" id="experience">
          <span className="pm-kick">Experience</span>
          <h2 className="pm-h2 pm-split"><Words text="Where I've been making things." /></h2>
          <div className="pm-timeline">
            <div className="pm-tl-line"><div className="pm-tl-fill" /></div>
            {experience.map((e, i) => {
              const [roleName, when] = e.title.split(' · ');
              return (
                <div className="pm-tl-item" key={e.id} style={{ ['--c' as string]: COLORS[i % COLORS.length] }}>
                  <div className="pm-tl-card">
                    <div className="pm-tl-top"><h3>{roleName}</h3><span>{when}</span></div>
                    <div className="pm-tl-co">{e.tech} · {e.location}</div>
                    <ul>{e.description.map((d) => <li key={d}>{d}</li>)}</ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pm-section" id="stack">
          <span className="pm-kick">Toolbox</span>
          <h2 className="pm-h2 pm-split"><Words text="Tools I reach for every day." /></h2>
          <div className="pm-stack" ref={stackRef}>
            <div className="pm-tabs">
              {techData.map((g, i) => (
                <button key={g.id} className={i === stackIdx ? 'is-active' : ''} style={{ ['--c' as string]: COLORS[i % COLORS.length] }} onClick={() => setStackIdx(i)}>
                  {g.category}<small>{g.technologies.length}</small>
                </button>
              ))}
            </div>
            <div className="pm-panel" style={{ background: COLORS[stackIdx % COLORS.length] }}>
              <h3>{stack.category}</h3>
              <div className="pm-chips">{stack.technologies.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="pm-section" id="principles">
          <span className="pm-kick">Principles</span>
          <h2 className="pm-h2 pm-split"><Words text="How I like to build." /></h2>
          <div className="pm-pr">
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} style={{ background: p.c }}><b>0{i + 1}</b><div><h3>{p.t}</h3><p>{p.d}</p></div></div>
            ))}
          </div>
        </section>

        <section className="pm-contact" id="contact">
          <span className="pm-orb" style={{ width: 220, height: 220, background: PEACH, left: -60, top: -50 }} />
          <span className="pm-orb" style={{ width: 160, height: 160, background: LILAC, right: -30, bottom: 30 }} />
          <span className="pm-orb" style={{ width: 90, height: 90, background: MINT, right: '18%', top: 40 }} />
          <span className="pm-kick">Contact</span>
          <h2 className="pm-split"><Words text="Got an idea? Let's make it real." /></h2>
          <p>Open to full-time roles, freelance projects and interesting problems.</p>
          <div className="pm-cta">
            <a className="pm-btn is-ink" href={`mailto:${EMAIL}`}><LuMail /> Say hello</a>
            <a className="pm-btn" href="https://www.linkedin.com/in/ashishchanchal/" target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumHome;
