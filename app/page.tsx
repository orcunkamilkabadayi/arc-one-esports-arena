'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Headphones, Keyboard, Menu, Mouse, Radio, Sparkles, Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GearId = 'athlete' | 'jersey' | 'headset' | 'mouse' | 'keyboard';

const stadiumParts = [
  { id: 'truss', label: 'Işık trussı', clip: 'polygon(15% 0, 85% 0, 82% 25%, 18% 25%)', from: [-16, -18, -12, -4] },
  { id: 'screen', label: 'Skor ekranı', clip: 'polygon(31% 20%, 69% 20%, 71% 49%, 29% 49%)', from: [18, -6, 8, 4] },
  { id: 'bowl', label: 'Tribün çanağı', clip: 'polygon(8% 35%, 92% 35%, 98% 75%, 2% 75%)', from: [-18, 8, 10, 7] },
  { id: 'podium', label: 'Final sahnesi', clip: 'polygon(25% 52%, 75% 52%, 82% 84%, 18% 84%)', from: [14, 18, -8, -5] },
  { id: 'base', label: 'Arena temeli', clip: 'polygon(3% 72%, 97% 72%, 90% 100%, 10% 100%)', from: [-10, 20, 15, 5] },
];

const gear = [
  { id: 'athlete' as GearId, label: 'Oyuncu', kicker: '01 / CORE', title: 'Refleksin merkez üssü', body: 'Her kararın milisaniyeler içinde skora dönüştüğü, turnuva disiplinine göre tasarlanmış oyuncu silüeti.', spec: 'ELITE READY', icon: Trophy, position: 'hotspot-player' },
  { id: 'jersey' as GearId, label: 'Forma', kicker: '02 / IDENTITY', title: 'Takımın ikinci derisi', body: 'Nefes alan teknik kumaş, hareket özgürlüğü ve sahnede okunaklı geometrik çizgiler.', spec: '4-WAY FLEX', icon: Sparkles, position: 'hotspot-jersey' },
  { id: 'headset' as GearId, label: 'Kulaklık', kicker: '03 / AUDIO', title: 'Oyunu sesinden oku', body: 'Uzamsal ses, net takım iletişimi ve boyunda dengeli duran hafif turnuva kulaklığı.', spec: '360° FIELD', icon: Headphones, position: 'hotspot-headset' },
  { id: 'mouse' as GearId, label: 'Mouse', kicker: '04 / AIM', title: 'Nişan çizgisi sende', body: 'Hafif gövde, yüksek hassasiyetli sensör ve sağ elde doğal kavrama için dengeli form.', spec: '32K SENSOR', icon: Mouse, position: 'hotspot-mouse' },
  { id: 'keyboard' as GearId, label: 'Klavye', kicker: '05 / INPUT', title: 'Komutlarını hızlandır', body: 'Kompakt mekanik düzen, hızlı tetikleme ve sol elin için turnuva sınıfı kontrol.', spec: '0.2 MS', icon: Keyboard, position: 'hotspot-keyboard' },
];

function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [ref]);
  return progress;
}

export default function Home() {
  const stadiumRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLElement>(null);
  const stadiumProgress = useSectionProgress(stadiumRef);
  const playerProgress = useSectionProgress(playerRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGear, setActiveGear] = useState<GearId | null>(null);
  const active = gear.find((item) => item.id === activeGear);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setActiveGear(null); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const partStyle = (part: typeof stadiumParts[number]) => {
    const [x, y, z, r] = part.from;
    const amount = 1 - stadiumProgress;
    return { clipPath: part.clip, transform: 'translate3d(' + (x * amount) + '%, ' + (y * amount) + '%, ' + (z * amount) + 'px) rotate(' + (r * amount) + 'deg) scale(' + (1 + amount * 0.08) + ')' };
  };
  const playerPartStyle = (item: GearId) => {
    const amount = 1 - playerProgress;
    const values: Record<GearId, [number, number, number, number]> = {
      athlete: [0, 26, -22, -3], jersey: [-18, -10, 8, 4], headset: [22, -14, 18, -8], mouse: [26, 20, 12, 7], keyboard: [-25, 22, 16, -6],
    };
    const [x, y, z, r] = values[item];
    return { transform: 'translate3d(' + (x * amount) + '%, ' + (y * amount) + '%, ' + (z * amount) + 'px) rotate(' + (r * amount) + 'deg) scale(' + (1 + amount * 0.06) + ')' };
  };

  return (
    <main className="academy-shell">
      <header className="academy-topbar">
        <a className="academy-wordmark" href="#top" aria-label="Espor Akademisi ana sayfa"><span className="academy-mark">EA</span><span>ESPOR<br /><b>AKADEMİSİ</b></span></a>
        <nav className="academy-nav" aria-label="Ana navigasyon"><button onClick={() => scrollTo('#stadium')}>Stadyum</button><button onClick={() => scrollTo('#player')}>Oyuncu</button><button onClick={() => scrollTo('#academy')}>Akademi</button></nav>
        <Button className="academy-cta" onClick={() => scrollTo('#stadium')}><span className="live-dot" /> Deneyimi başlat</Button>
        <Button variant="ghost" size="icon" className="academy-menu" aria-label="Menüyü aç" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      {menuOpen && <nav className="academy-mobile-nav" aria-label="Mobil navigasyon"><button onClick={() => scrollTo('#stadium')}>01 <span>Stadyum</span><ArrowUpRight /></button><button onClick={() => scrollTo('#player')}>02 <span>Oyuncu</span><ArrowUpRight /></button><button onClick={() => scrollTo('#academy')}>03 <span>Akademi</span><ArrowUpRight /></button></nav>}

      <section id="top" className="academy-hero" aria-labelledby="hero-title">
        <div className="hero-noise" aria-hidden="true" /><div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-kicker"><span /> TÜRKİYE'NİN YENİ NESİL ESPOR EKOSİSTEMİ</div>
        <h1 id="hero-title">Oyunun<br /><em>ötesine</em> geç.</h1>
        <p>Stadyumu kur. Oyuncuyu keşfet. Bir sonraki seviyeye hazırlan.</p>
        <button className="hero-scroll" onClick={() => scrollTo('#stadium')}><span>Kaydırarak keşfet</span><ArrowDown /></button>
        <div className="hero-index">00 <span>/</span> 05</div>
      </section>

      <section id="stadium" ref={stadiumRef} className="assembly-section stadium-section" aria-labelledby="stadium-title">
        <div className="assembly-sticky"><div className="section-label"><span>01</span><span>STADYUM MONTAJI</span><span className="label-line" /><span>{Math.round(stadiumProgress * 100)}%</span></div>
          <div className="stadium-stage"><div className="stadium-aura" aria-hidden="true" />{stadiumParts.map((part) => <div className="stadium-part" key={part.id} style={partStyle(part)}><img src="/arena-stadium.png" alt="" /></div>)}<div className="stadium-crosshair" aria-hidden="true" /></div>
          <div className="assembly-copy"><p className="eyebrow">ARENA / 001</p><h2 id="stadium-title">Her parça,<br /><em>tek bir</em> güç.</h2><p>Yukarıdan inen ışık trussı, tribün çanağı ve final sahnesi. Mouse topunu aşağı kaydırdıkça Espor Akademisi'nin stadyumu gözlerinin önünde kuruluyor.</p><div className="part-legend">{stadiumParts.map((part, index) => <span key={part.id}><b>0{index + 1}</b>{part.label}</span>)}</div></div>
        </div>
      </section>

      <section id="player" ref={playerRef} className="assembly-section player-section" aria-labelledby="player-title">
        <div className="assembly-sticky"><div className="section-label"><span>02</span><span>OYUNCU LOADOUT</span><span className="label-line" /><span>{Math.round(playerProgress * 100)}%</span></div>
          <div className="player-stage"><div className="player-grid" aria-hidden="true" /><div className="player-glow" aria-hidden="true" />
            <div className="player-art" aria-label="Profesyonel esporcu ve ekipmanları"><img className="player-layer layer-athlete" style={playerPartStyle('athlete')} src="/player-athlete.png" alt="Profesyonel espor oyuncusu" /><img className="player-layer layer-jersey" style={playerPartStyle('jersey')} src="/player-athlete.png" alt="" /><img className="player-layer layer-headset" style={playerPartStyle('headset')} src="/player-athlete.png" alt="" /><img className="player-layer layer-mouse" style={playerPartStyle('mouse')} src="/player-athlete.png" alt="" /><img className="player-layer layer-keyboard" style={playerPartStyle('keyboard')} src="/player-athlete.png" alt="" />
              {gear.map((item) => <button key={item.id} className={'gear-hotspot ' + item.position} aria-label={item.label + ' özelliklerini aç'} onClick={() => setActiveGear(item.id)}><span>{item.label}</span><i /></button>)}
            </div>
          </div>
          <div className="assembly-copy player-copy"><p className="eyebrow">PLAYER / 002</p><h2 id="player-title">Ayrı parçalar.<br /><em>Bir bütün</em> oyuncu.</h2><p>Oyuncu, forma ve ekipmanlar ayrı başlar. Kaydırdıkça her parça doğru yerine oturur. Noktalara dokunarak pro ekipmanın detaylarını aç.</p><div className="scroll-meter"><span style={{ width: String(Math.max(6, playerProgress * 100)) + '%' }} /><small>MONTAJ İLERLEMESİ</small></div></div>
        </div>
      </section>

      <section id="academy" className="academy-invite"><div><p className="eyebrow">ESPOR AKADEMİSİ / 003</p><h2>Bir sonraki<br /><em>maçın</em> burada.</h2></div><div className="invite-note"><p>Yarın: eğitim rotaları, takım profilleri ve canlı turnuva merkezi.</p><button onClick={() => scrollTo('#top')}>Başa dön <ArrowUpRight /></button></div></section>
      <footer className="academy-footer"><span>© 2026 ESPOR AKADEMİSİ</span><span>Serdivan/Sakarya</span><span className="footer-live"><Radio /> SYSTEM ONLINE</span></footer>

      {active && <div className="gear-modal-backdrop" role="presentation" onClick={() => setActiveGear(null)}><aside className="gear-modal" role="dialog" aria-modal="true" aria-labelledby="gear-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Pencereyi kapat" onClick={() => setActiveGear(null)}><X /></button><div className="modal-icon">{<active.icon />}</div><p className="eyebrow">{active.kicker}</p><h3 id="gear-title">{active.title}</h3><p>{active.body}</p><strong>{active.spec}</strong></aside></div>}
    </main>
  );
}
