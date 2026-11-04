import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowUpRight } from 'react-icons/lu';
import { techData } from '../Skills/Skills';
import { BUTTER, COLORS, LILAC, MINT, PageHead, PageShell, PEACH, SKY, usePageAnim, Words } from './PremiumShared';

export interface Milestone { phase: string; title: string; desc: string; badge: string }
export interface Fact { id: number; facts: string }

const SNAPSHOT = [
  ['Based in', 'Noida, India'],
  ['Specialty', 'Full-stack and AI systems'],
  ['Backend', 'NestJS, FastAPI, gRPC'],
  ['Frontend', 'React, Next.js, Three.js'],
  ['AI stack', 'OpenAI, Gemini, MNE'],
  ['Cloud', 'Azure, GCP, Docker'],
];

const sentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const PremiumAbout = ({ milestones, facts }: { milestones: Milestone[]; facts: Fact[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  usePageAnim(ref, []);

  return (
    <PageShell innerRef={ref}>
      <PageHead kick="About me" title="Turning curiosity into high-throughput reality." sub="Self-taught developer and AI engineer, building complete web and mobile ecosystems from Noida." />
      <div className="pm-wrap">
        <section className="pm-abt">
          <div className="pm-prose">
            <p className="pm-rv">I&apos;m a self-taught software developer and AI engineer based in Noida, Uttar Pradesh. Over the past few years I&apos;ve architected and shipped complete web and mobile ecosystems, scalable cloud-native microservices and GenAI applications.</p>
            <p className="pm-rv">My approach is grounded in first principles: measure real-world performance, keep architectures clear and resilient, and chase latency bottlenecks wherever they hide.</p>
            <p className="pm-rv">When I&apos;m not writing NestJS microservices or tuning LLM function calls, you&apos;ll find me exploring WebGL and Three.js, taking part in technical communities, or testing the latest ideas in distributed systems.</p>
            <div className="pm-cta pm-rv">
              <Link to="/contact-me" className="pm-btn is-ink">Get in touch <LuArrowUpRight /></Link>
              <Link to="/works" className="pm-btn">See my work</Link>
            </div>
          </div>
          <aside className="pm-snap pm-rv" style={{ background: BUTTER }}>
            <h3>Quick snapshot</h3>
            <dl>{SNAPSHOT.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
          </aside>
        </section>

        <section className="pm-section">
          <span className="pm-kick">Journey</span>
          <h2 className="pm-h2 pm-split"><Words text="How I got here." /></h2>
          <div className="pm-journey">
            {milestones.map((m, i) => (
              <article className="pm-stage pm-rv" key={m.phase} style={{ background: COLORS[i % COLORS.length] }}>
                <b>0{i + 1}</b>
                <div>
                  <span className="pm-cat" style={{ marginLeft: 0 }}>{sentence(m.badge)}</span>
                  <h3>{sentence(m.title)}</h3>
                  <p>{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pm-section">
          <span className="pm-kick">Off the clock</span>
          <h2 className="pm-h2 pm-split"><Words text="A few things about me." /></h2>
          <div className="pm-notes">
            {facts.map((f, i) => (
              <div className="pm-note pm-rv" key={f.id} style={{ background: [PEACH, MINT, LILAC, SKY][i % 4], ['--r' as string]: `${[-2.5, 2, -1.5, 3][i % 4]}deg` }}>{f.facts}</div>
            ))}
          </div>
        </section>

        <section className="pm-section">
          <span className="pm-kick">Toolbox</span>
          <h2 className="pm-h2 pm-split"><Words text="What I work with." /></h2>
          <div className="pm-tgrid">
            {techData.map((g, i) => (
              <div className="pm-tcard pm-rv" key={g.id} style={{ background: COLORS[i % COLORS.length] }}>
                <h3>{g.category}</h3>
                <div className="pm-chips">{g.technologies.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default PremiumAbout;
