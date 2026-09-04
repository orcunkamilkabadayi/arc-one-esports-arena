'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Crosshair,
  Gauge,
  Headphones,
  Menu,
  Monitor,
  MousePointer2,
  Play,
  Radio,
  Shield,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const chapters = [
  {
    id: '01', kicker: 'The arena', title: 'Built for\nthe roar.',
    body: 'A 42,000-seat pressure chamber engineered so every call, clutch, and crowd reaction lands in real time.',
    stat: '42K', label: 'live seats', icon: Monitor,
  },
  {
    id: '02', kicker: 'Rapid trigger keyboard', title: 'Move before\nthey think.',
    body: 'Magnetic switches, per-key actuation, and a tournament-locked 0.2 ms response built for impossible counter-strafes.',
    stat: '0.2', label: 'ms response', icon: Zap,
  },
  {
    id: '03', kicker: 'Pro optical mouse', title: 'Precision,\nminus weight.',
    body: 'A 54-gram carbon shell surrounds a 32K sensor. Zero smoothing. Zero hesitation. Just the line you chose.',
    stat: '54G', label: 'total weight', icon: MousePointer2,
  },
  {
    id: '04', kicker: 'Spatial headset', title: 'Hear the play\nbefore it happens.',
    body: 'Tournament-tuned planar drivers place every rotation and reload exactly where it belongs in the arena.',
    stat: '360°', label: 'spatial field', icon: Headphones,
  },
];

const navItems = [['Arena', '#arena'], ['Loadout', '#loadout'], ['Finals', '#finals']];

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (!storyRef.current) return;
      const rect = storyRef.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const next = Math.min(1, Math.max(0, -rect.top / distance));
      setProgress(next);
      setChapter(Math.min(chapters.length - 1, Math.floor(next * chapters.length)));
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setTrailerOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const current = chapters[chapter];
  const CurrentIcon = current.icon;

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="ARC ONE home"><span className="mark">A1</span><span>ARC//ONE</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <Button className="nav-cta" onClick={() => setTrailerOpen(true)}><span className="live-dot" /> Watch live</Button>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>
          ))}
        </nav>
      )}

      <section id="top" className="hero" aria-labelledby="hero-title">
        <img className="hero-art" src="/arena-hero.png" alt="A futuristic esports arena with pro gaming equipment at the player entrance" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> World finals · Istanbul · 2026</p>
          <h1 id="hero-title">Enter the next<span>dimension of play.</span></h1>
          <p className="hero-intro">Where elite mechanics meet arena-scale energy. Step inside the setup built for the world&apos;s most decisive seconds.</p>
          <div className="hero-actions">
            <Button className="primary-action" onClick={() => document.querySelector('#arena')?.scrollIntoView({ behavior: 'smooth' })}>Enter the arena <ChevronRight /></Button>
            <Button variant="ghost" className="text-action" onClick={() => setTrailerOpen(true)}><span className="play-circle"><Play fill="currentColor" /></span>Watch film <small>01:24</small></Button>
          </div>
        </div>
        <aside className="event-card" aria-label="World finals event details">
          <div className="event-head"><span>Grand final</span><Radio /></div>
          <strong>SEPT 18</strong><p>Neon Dome<br />Istanbul, TR</p>
          <div className="event-meta"><span>Doors 18:00</span><a href="#finals" aria-label="View finals details"><ArrowUpRight /></a></div>
        </aside>
        <a className="scroll-cue" href="#arena"><span>Scroll to enter</span><ArrowDown /></a>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>05</span></div>
      </section>

      <div className="signal-strip" aria-hidden="true"><div>
        <span>Zero latency</span><i /><span>42,000 voices</span><i /><span>One final</span><i /><span>No second chances</span><i />
        <span>Zero latency</span><i /><span>42,000 voices</span><i /><span>One final</span><i /><span>No second chances</span><i />
      </div></div>

      <section id="arena" ref={storyRef} className="scroll-story" aria-label="Arena and player equipment">
        <div className="story-stage">
          <div className="story-visual" style={{ '--story-scale': `${1.03 + progress * 0.14}`, '--story-shift': `${(progress - 0.5) * -7}%` } as React.CSSProperties}>
            <img src="/arena-hero.png" alt="" aria-hidden="true" />
            <div className="visual-scrim" />
          </div>
          <div className="story-topline"><span>ARC//ONE PERFORMANCE SYSTEM</span><span>{String(Math.round(progress * 100)).padStart(2, '0')}% / DESCENT</span></div>
          <div className="chapter-rail" aria-label="Scroll chapters">
            {chapters.map((item, index) => (
              <button key={item.id} className={index === chapter ? 'active' : ''} aria-label={`Jump to ${item.kicker}`} onClick={() => {
                if (!storyRef.current) return;
                const top = storyRef.current.offsetTop;
                const travel = storyRef.current.offsetHeight - window.innerHeight;
                window.scrollTo({ top: top + travel * (index / chapters.length + 0.03), behavior: 'smooth' });
              }}><span>{item.id}</span><i /></button>
            ))}
          </div>
          <div className="story-copy" key={current.id}>
            <p className="eyebrow"><span /> {current.kicker}</p>
            <h2>{current.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            <p>{current.body}</p><a href="#loadout">Explore the system <ArrowUpRight /></a>
          </div>
          <div className="spec-orbit" key={`spec-${current.id}`}><div className="spec-icon"><CurrentIcon /></div><div><strong>{current.stat}</strong><span>{current.label}</span></div></div>
        </div>
      </section>

      <section id="loadout" className="loadout-section" aria-labelledby="loadout-title">
        <div className="section-heading">
          <p className="eyebrow"><span /> Tournament-grade hardware</p>
          <h2 id="loadout-title">THE EDGE IS<br /><em>ENGINEERED.</em></h2>
          <p>Four instruments. One competitive system. Nothing between your decision and the server.</p>
        </div>
        <div className="loadout-grid">
          <article className="loadout-card loadout-featured">
            <div className="card-number">01 / RAPID TRIGGER</div>
            <div className="gear-illustration" aria-hidden="true"><div className="keyboard-board">{Array.from({ length: 30 }).map((_, index) => <i key={index} />)}</div></div>
            <div className="card-copy"><span>ARC K60 HE</span><h3>ACTUATE<br />AT THOUGHT.</h3><p>Adjust every key from 0.1–4.0 mm. Your movement, calibrated exactly.</p></div><ArrowUpRight className="card-arrow" />
          </article>
          <article className="loadout-card">
            <div className="card-number">02 / AIM</div><Crosshair className="outline-icon" aria-hidden="true" />
            <div className="card-copy"><span>VECTOR 54</span><h3>THE SENSOR<br />DISAPPEARS.</h3><p>Raw input. Tournament wireless. A shell lighter than the pressure.</p></div><ArrowUpRight className="card-arrow" />
          </article>
          <article className="loadout-card">
            <div className="card-number">03 / AUDIO</div><Headphones className="outline-icon" aria-hidden="true" />
            <div className="card-copy"><span>SONAR PRO</span><h3>SPACE BECOMES<br />INFORMATION.</h3><p>Planar detail with a match-tuned soundstage made for clean reads.</p></div><ArrowUpRight className="card-arrow" />
          </article>
        </div>
      </section>

      <section id="finals" className="finals-section" aria-labelledby="finals-title">
        <div className="finals-copy">
          <p className="eyebrow"><span /> Live event 005</p><h2 id="finals-title">THE LAST MAP<br />STARTS HERE.</h2>
          <p>Eight teams entered the circuit. Two walk into Neon Dome. One leaves as ARC//ONE World Champion.</p>
          <Button className="primary-action" onClick={() => setTrailerOpen(true)}>Watch finals preview <Play fill="currentColor" /></Button>
        </div>
        <div className="telemetry-panel">
          <div className="telemetry-head"><span>ARENA TELEMETRY</span><span className="live-pill"><i /> Live feed</span></div>
          <div className="telemetry-visual" aria-hidden="true">{Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ height: `${18 + ((index * 23) % 78)}%` }} />)}</div>
          <div className="telemetry-stats">
            <div><Gauge /><strong>360</strong><span>Hz displays</span></div><div><Shield /><strong>99.98</strong><span>% integrity</span></div><div><Zap /><strong>0.2</strong><span>ms input</span></div>
          </div>
        </div>
      </section>

      <footer><a className="wordmark" href="#top"><span className="mark">A1</span><span>ARC//ONE</span></a><p>Competition, rendered at human speed.</p><div><a href="#arena">Arena</a><a href="#loadout">Loadout</a><a href="#finals">Finals</a></div><span>© 2026 ARC//ONE</span></footer>

      {trailerOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="trailer-title" onMouseDown={() => setTrailerOpen(false)}>
          <div className="trailer-modal" onMouseDown={(event) => event.stopPropagation()}>
            <Button variant="ghost" size="icon" aria-label="Close preview" onClick={() => setTrailerOpen(false)}><X /></Button>
            <div className="trailer-screen"><span className="trailer-rings" /><button aria-label="Play ARC ONE finals preview"><Play fill="currentColor" /></button></div>
            <div className="trailer-info"><span>ARC//ONE PRESENTS</span><h2 id="trailer-title">THE WORLD FINAL</h2><p>Preview · 01:24 · 4K</p></div>
          </div>
        </div>
      )}
    </main>
  );
}
