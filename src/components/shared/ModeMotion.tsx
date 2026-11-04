import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme, type DesignMode } from '../../context/ThemeContext';
import '../../styles/modes.css';

gsap.registerPlugin(ScrollTrigger);
if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__mx = { gsap, ScrollTrigger };

/** Leaf surfaces that get revealed on scroll (all modes share the selector, each mode its own choreography). */
const REVEAL = [
  'main .bento-tile',
  'main .brutal-card',
  'main .editorial-card',
  'main .retro-window',
  'main .retro-inset',
  'main [data-mx]',
  'footer [data-mx]',
].join(',');

interface Choreo {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  head: gsap.TweenVars;
  stagger: number;
}

const CHOREO: Record<Exclude<DesignMode, 'premium'>, Choreo> = {
  bento: {
    from: { opacity: 0, y: 56, scale: 0.94 },
    to: { duration: 0.9, ease: 'back.out(1.25)' },
    head: { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out' },
    stagger: 0.08,
  },
  minimalist: {
    from: { opacity: 0, y: 34, filter: 'blur(6px)' },
    to: { duration: 1.2, ease: 'power3.out' },
    head: { opacity: 0, y: 24, filter: 'blur(6px)', duration: 1.1, ease: 'power3.out' },
    stagger: 0.12,
  },
  brutalist: {
    from: { opacity: 0, x: -28, y: 28 },
    to: { duration: 0.42, ease: 'steps(5)' },
    head: { opacity: 0, x: -40, duration: 0.4, ease: 'steps(6)' },
    stagger: 0.07,
  },
  editorial: {
    from: { opacity: 0, y: 26 },
    to: { duration: 1.1, ease: 'power2.out' },
    head: { clipPath: 'inset(0 0 100% 0)', y: 36, duration: 1.1, ease: 'power4.out' },
    stagger: 0.14,
  },
  retro: {
    from: { opacity: 0 },
    to: { duration: 0.55, ease: 'steps(8)' },
    head: { opacity: 0, duration: 0.5, ease: 'steps(8)' },
    stagger: 0.1,
  },
};

const outermost = (els: HTMLElement[]) => els.filter((el) => !els.some((o) => o !== el && o.contains(el)));

const ModeMotion = () => {
  const { designMode } = useTheme();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (designMode === 'premium') return;
    const cfg = CHOREO[designMode];
    const root = document.documentElement;
    root.classList.add('mx-on');

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // scroll progress
      gsap.to('.mx-progress-bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      // headings
      gsap.utils.toArray<HTMLElement>('main h1, main section h2').forEach((h) => {
        gsap.from(h, { ...cfg.head, scrollTrigger: { trigger: h, start: 'top 90%', once: true }, clearProps: 'all' });
      });

      // surfaces
      const items = outermost(gsap.utils.toArray<HTMLElement>(REVEAL));
      if (items.length) {
        gsap.set(items, cfg.from);
        ScrollTrigger.batch(items, {
          start: 'top 94%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              ...Object.fromEntries(Object.keys(cfg.from).map((k) => [k, k === 'opacity' ? 1 : k === 'scale' ? 1 : k === 'filter' ? 'blur(0px)' : 0])),
              ...cfg.to,
              stagger: cfg.stagger,
              overwrite: true,
              onComplete: () => { gsap.set(batch, { clearProps: 'transform,opacity,filter,visibility' }); },
            }),
        });
      }

      // hero image parallax
      gsap.utils.toArray<HTMLElement>('#hero img').forEach((img) => {
        gsap.to(img, { yPercent: -6, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      });
    });

    // bento spotlight: tile-local cursor glow
    const onMove = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.('.bento-tile, .brutal-card') as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', `${e.clientX - r.left}px`);
      t.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // pointer micro-interactions (transform only): magnetic buttons, bento tile tilt
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
    const magnet = designMode === 'bento' || designMode === 'minimalist' || designMode === 'editorial';
    const tilt = designMode === 'bento';
    const active = new Map<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc; r?: gsap.QuickToFunc }>();
    const fx = (el: HTMLElement, kind: 'btn' | 'tile') => {
      let f = active.get(el);
      if (!f) {
        f = { x: gsap.quickTo(el, kind === 'btn' ? 'x' : 'rotationY', { duration: 0.5, ease: 'power3' }), y: gsap.quickTo(el, kind === 'btn' ? 'y' : 'rotationX', { duration: 0.5, ease: 'power3' }) };
        active.set(el, f);
      }
      return f;
    };
    const onPointer = (e: MouseEvent) => {
      if (!fine) return;
      const tgt = e.target as HTMLElement | null;
      if (magnet) {
        const b = tgt?.closest?.('main .brutal-btn, main .pattern-action-btn') as HTMLElement | null;
        if (b) {
          const r = b.getBoundingClientRect();
          const f = fx(b, 'btn');
          f.x((e.clientX - (r.left + r.width / 2)) * 0.18);
          f.y((e.clientY - (r.top + r.height / 2)) * 0.28);
        }
      }
      if (tilt) {
        const c = tgt?.closest?.('main .bento-tile') as HTMLElement | null;
        if (c && c.offsetHeight < 520) {
          const r = c.getBoundingClientRect();
          gsap.set(c, { transformPerspective: 900 });
          const f = fx(c, 'tile');
          f.x(((e.clientX - r.left) / r.width - 0.5) * 5);
          f.y(-((e.clientY - r.top) / r.height - 0.5) * 5);
        }
      }
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const hit = el?.closest?.('main .brutal-btn, main .pattern-action-btn, main .bento-tile') as HTMLElement | null;
      const f = hit && active.get(hit);
      if (hit && f) { f.x(0); f.y(0); }
    };
    window.addEventListener('mousemove', onPointer, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onPointer);
      document.removeEventListener('mouseout', onLeave);
      active.forEach((_, el) => gsap.set(el, { clearProps: 'transform' }));
      mm.revert();
      root.classList.remove('mx-on');
    };
  }, [designMode, pathname]);

  if (designMode === 'premium') return null;
  return (
    <div className="mx-progress" aria-hidden="true">
      <div className="mx-progress-bar" />
    </div>
  );
};

export default ModeMotion;
