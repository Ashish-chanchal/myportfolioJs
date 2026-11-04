import { useRef, useState } from 'react';
import { FaCheck, FaGithub, FaInstagram, FaLinkedinIn, FaRegCopy, FaTwitter } from 'react-icons/fa';
import { LuArrowUpRight, LuMail } from 'react-icons/lu';
import { BUTTER, LILAC, MINT, PageHead, PageShell, PEACH, SKY, usePageAnim } from './PremiumShared';

const EMAIL = 'akchanchal2002@gmail.com';
const SOCIALS = [
  { name: 'LinkedIn', handle: 'ashishchanchal', link: 'https://www.linkedin.com/in/ashishchanchal/', icon: <FaLinkedinIn />, c: SKY },
  { name: 'GitHub', handle: 'Ashish-chanchal', link: 'https://github.com/Ashish-chanchal', icon: <FaGithub />, c: BUTTER },
  { name: 'Twitter / X', handle: '@_ashishchanchal', link: 'https://x.com/_ashishchanchal', icon: <FaTwitter />, c: LILAC },
  { name: 'Instagram', handle: '@ashish._chanchal', link: 'https://www.instagram.com/ashish._chanchal/', icon: <FaInstagram />, c: PEACH },
];
const FIT = [
  { t: 'Full-time roles', d: 'Backend, full-stack or AI engineering on a team that ships.', c: PEACH },
  { t: 'Freelance builds', d: 'Web apps, mobile apps and automation, scoped and delivered end to end.', c: MINT },
  { t: 'AI and voice systems', d: 'Low-latency assistants, MCP agents and LLM-powered products.', c: LILAC },
];

const PremiumContact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  usePageAnim(ref, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <PageShell innerRef={ref}>
      <PageHead kick="Contact" title="Got an idea? Let's talk." sub="Reach out about roles, freelance projects or an interesting problem. I usually reply within a day." />
      <div className="pm-wrap">
        <section className="pm-cgrid">
          <div className="pm-mail pm-rv">
            <span className="pm-hello"><span className="pm-dot" />Open to opportunities</span>
            <h2>Say hello at</h2>
            <p className="pm-addr">{EMAIL}</p>
            <div className="pm-cta">
              <a className="pm-btn is-ink" href={`mailto:${EMAIL}`}><LuMail /> Send an email</a>
              <button className="pm-btn" onClick={copy}>{copied ? <FaCheck /> : <FaRegCopy />} {copied ? 'Copied' : 'Copy address'}</button>
            </div>
          </div>
          <div className="pm-socials">
            {SOCIALS.map((s) => (
              <a className="pm-soc pm-rv" key={s.name} href={s.link} target="_blank" rel="noreferrer" style={{ background: s.c }}>
                <span className="pm-soc-i">{s.icon}</span>
                <span><b>{s.name}</b><small>{s.handle}</small></span>
                <LuArrowUpRight className="pm-soc-a" />
              </a>
            ))}
          </div>
        </section>

        <section className="pm-section">
          <span className="pm-kick">Good fit</span>
          <h2 className="pm-h2 pm-split">What I&apos;m open to.</h2>
          <div className="pm-pr">
            {FIT.map((f, i) => (<div className="pm-rv" key={f.t} style={{ background: f.c }}><b>0{i + 1}</b><div><h3>{f.t}</h3><p>{f.d}</p></div></div>))}
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default PremiumContact;
