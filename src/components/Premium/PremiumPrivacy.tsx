import { useRef, type ReactNode } from 'react';
import { COLORS, PageHead, PageShell, usePageAnim } from './PremiumShared';

export interface LegalSection { id: number; title: string; content: ReactNode }

const PremiumPrivacy = ({ sections }: { sections: LegalSection[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  usePageAnim(ref, []);

  return (
    <PageShell innerRef={ref}>
      <PageHead kick="Legal" title="Privacy policy." sub="How data is handled across the applications and open-source projects published by Ashish Chanchal." />
      <div className="pm-wrap pm-legal">
        {sections.map((s, i) => (
          <section className="pm-lcard pm-rv" key={s.id} style={{ background: COLORS[i % COLORS.length] }}>
            <h3><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h3>
            <div>{s.content}</div>
          </section>
        ))}
      </div>
    </PageShell>
  );
};

export default PremiumPrivacy;
