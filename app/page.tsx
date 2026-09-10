'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ComponentType, SVGProps } from 'react';
import { ArrowRight, Gamepad2, Headphones, Keyboard, Menu, MousePointer2, Radio, Shirt, UserRound, X } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

type GearId = 'athlete' | 'jersey' | 'headset' | 'mouse' | 'keyboard';
type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type StadiumPart = { id: string; label: string; clip: string; fromX: string; fromY: string; rotate: number; scale: number };
type Gear = { id: GearId; label: string; category: string; title: string; body: string; detail: string; icon: Icon; position: string; clip: string; fromX: string; fromY: string; rotate: number };

const stadiumParts: StadiumPart[] = [
  { id: 'truss', label: 'Işık trussı', clip: 'polygon(8% 0, 92% 0, 86% 27%, 14% 27%)', fromX: '-9vw', fromY: '-18vh', rotate: -4, scale: 1.08 },
  { id: 'screen', label: 'Skor ekranı', clip: 'polygon(29% 17%, 72% 17%, 74% 51%, 27% 51%)', fromX: '12vw', fromY: '-7vh', rotate: 3, scale: 1.04 },
  { id: 'bowl', label: 'Tribün çanağı', clip: 'polygon(3% 29%, 97% 29%, 100% 74%, 0 74%)', fromX: '-13vw', fromY: '7vh', rotate: -3, scale: 1.1 },
  { id: 'podium', label: 'Final sahnesi', clip: 'polygon(21% 48%, 80% 48%, 88% 86%, 13% 86%)', fromX: '10vw', fromY: '16vh', rotate: 4, scale: 1.07 },
  { id: 'base', label: 'Arena zemini', clip: 'polygon(0 70%, 100% 70%, 92% 100%, 8% 100%)', fromX: '-6vw', fromY: '22vh', rotate: -2, scale: 1.12 },
];

const gear: Gear[] = [
  { id: 'athlete', label: 'Oyuncu', category: 'Performans', title: 'Kararın merkezinde', body: 'Turnuva disiplini, doğru duruş ve baskı altında net karar alma alışkanlığı tek bir oyuncu profilinde birleşir.', detail: 'Odak ve dayanıklılık', icon: UserRound, position: 'hotspot-player', clip: 'inset(0)', fromX: '0vw', fromY: '18vh', rotate: -2 },
  { id: 'jersey', label: 'Forma', category: 'Takım kimliği', title: 'Takımın ikinci derisi', body: 'Hareketi kısıtlamayan teknik kumaş ve sahnede güçlü görünen net takım kimliği.', detail: 'Hafif ve esnek yapı', icon: Shirt, position: 'hotspot-jersey', clip: 'polygon(26% 28%, 75% 28%, 86% 72%, 15% 72%)', fromX: '-17vw', fromY: '-7vh', rotate: 4 },
  { id: 'headset', label: 'Kulaklık', category: 'İletişim', title: 'Oyunu sesinden oku', body: 'Takım iletişimini öne çıkaran dengeli yapı, uzun antrenmanlarda konfor ve doğru ses konumlandırması.', detail: 'Net takım iletişimi', icon: Headphones, position: 'hotspot-headset', clip: 'polygon(18% 8%, 82% 8%, 91% 37%, 9% 37%)', fromX: '18vw', fromY: '-13vh', rotate: -7 },
  { id: 'mouse', label: 'Mouse', category: 'Nişan', title: 'Hareket doğrudan hedefe', body: 'Sağ elde doğal kavrama, düşük ağırlık hissi ve hızlı yön değişimlerinde kontrollü tepki.', detail: 'Hassas kontrol', icon: MousePointer2, position: 'hotspot-mouse', clip: 'polygon(52% 51%, 91% 46%, 100% 78%, 52% 82%)', fromX: '22vw', fromY: '14vh', rotate: 7 },
  { id: 'keyboard', label: 'Klavye', category: 'Komut', title: 'Her komut zamanında', body: 'Sol elin doğal erişimine göre konumlanan kompakt düzen ve kararlı tuş hissi.', detail: 'Hızlı tetikleme', icon: Keyboard, position: 'hotspot-keyboard', clip: 'polygon(0 50%, 51% 49%, 57% 79%, 0 85%)', fromX: '-23vw', fromY: '15vh', rotate: -6 },
];

const phases = [
  { id: '#top', label: 'Başlangıç' },
  { id: '#stadium', label: 'Stadyum' },
  { id: '#player', label: 'Oyuncu' },
  { id: '#academy', label: 'Akademi' },
];

function scrollToSection(selector: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(selector)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}

function StadiumLayer({ part, index, progress, reduce }: { part: StadiumPart; index: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = 0.05 + index * 0.075;
  const end = 0.5 + index * 0.045;
  const x = useTransform(progress, [0, start, end, 1], [part.fromX, part.fromX, '0vw', '0vw']);
  const y = useTransform(progress, [0, start, end, 1], [part.fromY, part.fromY, '0vh', '0vh']);
  const rotate = useTransform(progress, [0, end, 1], [part.rotate, 0, 0]);
  const scale = useTransform(progress, [0, end, 1], [part.scale, 1, 1]);
  const opacity = useTransform(progress, [0, start, end], [0.24, 0.42, 1]);
  return (
    <motion.div className="stadium-layer" style={{ clipPath: part.clip, x: reduce ? 0 : x, y: reduce ? 0 : y, rotate: reduce ? 0 : rotate, scale: reduce ? 1 : scale, opacity: reduce ? 1 : opacity }} aria-hidden="true">
      <Image src="/arena-stadium.png" width={1536} height={1024} sizes="(max-width: 760px) 132vw, 73vw" alt="" />
    </motion.div>
  );
}

function PlayerLayer({ item, index, progress, reduce }: { item: Gear; index: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = 0.08 + index * 0.065;
  const end = 0.48 + index * 0.055;
  const x = useTransform(progress, [0, start, end, 1], [item.fromX, item.fromX, '0vw', '0vw']);
  const y = useTransform(progress, [0, start, end, 1], [item.fromY, item.fromY, '0vh', '0vh']);
  const rotate = useTransform(progress, [0, end, 1], [item.rotate, 0, 0]);
  const scale = useTransform(progress, [0, end, 1], [1.06, 1, 1]);
  const opacity = useTransform(progress, [0, start, end], [item.id === 'athlete' ? 0.34 : 0.12, 0.32, 1]);
  return <motion.img className={'player-layer layer-' + item.id} src="/player-athlete.png" width="1024" height="1536" alt={item.id === 'athlete' ? 'Profesyonel espor oyuncusu' : ''} style={{ clipPath: item.clip, x: reduce ? 0 : x, y: reduce ? 0 : y, rotate: reduce ? 0 : rotate, scale: reduce ? 1 : scale, opacity: reduce ? 1 : opacity }} />;
}

function SignalRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useSpring(progress, { stiffness: 110, damping: 28, mass: 0.35 });
  return (
    <aside className="signal-rail" aria-label="Sayfa bölümleri">
      <div className="signal-track" aria-hidden="true"><motion.span style={{ scaleY }} /></div>
      <nav>{phases.map((phase) => <button key={phase.id} onClick={() => scrollToSection(phase.id)}><span aria-hidden="true" />{phase.label}</button>)}</nav>
    </aside>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const stadiumRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGear, setActiveGear] = useState<GearId | null>(null);
  const active = gear.find((item) => item.id === activeGear);

  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const { scrollYProgress: stadiumProgress } = useScroll({ target: stadiumRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: playerProgress } = useScroll({ target: playerRef, offset: ['start start', 'end end'] });

  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', '16%']);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.02, 1.11]);
  const heroCopyY = useTransform(heroProgress, [0, 1], ['0%', '-13%']);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.72, 1], [1, 1, 0]);
  const heroForegroundY = useTransform(heroProgress, [0, 1], ['0%', '-24%']);
  const stadiumLock = useTransform(stadiumProgress, [0.58, 0.78], [0, 1]);
  const playerLock = useTransform(playerProgress, [0, 0.42, 0.72, 1], [0.55, 0.55, 1, 1]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setActiveGear(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!activeGear) return;
    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = originalOverflow;
      previous?.focus();
    };
  }, [activeGear]);

  const go = (selector: string) => {
    scrollToSection(selector);
    setMenuOpen(false);
  };

  return (
    <main className="academy-shell">
      <header className="academy-topbar">
        <button className="academy-wordmark" onClick={() => go('#top')} aria-label="Espor Akademisi ana sayfa"><span className="academy-mark">EA</span><span>ESPOR <strong>AKADEMİSİ</strong></span></button>
        <nav className="academy-nav" aria-label="Ana navigasyon"><button onClick={() => go('#stadium')}>Stadyum</button><button onClick={() => go('#player')}>Oyuncu</button><button onClick={() => go('#academy')}>Akademi</button></nav>
        <button className="academy-cta" onClick={() => go('#stadium')}>Deneyimi başlat <ArrowRight /></button>
        <button className="academy-menu" aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      {menuOpen && <nav className="academy-mobile-nav" aria-label="Mobil navigasyon">{phases.slice(1).map((phase) => <button key={phase.id} onClick={() => go(phase.id)}>{phase.label}<ArrowRight /></button>)}</nav>}
      <SignalRail progress={pageProgress} />

      <section id="top" ref={heroRef} className="academy-hero" aria-labelledby="hero-title">
        <motion.div className="hero-arena-frame" style={{ y: reduce ? 0 : heroImageY, scale: reduce ? 1.02 : heroImageScale }}><Image className="hero-arena" src="/arena-premium.png" fill priority sizes="100vw" alt="Işıkları açık büyük bir espor arenası" /></motion.div>
        <div className="hero-scrim" aria-hidden="true" />
        <motion.div className="hero-architecture" style={{ y: reduce ? 0 : heroForegroundY }} aria-hidden="true"><span /><span /><span /></motion.div>
        <motion.div className="hero-copy" style={{ y: reduce ? 0 : heroCopyY, opacity: reduce ? 1 : heroCopyOpacity }}>
          <p className="hero-kicker"><span /> Rekabet burada şekillenir</p>
          <h1 id="hero-title">Oyunun ötesine<br /><strong>geç.</strong></h1>
          <p>Stadyumu kur, profesyonel oyuncu sistemini keşfet ve rekabetin bir sonraki seviyesine hazırlan.</p>
          <button className="primary-action" onClick={() => go('#stadium')}>Deneyimi başlat <ArrowRight /></button>
        </motion.div>

      </section>

      <section id="stadium" ref={stadiumRef} className="assembly-section stadium-section" aria-labelledby="stadium-title">
        <div className="assembly-sticky">
          <div className="assembly-copy stadium-copy">
            <span className="chapter-name">Stadyum montajı</span>
            <h2 id="stadium-title">Parçalar birleşir.<br />Arena <strong>uyanır.</strong></h2>
            <p>Işık, tribün ve final sahnesi kaydırma hareketinle tek bir rekabet alanına dönüşür.</p>
            <div className="part-legend" aria-label="Stadyum bileşenleri">{stadiumParts.map((part) => <span key={part.id}>{part.label}</span>)}</div>
          </div>
          <div className="stadium-stage">
            <div className="stadium-depth depth-back" aria-hidden="true" />
            {stadiumParts.map((part, index) => <StadiumLayer key={part.id} part={part} index={index} progress={stadiumProgress} reduce={reduce} />)}
            <motion.div className="lock-signal" style={{ opacity: reduce ? 1 : stadiumLock, scale: reduce ? 1 : stadiumLock }} aria-hidden="true"><Gamepad2 /></motion.div>
            <div className="stadium-depth depth-front" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="focus-break" aria-labelledby="focus-title">
        <div className="focus-line" aria-hidden="true"><span /><i /><span /></div>
        <p>Sahne hazır.</p><h2 id="focus-title">Şimdi bütün ışıklar<br />oyuncuya dönüyor.</h2>
      </section>

      <section id="player" ref={playerRef} className="assembly-section player-section" aria-labelledby="player-title">
        <div className="assembly-sticky player-sticky">
          <div className="player-stage">
            <div className="player-grid" aria-hidden="true" /><div className="player-halo" aria-hidden="true" />
            <div className="player-art">
              {gear.map((item, index) => <PlayerLayer key={item.id} item={item} index={index} progress={playerProgress} reduce={reduce} />)}
              <motion.div className="hotspot-layer" style={{ opacity: reduce ? 1 : playerLock }}>
                {gear.map((item) => <button key={item.id} className={'gear-hotspot ' + item.position} aria-label={item.label + ' özelliklerini aç'} onClick={() => setActiveGear(item.id)}><span>{item.label}</span><i aria-hidden="true" /></button>)}
              </motion.div>
            </div>
          </div>
          <div className="assembly-copy player-copy">

            <h2 id="player-title">Ekipman değil.<br /><strong>Bir refleks sistemi.</strong></h2>
            <p>Her parça doğru yerine oturur. Ekipman noktalarına dokun, oyuncu sisteminin görevini keşfet.</p>
          </div>
        </div>
      </section>

      <section id="academy" className="academy-invite" aria-labelledby="academy-title">
        <div className="invite-signal" aria-hidden="true"><span>EA</span><i /></div>
        <div><h2 id="academy-title">Sıradaki maç<br />senin olabilir.</h2><p>Eğitim rotaları, takım profilleri ve turnuva merkezi bir sonraki geliştirme aşamasında açılacak.</p><button className="inverse-action" onClick={() => go('#stadium')}>Deneyimi başlat <ArrowRight /></button></div>
      </section>

      <footer className="academy-footer"><span>© 2026 Espor Akademisi</span><span>Serdivan/Sakarya</span><span className="footer-status"><Radio /> Sistem çevrimiçi</span></footer>

      {active && (
        <dialog open className="gear-modal-backdrop" aria-labelledby="gear-title">
          <section className="gear-modal">
            <button ref={closeRef} className="modal-close" aria-label="Pencereyi kapat" onClick={() => setActiveGear(null)}><X /></button>
            <active.icon className="modal-icon" aria-hidden="true" /><p>{active.category}</p><h3 id="gear-title">{active.title}</h3><div className="modal-rule" aria-hidden="true" /><p>{active.body}</p><strong>{active.detail}</strong>
          </section>
        </dialog>
      )}
    </main>
  );
}
