import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
  useLocation, useNavigate, Navigate
} from 'react-router-dom';
import {
  Menu, X, Sun, Moon, ArrowRight,
  Settings2, MessageSquare, BrainCircuit,
  CheckCircle2, Mail, Phone, MapPin, ChevronDown,
  Zap, BarChart3, Shield, Clock, Users, Layers
} from 'lucide-react';
import logo      from './assets/opsbg.png';
import logoWhite from './assets/opsbgw.png';
import PrivacyPolicy from './components/PrivacyPolicy';

/* ── Theme ──────────────────────────────────────────────────── */
const ThemeCtx = createContext({ theme: 'light', toggle: () => {} });
const useTheme = () => useContext(ThemeCtx);

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why Opsflow', href: '#why' },
  { label: 'Results',   href: '#impact' },
  { label: 'Contact',   href: '#contact' },
];

const go = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/* ══════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════ */
function Navbar() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate  = useNavigate();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const dark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate_to = (href) => {
    setMenuOpen(false);
    if (location.pathname !== '/') { navigate('/' + href); return; }
    go(href);
  };

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: dark
          ? scrolled ? 'rgba(28,28,30,0.92)' : 'transparent'
          : scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        borderBottom: scrolled
          ? dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'
          : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile  { display: flex; }
        .nav-mobile-drawer { display: block; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-mobile  { display: none !important; }
          .nav-mobile-drawer { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>

        {/* Logo — larger & more prominent */}
        <button onClick={() => navigate_to('#home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <img
            src={dark ? logoWhite : logo}
            alt="Opsflow AI"
            style={{ height: 160, width: 'auto', objectFit: 'contain' }}
          />
        </button>

        {/* Desktop nav links */}
        <nav className="nav-desktop" style={{ alignItems: 'center', gap: 36 }}>
          {NAV_LINKS.map(n => (
            <button
              key={n.label}
              onClick={() => navigate_to(n.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: 500,
                color: dark ? '#9aa0a6' : '#5f6368',
                transition: 'color 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.target.style.color = dark ? '#e8eaed' : '#202124'}
              onMouseLeave={e => e.target.style.color = dark ? '#9aa0a6' : '#5f6368'}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggle}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              borderRadius: '50%', color: dark ? '#9aa0a6' : '#5f6368',
              display: 'flex', alignItems: 'center',
            }}
          >
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button
            onClick={() => navigate_to('#contact')}
            className="btn btn-primary"
            style={{ marginLeft: 8, fontSize: '0.875rem', padding: '10px 22px' }}
          >
            Get started
          </button>
        </div>

        {/* Mobile toggle — only shown on small screens */}
        <div className="nav-mobile" style={{ alignItems: 'center', gap: 8 }}>
          <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: dark ? '#9aa0a6' : '#5f6368', display: 'flex' }}>
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <button onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: dark ? '#e8eaed' : '#202124', display: 'flex' }}>
            {menuOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile drawer — only shown on small screens */}
      {menuOpen && (
        <div className="nav-mobile-drawer" style={{
          padding: '8px 20px 20px',
          background: dark ? '#1c1c1e' : '#fff',
          borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8eaed',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}>
          {NAV_LINKS.map(n => (
            <button
              key={n.label}
              onClick={() => navigate_to(n.href)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1rem', fontWeight: 500,
                color: dark ? '#e8eaed' : '#202124',
                borderRadius: 10, fontFamily: 'inherit',
                transition: 'background 0.15s',
              }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => navigate_to('#contact')}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            Get started
          </button>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO  — AI Automations — Neural net canvas + waves
══════════════════════════════════════════════════════════════ */
function Hero() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const canvasRef = React.useRef(null);

  const bg            = dark ? '#0a0a10' : '#f0f4ff';
  const textPrimary   = dark ? '#e8eaed' : '#202124';
  const textSecondary = dark ? '#9aa0a6' : '#5f6368';

  // ── Neural-net particle canvas ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const NODE_COLOR  = dark ? 'rgba(96,165,250,'  : 'rgba(26,115,232,';
    const LINE_COLOR  = dark ? 'rgba(96,165,250,'  : 'rgba(26,115,232,';
    const PULSE_COLOR = dark ? 'rgba(147,197,253,' : 'rgba(96,165,250,';

    const COUNT = Math.max(Math.floor((canvas.width * canvas.height) / 9000), 45);
    const nodes = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 2.2 + 1.2,
    }));

    const pulses = [];
    const MAX_PULSES  = 22;
    const CONNECT_DIST = 165;
    let frame;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * (dark ? 0.42 : 0.32);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${LINE_COLOR}${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            if (pulses.length < MAX_PULSES && Math.random() < 0.001) {
              pulses.push({ from: i, to: j, t: 0, speed: 0.006 + Math.random() * 0.009 });
            }
          }
        }
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        if (pulse.t >= 1) { pulses.splice(p, 1); continue; }
        const a  = nodes[pulse.from];
        const b  = nodes[pulse.to];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;
        const al = Math.sin(pulse.t * Math.PI) * (dark ? 0.95 : 0.80);
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${PULSE_COLOR}${al})`;
        ctx.fill();
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${NODE_COLOR}${dark ? 0.75 : 0.6})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `${NODE_COLOR}${dark ? 0.18 : 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      frame = requestAnimationFrame(tick);
    };

    tick();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [dark]);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 28px 80px',
        background: bg,
        overflow: 'hidden',
      }}
    >
      {/* ── Neural network canvas ─────────────────────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Ambient colour blobs ──────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb" style={{
          position: 'absolute', top: '-8%', left: '-5%',
          width: 550, height: 550, borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle, rgba(26,115,232,0.20) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(26,115,232,0.12) 0%, transparent 60%)',
        }}/>
        <div className="orb-2" style={{
          position: 'absolute', top: '5%', right: '-6%',
          width: 460, height: 460, borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle, rgba(0,137,123,0.15) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(0,137,123,0.09) 0%, transparent 60%)',
        }}/>
      </div>

      {/* ── Animated SVG waves — bottom of hero ───────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            width: '100%', height: 'auto', maxHeight: '42%',
            opacity: dark ? 0.72 : 0.60,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#1a73e8" stopOpacity="0.38"/>
              <stop offset="50%"  stopColor="#00897b" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="#7c4dff" stopOpacity="0.30"/>
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.25"/>
              <stop offset="50%"  stopColor="#1a73e8" stopOpacity="0.30"/>
              <stop offset="100%" stopColor="#00897b" stopOpacity="0.20"/>
            </linearGradient>
          </defs>
          <path fill="url(#waveGrad1)">
            <animate attributeName="d" dur="9s" repeatCount="indefinite"
              values="
                M0,180 C240,120 480,240 720,180 C960,120 1200,200 1440,160 L1440,320 L0,320 Z;
                M0,200 C200,140 440,260 720,200 C1000,140 1240,220 1440,180 L1440,320 L0,320 Z;
                M0,160 C280,200 520,120 720,160 C920,200 1160,140 1440,200 L1440,320 L0,320 Z;
                M0,180 C240,120 480,240 720,180 C960,120 1200,200 1440,160 L1440,320 L0,320 Z"
            />
          </path>
          <path fill="url(#waveGrad2)" fillOpacity="0.75">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="
                M0,240 C320,180 640,280 960,220 C1100,190 1280,240 1440,210 L1440,320 L0,320 Z;
                M0,220 C360,260 600,180 900,240 C1100,280 1280,210 1440,240 L1440,320 L0,320 Z;
                M0,260 C280,220 520,280 800,240 C1060,200 1280,260 1440,220 L1440,320 L0,320 Z;
                M0,240 C320,180 640,280 960,220 C1100,190 1280,240 1440,210 L1440,320 L0,320 Z
              "
            />
          </path>
        </svg>

        {/* Subtle dot grid overlay */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: dark ? 0.04 : 0.035 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dotGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill={dark ? '#ffffff' : '#202124'}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)"/>
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' }}>

        {/* Eyebrow badge */}
        <div className="fade-up delay-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px',
          borderRadius: 100,
          border: dark ? '1px solid rgba(26,115,232,0.3)' : '1px solid rgba(26,115,232,0.2)',
          background: dark ? 'rgba(26,115,232,0.1)' : 'rgba(26,115,232,0.06)',
          marginBottom: 32,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1a73e8', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#1a73e8' }}>
            AI-powered business solutions — built for Africa
          </span>
        </div>

        {/* Main headline */}
        <h1 className="fade-up delay-2 font-display" style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          marginBottom: 28,
          color: textPrimary,
        }}>
          Gain the Edge with AI.
          {/* Intelligent automation<br/>
          for businesses that{' '}
          <span className="gradient-text">mean business.</span> */}
        </h1>

        {/* Sub-headline */}
        <p className="fade-up delay-3" style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          lineHeight: 1.65,
          color: textSecondary,
          maxWidth: 620,
          margin: '0 auto 48px',
          fontWeight: 400,
        }}>
          {/* Opsflow AI designs and deploys custom AI solutions that automate your business
          processes, convert enquiries on WhatsApp around the clock, and put an intelligent
          assistant inside every team. */}
          Supercharging businesses with bespoke AI solutions for real-world impact and exponential growth.
        </p>

        {/* CTA row */}
        <div className="fade-up delay-4 hero-cta" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => go('#solutions')} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '14px 32px' }}>
            Explore our solutions <ArrowRight size={16}/>
          </button>
          <button onClick={() => go('#contact')} className="btn btn-outline" style={{ fontSize: '0.95rem', padding: '13px 30px' }}>
            Talk to our team
          </button>
        </div>

        {/* Trust indicators */}
        <div className="fade-up delay-4 hero-trust" style={{
          display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap',
          marginTop: 56,
          paddingTop: 32,
          borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        }}>
          {[
            { icon: CheckCircle2, text: 'Globally available' },
            { icon: CheckCircle2, text: 'Deployed in under 30 days' },
            { icon: CheckCircle2, text: 'SME & enterprise ready' },
            { icon: CheckCircle2, text: '100% ownership of your AI' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Icon size={15} style={{ color: '#00897b', flexShrink: 0 }}/>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: textSecondary }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll nudge */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', color: dark ? '#5f6368' : '#9aa0a6', animation: 'bounce 2s infinite' }}>
        <ChevronDown size={20}/>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SOLUTIONS
══════════════════════════════════════════════════════════════ */
const SOLUTIONS = [
  {
    Icon: Settings2,
    accent: '#1a73e8',
    accentBg: '#e8f0fe',
    name: 'Business Process Automation',
    tagline: 'Eliminate operational drag.',
    body: 'We analyse your workflows and replace repetitive, error-prone tasks with intelligent automation. From purchase approvals and invoice routing to staff rostering and inventory alerts — we engineer the system, train your team, and monitor performance.',
    points: [
      'End-to-end workflow design & deployment',
      'Integrates with your existing tools (ERP, CRM, email)',
      'Real-time dashboards and exception alerts',
    ],
  },
  {
    Icon: MessageSquare,
    accent: '#00897b',
    accentBg: '#e0f2f1',
    name: 'WhatsApp AI Sales Agent',
    tagline: 'Your sales floor, open 24 / 7.',
    body: 'A conversational AI agent trained on your product catalogue, pricing, and tone of voice. It qualifies leads, answers complex enquiries, upsells, and closes — handling hundreds of conversations simultaneously on the platform your customers already use.',
    points: [
      'Trained on your actual products and pricing',
      'Handles order placement, FAQs & lead capture',
      'Syncs activity to your CRM automatically',
    ],
  },
  {
    Icon: BrainCircuit,
    accent: '#7c4dff',
    accentBg: '#ede7f6',
    name: 'Generative AI for Business',
    tagline: 'An expert for every department.',
    body: 'We build private, secure AI assistants trained on your internal documentation. HR teams get instant policy lookup. Customer support handles complex queries without escalations. New staff onboard in hours, not weeks.',
    points: [
      'Private RAG deployment on your infrastructure',
      'HR, customer support & onboarding bots',
      'Connects to your knowledge base and docs',
    ],
  },
];

function SolutionCard({ sol, index }) {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const { Icon, accent, accentBg, name, tagline, body, points } = sol;

  return (
    <div className="card" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
      {/* Icon badge */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, marginBottom: 20,
        background: dark ? `${accent}1a` : accentBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={24} style={{ color: accent }}/>
      </div>

      <div style={{
        display: 'inline-block', marginBottom: 12,
        padding: '3px 10px', borderRadius: 100,
        fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        background: dark ? `${accent}18` : accentBg,
        color: accent,
      }}>
        0{index + 1}
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 6, color: dark ? '#e8eaed' : '#202124' }}>
        {name}
      </h3>
      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: accent, marginBottom: 14 }}>{tagline}</p>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 20, flexGrow: 1 }}>{body}</p>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {points.map(pt => (
          <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={15} style={{ color: accent, marginTop: 2, flexShrink: 0 }}/>
            <span style={{ fontSize: '0.85rem', color: dark ? '#9aa0a6' : '#5f6368', lineHeight: 1.5 }}>{pt}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => go('#contact')}
        style={{
          alignSelf: 'flex-start',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: '0.875rem', fontWeight: 700, color: accent,
          fontFamily: 'inherit', padding: 0, transition: 'gap 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.gap = '10px'}
        onMouseLeave={e => e.currentTarget.style.gap = '6px'}
      >
        Enquire about this <ArrowRight size={14}/>
      </button>
    </div>
  );
}

function Solutions() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <section id="solutions" style={{ padding: '100px 28px', background: dark ? '#0f0f12' : '#f8f9fa' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">What we build</span>
          <h2 className="font-display" style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 800, lineHeight: 1.2,
          letterSpacing: '-0.025em',
          color: dark ? '#e8eaed' : '#202124',
          maxWidth: 540,
        }}>
            Three focused solutions.<br/>Proven business outcomes.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {SOLUTIONS.map((s, i) => <SolutionCard key={s.name} sol={s} index={i}/>)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WHY OPSFLOW
══════════════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  { Icon: Zap,       title: 'Fast to deploy',       body: 'Working demos in under 2 weeks. Full rollout within 30 days. We don\'t do long discovery phases.' },
  { Icon: Shield,    title: 'You own everything',   body: 'Every line of code, every model weight, every data pipeline is yours. No platform dependency.' },
  { Icon: Users,     title: 'Process-first approach', body: 'We map your operations before we write a line of code. The AI fits your business, not the other way around.' },
  { Icon: Clock,     title: 'Always on',            body: 'Our agents operate 24 / 7 / 365. Enquiries at midnight, peak season spikes — handled without you lifting a finger.' },
  { Icon: BarChart3, title: 'ROI from day one',     body: 'Every engagement is anchored to a measurable outcome: leads captured, hours saved, errors eliminated.' },
  { Icon: Layers,    title: 'Built for Africa',     body: 'Optimised for WhatsApp, local infrastructure, and Kenyan business realities — not copy-pasted from Silicon Valley.' },
];

function WhyOpsflow() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <section id="why" style={{ padding: '100px 28px', background: dark ? '#1c1c1e' : '#ffffff' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="lg-grid" style={{ alignItems: 'start' }}>

          {/* Left: statement */}
          <div>
            <span className="eyebrow">Why Opsflow</span>
            <h2 className="font-display" style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
              fontWeight: 800, lineHeight: 1.25, marginBottom: 20,
              letterSpacing: '-0.025em',
              color: dark ? '#e8eaed' : '#202124',
            }}>
              We don't sell AI products.<br/>
              We solve your specific problem.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 32 }}>
              Most AI vendors hand you a platform and leave you to configure it.
              We take the opposite approach — we sit with your team, understand your
              operations deeply, and build a solution targeted at your highest-leverage
              opportunity. Then we stay engaged to make sure it delivers.
            </p>
            <button onClick={() => go('#contact')} className="btn btn-primary">
              Schedule a discovery call <ArrowRight size={15}/>
            </button>
          </div>

          {/* Right: feature grid */}
          <div className="why-grid">
            {WHY_ITEMS.map(({ Icon, title, body }) => (
              <div key={title} style={{
                padding: '22px 20px',
                borderRadius: 14,
                background: dark ? 'rgba(255,255,255,0.03)' : '#f8f9fa',
                border: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e8eaed',
                transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, marginBottom: 12,
                  background: 'rgba(26,115,232,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={17} style={{ color: '#1a73e8' }}/>
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em', color: dark ? '#e8eaed' : '#202124' }}>{title}</h4>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: dark ? '#9aa0a6' : '#5f6368' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lg-grid  { display: grid; grid-template-columns: 1fr;      gap: 48px; }
        .why-grid { display: grid; grid-template-columns: 1fr;      gap: 14px; }
        @media (min-width: 640px)  { .why-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px)  { 
          .lg-grid  { grid-template-columns: 1fr 1fr; gap: 80px; } 
          .why-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   RESULTS / IMPACT
══════════════════════════════════════════════════════════════ */
const STATS = [
  { value: '< 2 weeks', label: 'Time to first working demo' },
  { value: '60%+',      label: 'Average reduction in manual operations' },
  { value: '24 / 7',   label: 'Agent uptime — no breaks, no sick days' },
  { value: '100%',      label: 'Client ownership of all deliverables' },
];

function Results() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <section id="impact" style={{ padding: '100px 28px', background: dark ? '#0f0f12' : '#f8f9fa' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <span className="eyebrow">Results</span>
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 800, lineHeight: 1.25, marginBottom: 16,
          letterSpacing: '-0.025em',
          color: dark ? '#e8eaed' : '#202124',
          maxWidth: 540,
        }}>
          Numbers that reflect real outcomes.
        </h2>
        <p style={{ fontSize: '1rem', color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 56, maxWidth: 480 }}>
          These figures come from our active client engagements, not marketing estimates.
        </p>

        {/* Stat grid */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, borderRadius: 20, overflow: 'hidden', border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8eaed' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              background: dark ? '#1c1c1e' : '#ffffff',
            }}>
              <p className="stat-num">{s.value}</p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.55, color: dark ? '#9aa0a6' : '#5f6368', marginTop: 8 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          marginTop: 40, padding: '40px 44px',
          borderRadius: 20,
          background: dark ? '#1c1c1e' : '#ffffff',
          border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8eaed',
        }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, fontStyle: 'italic', color: dark ? '#c4c7cc' : '#3c4043', marginBottom: 24, maxWidth: 680 }}>
            "The WhatsApp agent Opsflow built handled our entire peak-season sales flow.
            We went from missing enquiries after 6pm to closing orders at midnight — without hiring anyone new.
            It paid for itself in the first week of deployment."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a73e8, #00897b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.85rem', fontWeight: 700, color: '#fff',
            }}>JM</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: dark ? '#e8eaed' : '#202124' }}>Joyce M.</p>
              <p style={{ fontSize: '0.8rem', color: dark ? '#9aa0a6' : '#5f6368' }}>Founder & CEO — retail business, Nairobi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT + TALLY FORM SLOT
══════════════════════════════════════════════════════════════ */
function Contact() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const bg = dark ? '#1c1c1e' : '#ffffff';
  const border = dark ? 'rgba(255,255,255,0.06)' : '#e8eaed';

  return (
    <section id="contact" style={{ padding: '100px 28px', background: dark ? '#0f0f12' : '#f8f9fa' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="contact-grid">

          {/* Left — info */}
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 className="font-display" style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
              fontWeight: 800, lineHeight: 1.25, marginBottom: 16,
              letterSpacing: '-0.025em',
              color: dark ? '#e8eaed' : '#202124',
            }}>
              Let's figure out what's<br/>holding your business back.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 40 }}>
              Reach out with a brief description of your challenge.
              We'll come back within 24 hours with honest thoughts on what's feasible — no sales pitch required.
            </p>

            {[
              { Icon: Mail,   label: 'Email',    val: 'opsflowai@gmail.com',   href: 'mailto:opsflowai@gmail.com' },
              { Icon: Phone,  label: 'Phone',    val: '+254 724 609 783',       href: 'tel:+254724609783' },
              { Icon: MapPin, label: 'Location', val: 'Delta Tower, Westlands, Nairobi', href: null },
            ].map(({ Icon, label, val, href }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(26,115,232,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={17} style={{ color: '#1a73e8' }}/>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: dark ? '#5f6368' : '#9aa0a6', marginBottom: 2 }}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontSize: '0.9rem', fontWeight: 600, color: dark ? '#e8eaed' : '#202124', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.target.style.color = '#1a73e8'}
                        onMouseLeave={e => e.target.style.color = dark ? '#e8eaed' : '#202124'}
                      >{val}</a>
                    : <p style={{ fontSize: '0.9rem', fontWeight: 600, color: dark ? '#e8eaed' : '#202124' }}>{val}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Right — Tally form */}
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            background: bg,
            border: `1px solid ${border}`,
            boxShadow: '0 4px 24px rgba(60,64,67,0.08)',
          }}>
            {/*
              ┌─────────────────────────────────────────────────────┐
              │  HOW TO EMBED YOUR TALLY FORM                       │
              │  1. Go to tally.so → create form → Share → Embed    │
              │  2. Copy the <iframe> snippet Tally provides         │
              │  3. Replace the <div> below with your <iframe>       │
              │                                                      │
              │  Example:                                            │
              │  <iframe                                             │
              │    data-tally-src="https://tally.so/embed/YOUR_ID   │
              │      ?alignLeft=1&hideTitle=1                        │
              │      &transparentBackground=1&dynamicHeight=1"       │
              │    loading="lazy" width="100%" height="650"          │
              │    frameBorder="0" title="Enquiry form" />           │
              └─────────────────────────────────────────────────────┘
            */}
            <div style={{ padding: '40px 36px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em', color: dark ? '#e8eaed' : '#202124' }}>
                Send us an enquiry
              </h3>
              <p style={{ fontSize: '0.85rem', color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 28 }}>
                Tell us about your business and the challenge you want to solve. We respond within 24 hours.
              </p>

              {/* Placeholder form skeleton — replace with Tally iframe */}
              {[
                { label: 'Your name', type: 'text' },
                { label: 'Email address', type: 'email' },
                { label: 'Company name', type: 'text' },
              ].map(({ label }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 6 }}>{label}</label>
                  <div style={{ height: 44, borderRadius: 10, border: `1px solid ${border}`, background: dark ? 'rgba(255,255,255,0.03)' : '#f8f9fa' }}/>
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 6 }}>Which solution interests you?</label>
                <div style={{ height: 44, borderRadius: 10, border: `1px solid ${border}`, background: dark ? 'rgba(255,255,255,0.03)' : '#f8f9fa' }}/>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: dark ? '#9aa0a6' : '#5f6368', marginBottom: 6 }}>Describe your challenge</label>
                <div style={{ height: 100, borderRadius: 10, border: `1px solid ${border}`, background: dark ? 'rgba(255,255,255,0.03)' : '#f8f9fa' }}/>
              </div>

              {/* Tally callout */}
              <div style={{
                padding: '12px 14px', borderRadius: 10, marginBottom: 20,
                background: 'rgba(26,115,232,0.06)',
                border: '1px dashed rgba(26,115,232,0.25)',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <Zap size={14} style={{ color: '#1a73e8', marginTop: 2, flexShrink: 0 }}/>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.5, color: dark ? '#9aa0a6' : '#5f6368' }}>
                  <strong style={{ color: '#1a73e8' }}>Embed your Tally form here.</strong> Replace the placeholder above with your iframe from <a href="https://tally.so" target="_blank" rel="noreferrer" style={{ color: '#1a73e8' }}>tally.so</a> to receive enquiries directly to your inbox.
                </p>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: '0.95rem' }}>
                Submit enquiry <ArrowRight size={15}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 52px; }
        @media(min-width:900px) { .contact-grid { grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; } }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <footer style={{
      padding: '56px 28px 40px',
      background: dark ? '#1c1c1e' : '#ffffff',
      borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8eaed',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="footer-grid">
          <div>
            <img src={dark ? logoWhite : logo} alt="Opsflow AI" style={{ height: 64, width: 'auto', marginBottom: 16 }}/>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: dark ? '#9aa0a6' : '#5f6368', maxWidth: 260 }}>
              Turning AI into a measurable competitive advantage for African businesses.
            </p>
          </div>
          {[
            { heading: 'Solutions', items: [
              { label: 'Process Automation', href: '#solutions' },
              { label: 'WhatsApp Agent', href: '#solutions' },
              { label: 'Generative AI', href: '#solutions' },
            ]},
            { heading: 'Company', items: [
              { label: 'Why Opsflow', href: '#why' },
              { label: 'Results', href: '#impact' },
              { label: 'Privacy Policy', href: '/privacy', internal: true },
            ]},
            { heading: 'Contact', items: [
              { label: 'opsflowai@gmail.com', href: 'mailto:opsflowai@gmail.com' },
              { label: '+254 724 609 783', href: 'tel:+254724609783' },
              { label: 'Westlands, Nairobi', href: null },
            ]},
          ].map(col => (
            <div key={col.heading}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: dark ? '#5f6368' : '#9aa0a6', marginBottom: 18 }}>{col.heading}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map(item => (
                  <li key={item.label}>
                    {item.internal
                      ? <Link to={item.href} style={{ fontSize: '0.875rem', color: dark ? '#9aa0a6' : '#5f6368', textDecoration: 'none', transition: 'color 0.15s' }}>{item.label}</Link>
                      : item.href
                        ? <a href={item.href} style={{ fontSize: '0.875rem', color: dark ? '#9aa0a6' : '#5f6368', textDecoration: 'none', transition: 'color 0.15s' }}>{item.label}</a>
                        : <span style={{ fontSize: '0.875rem', color: dark ? '#5f6368' : '#9aa0a6' }}>{item.label}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e8eaed',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: dark ? '#9aa0a6' : '#9aa0a6' }}>
            &copy; {new Date().getFullYear()} Opsflow AI Ltd. All rights reserved. Registered in Kenya.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['LinkedIn', 'Twitter / X'].map(p => (
              <a key={p} href="#" style={{ fontSize: '0.8rem', color: dark ? '#9aa0a6' : '#9aa0a6', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#1a73e8'}
                onMouseLeave={e => e.target.style.color = dark ? '#9aa0a6' : '#9aa0a6'}
              >{p}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
        @media(min-width:768px) { .footer-grid { grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px; } }
      `}</style>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════════ */
function App() {
  const [theme, setTheme] = useState('light'); // ← Default: light

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      <BrowserRouter>
        <div style={{
          minHeight: '100vh',
          background: theme === 'dark' ? '#0f0f12' : '#ffffff',
          color: theme === 'dark' ? '#e8eaed' : '#202124',
          transition: 'background 0.25s ease, color 0.25s ease',
        }}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <Solutions />
                <WhyOpsflow />
                <Results />
                <Contact />
              </main>
            } />
            <Route path="/privacy" element={<PrivacyPolicy theme={theme} getClasses={() => ''} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeCtx.Provider>
  );
}

export default App;