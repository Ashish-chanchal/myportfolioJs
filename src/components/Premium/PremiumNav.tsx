import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PremiumThemeMenu from './PremiumThemeMenu';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/works', label: 'Works' },
  { to: '/about-me', label: 'About' },
  { to: '/contact-me', label: 'Contact' },
];

const PremiumNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`pm-root pm-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="pm-nav-in">
        <Link to="/" className="pm-logo">ashishchanchal<i>.</i>in</Link>
        <nav className="pm-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'is-active' : ''}>{l.label}</Link>
          ))}
        </nav>
        <div className="pm-nav-right">
          <PremiumThemeMenu />
          <Link to="/contact-me" className="pm-btn is-ink is-sm">Say hi</Link>
        </div>
      </div>
    </header>
  );
};

export default PremiumNav;
