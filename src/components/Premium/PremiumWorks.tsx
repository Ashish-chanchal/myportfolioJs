import { useMemo, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { LuArrowUpRight, LuSearch } from 'react-icons/lu';
import { COLORS, PageHead, PageShell, usePageAnim } from './PremiumShared';

export interface WorkItem {
  id: number;
  title: string;
  image?: string;
  tech: string;
  description: string[];
  livelink?: string;
  link?: string;
  category: string;
  type: string;
  team?: { name: string; link: string };
}

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web apps' },
  { id: 'mobile', label: 'Mobile' },
];

const PremiumWorks = ({ projects }: { projects: WorkItem[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => (filter === 'all' || p.type === filter) && (!q || `${p.title} ${p.tech} ${p.category}`.toLowerCase().includes(q)));
  }, [projects, filter, query]);

  usePageAnim(ref, [shown]);

  return (
    <PageShell innerRef={ref}>
      <PageHead kick="Works archive" title="Everything I've built, in one place." sub="Production apps, distributed microservices, AI pipelines and a few open-source experiments." />
      <div className="pm-wrap">
        <div className="pm-toolbar">
          <div className="pm-filters">
            {FILTERS.map((f) => <button key={f.id} className={filter === f.id ? 'is-active' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>)}
          </div>
          <label className="pm-search"><LuSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by tech or title" aria-label="Search projects" /></label>
        </div>
        <p className="pm-count">Showing {shown.length} of {projects.length} projects</p>

        <div className="pm-wgrid">
          {shown.map((p, i) => {
            const [name, ...rest] = p.title.split(' // ');
            return (
              <article className="pm-wcard pm-rv" key={p.id} style={{ background: COLORS[i % COLORS.length] }}>
                <div className="pm-wshot">
                  {p.image ? <img src={p.image} alt={name} loading="lazy" /> : <div className="pm-ph">{name.slice(0, 2)}</div>}
                </div>
                <span className="pm-cat" style={{ marginLeft: 0 }}>{p.category}</span>
                <h3>{name}</h3>
                {rest.length > 0 && <p className="pm-tl">{rest.join(' // ')}</p>}
                <p>{p.description[0]}</p>
                <div className="pm-tags">{p.tech.split(' · ').slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>
                <div className="pm-cta">
                  {p.livelink && <a className="pm-btn is-ink is-sm" href={p.livelink} target="_blank" rel="noreferrer">Live site <LuArrowUpRight /></a>}
                  {p.link && <a className="pm-btn is-sm" href={p.link} target="_blank" rel="noreferrer"><FaGithub /> Source</a>}
                  {p.team && <a className="pm-btn is-sm" href={p.team.link} target="_blank" rel="noreferrer">with {p.team.name}</a>}
                </div>
              </article>
            );
          })}
        </div>
        {shown.length === 0 && <p className="pm-empty">Nothing matches that search. Try another keyword.</p>}
      </div>
    </PageShell>
  );
};

export default PremiumWorks;
