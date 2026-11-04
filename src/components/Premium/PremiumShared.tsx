import { useLayoutEffect, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './premium.css';

gsap.registerPlugin(ScrollTrigger);

export const PEACH = 'var(--pm-peach)';
export const MINT = 'var(--pm-mint)';
export const LILAC = 'var(--pm-lilac)';
export const BUTTER = 'var(--pm-butter)';
export const SKY = 'var(--pm-sky)';
export const COLORS = [PEACH, MINT, LILAC, BUTTER, SKY];

export const Words = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((w, i) => (
      <span className="pm-w" key={i}><span className="pm-wi">{w}&nbsp;</span></span>
    ))}
  </>
);

/** Shared GSAP choreography for the inner pages. Re-runs when deps change. */
export const usePageAnim = (ref: RefObject<HTMLElement>, deps: unknown[] = []) => {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.pm-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.pm-pagehead .pm-kick', { scale: 0, rotate: -20, duration: 0.7, ease: 'back.out(2.4)' })
        .from('.pm-pagehead .pm-wi', { yPercent: 120, rotate: 4, duration: 1, stagger: 0.07 }, '-=0.4')
        .from('.pm-pagehead .pm-lead', { y: 24, opacity: 0, duration: 0.7 }, '-=0.6');

      gsap.utils.toArray<HTMLElement>('.pm-blob').forEach((el, i) => {
        gsap.to(el, { y: (i + 1) * -80, x: i % 2 ? 30 : -30, ease: 'none', scrollTrigger: { trigger: '.pm-pagehead', start: 'top top', end: 'bottom top', scrub: 1 } });
      });

      gsap.utils.toArray<HTMLElement>('.pm-split').forEach((h) => {
        gsap.from(h.querySelectorAll('.pm-wi'), { yPercent: 120, rotate: 4, duration: 0.9, ease: 'power4.out', stagger: 0.05, scrollTrigger: { trigger: h, start: 'top 88%' } });
      });

      const items = gsap.utils.toArray<HTMLElement>('.pm-rv');
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 70 });
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.1, overwrite: true }),
        });
      }
    }, ref);
    ScrollTrigger.refresh();
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const PageHead = ({ kick, title, sub }: { kick: string; title: string; sub: string }) => (
  <section className="pm-pagehead">
    <div className="pm-blob" style={{ width: 380, height: 380, background: PEACH, right: '-6%', top: '-10%' }} />
    <div className="pm-blob" style={{ width: 220, height: 220, background: MINT, left: '-5%', top: '40%' }} />
    <div className="pm-blob" style={{ width: 120, height: 120, background: LILAC, left: '55%', top: '55%' }} />
    <div className="pm-wrap">
      <span className="pm-kick">{kick}</span>
      <h1 className="pm-h1"><Words text={title} /></h1>
      <p className="pm-lead">{sub}</p>
    </div>
  </section>
);

export const PageShell = ({ children, innerRef }: { children: ReactNode; innerRef: RefObject<HTMLDivElement> }) => (
  <div className="pm-root" ref={innerRef}>
    <div className="pm-progress" />
    {children}
  </div>
);
