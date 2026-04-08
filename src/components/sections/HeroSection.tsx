'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ABILITIES = [
  { key: 'Q', name: 'COMPILE',     type: 'SIGNATURE' as const, desc: 'Full-stack deployment at extreme velocity. Leaves critical errors in competitors.' },
  { key: 'E', name: 'FREELANCE',   type: 'BASIC'     as const, desc: 'Enters independent contract mode. Penetrates any market. No cooldown.' },
  { key: 'C', name: 'EMBROID',     type: 'BASIC'     as const, desc: 'Threads code into physical fabric. Craft meets tech. Unique passive.' },
  { key: 'X', name: 'AKIRA DRIVE', type: 'ULTIMATE'  as const, desc: 'Overclocks all systems. Reality becomes canvas. Full chaos mode unlocked.' },
]

const STATS = [
  { label: 'DUELIST',   val: 88, color: '#FF0040' },
  { label: 'INITIATOR', val: 74, color: '#00F5FF' },
  { label: 'SENTINEL',  val: 91, color: '#00FF88' },
]

const HUD_CHIPS = [
  { label: 'ORIGIN', val: 'AHD',     color: '#FF0040' },
  { label: 'TIER',   val: 'RADIANT', color: '#FF0040' },
  { label: 'STATUS', val: 'ONLINE',  color: '#00FF88' },
  { label: 'SPEC',   val: 'CS',      color: '#00F5FF' },
]

function TriangleEmblem() {
  return (
    <svg
      viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute right-[-4%] top-1/2 -translate-y-[52%] w-[60%] aspect-square opacity-50 pointer-events-none"
    >
      <polygon points="250,28 472,442 28,442"   stroke="#7a0018" strokeWidth="1.5" fill="rgba(90,0,18,0.16)" />
      <polygon points="250,78 432,422 68,422"   stroke="#5a0012" strokeWidth="1"   fill="rgba(65,0,12,0.10)" />
      <polygon points="250,128 392,402 108,402" stroke="#3e000c" strokeWidth="0.8" fill="rgba(45,0,8,0.08)"  />
      <line x1="250" y1="28"  x2="250" y2="442" stroke="#2e0008" strokeWidth="0.6" opacity="0.6" />
      <line x1="250" y1="28"  x2="160" y2="190" stroke="#480010" strokeWidth="0.5" opacity="0.5" />
      <line x1="250" y1="28"  x2="340" y2="190" stroke="#480010" strokeWidth="0.5" opacity="0.5" />
      <path d="M250,28 L268,28 L268,46"    stroke="#FF4655" strokeWidth="1.5" fill="none" opacity="0.55" />
      <path d="M28,442 L28,424 L46,424"    stroke="#FF4655" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M472,442 L472,424 L454,424" stroke="#FF4655" strokeWidth="1.5" fill="none" opacity="0.35" />
    </svg>
  )
}

function HudDots() {
  const dots = [
    { style: { left: '3.5%',  top: '22%' }, sm: false },
    { style: { left: '4.3%',  top: '24%' }, sm: true  },
    { style: { left: '3.5%',  top: '50%' }, sm: false },
    { style: { left: '3.5%',  top: '65%' }, sm: true  },
    { style: { left: '3.5%',  top: '79%' }, sm: false },
    { style: { right: '2.8%', top: '18%' }, sm: true  },
    { style: { right: '2.8%', top: '32%' }, sm: false },
    { style: { right: '2.8%', top: '50%' }, sm: false },
    { style: { right: '2.8%', top: '62%' }, sm: true  },
    { style: { right: '2.8%', top: '76%' }, sm: false },
    { style: { right: '2.8%', top: '88%' }, sm: false },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <div key={i} className="absolute bg-[#C8102E]" style={{ ...d.style, width: d.sm ? '3px' : '5px', height: d.sm ? '3px' : '5px', opacity: d.sm ? 0.35 : 0.65 }} />
      ))}
    </div>
  )
}

function AgentSilhouette() {
  return (
    <div className="relative w-full max-w-[360px] h-full flex items-end justify-center">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 pointer-events-none"
        style={{ height: '80%', background: 'linear-gradient(to top, rgba(255,40,70,0.18) 0%, rgba(255,40,70,0.06) 40%, transparent 80%)' }}
      />

      {/*
       * ── SWAP THIS BLOCK when you have real art ───────────────────────────
       *
       *   <img
       *     src="/agent-art.png"
       *     alt="Vishwesh"
       *     className="h-full w-auto object-contain object-bottom relative z-10"
       *   />
       *
       *   Drop a transparent PNG into /public/agent-art.png and delete the
       *   <svg> + placeholder label below.
       * ─────────────────────────────────────────────────────────────────────
       */}
      <svg viewBox="0 0 300 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10" aria-hidden="true">
        <ellipse cx="150" cy="526" rx="72" ry="12" fill="rgba(255,50,80,0.2)" />
        <line x1="20"  y1="310" x2="88"  y2="288" stroke="#FF4655" strokeWidth="1.4" opacity="0.45" />
        <line x1="14"  y1="326" x2="80"  y2="308" stroke="#FF4655" strokeWidth="0.9" opacity="0.28" />
        <line x1="18"  y1="342" x2="76"  y2="326" stroke="#FF4655" strokeWidth="0.6" opacity="0.18" />
        <line x1="280" y1="310" x2="212" y2="288" stroke="#FF4655" strokeWidth="0.8" opacity="0.20" />
        <line x1="284" y1="326" x2="220" y2="308" stroke="#FF4655" strokeWidth="0.5" opacity="0.12" />
        <path d="M128,390 L118,526 L136,526 L148,430 L160,526 L178,526 L168,390Z" fill="#0d0008" />
        <path d="M108,230 C106,250 104,340 110,390 L190,390 C196,340 194,250 192,230Z" fill="#0d0008" />
        <path d="M108,240 C90,270 75,320 80,390 L108,375 C106,320 108,270 108,240Z" fill="#0a0006" />
        <path d="M192,240 C210,270 225,320 220,390 L192,375 C194,320 192,270 192,240Z" fill="#0a0006" />
        <path d="M108,240 C90,260 72,290 68,330 L88,336 C92,302 104,274 116,252Z" fill="#0d0008" />
        <path d="M192,240 C210,260 228,290 232,330 L212,336 C208,302 196,274 184,252Z" fill="#0d0008" />
        <rect x="138" y="210" width="24" height="30" fill="#0d0008" />
        <ellipse cx="150" cy="185" rx="36" ry="44" fill="#0d0008" />
        <path d="M132,150 C128,130 138,108 150,100 C162,108 172,130 168,150Z" fill="#0c0007" />
        <path d="M142,148 C140,124 146,104 152,96  C158,104 158,128 156,148Z" fill="#0a0005" />
        <path d="M108,230 C106,260 104,330 108,390 L112,388 C108,330 108,260 110,232Z" fill="rgba(255,40,70,0.22)" />
        <path d="M132,150 C128,132 136,112 148,104" stroke="rgba(255,50,80,0.3)"  strokeWidth="2"   fill="none" />
        <path d="M108,240 C90,262 74,294 70,330"   stroke="rgba(255,40,70,0.18)" strokeWidth="2.5" fill="none" />
        <path d="M192,230 C194,260 196,330 192,390 L188,388 C192,330 192,260 190,232Z" fill="rgba(0,200,220,0.10)" />
        <path d="M110,148 L110,138 L120,138" stroke="rgba(255,0,64,0.35)" strokeWidth="1" fill="none" />
        <path d="M190,148 L190,138 L180,138" stroke="rgba(255,0,64,0.35)" strokeWidth="1" fill="none" />
        <path d="M110,222 L110,232 L120,232" stroke="rgba(255,0,64,0.25)" strokeWidth="1" fill="none" />
        <path d="M190,222 L190,232 L180,232" stroke="rgba(255,0,64,0.25)" strokeWidth="1" fill="none" />
        <rect x="120" y="172" width="60" height="22" fill="rgba(10,0,6,0.75)" rx="1" />
        <text x="150" y="187" textAnchor="middle" fill="rgba(255,0,64,0.5)" fontFamily="'Share Tech Mono', monospace" fontSize="8" letterSpacing="3">REDACTED</text>
      </svg>

      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <div className="px-3 py-2 text-center" style={{ border: '1px dashed rgba(255,0,64,0.25)', background: 'rgba(0,0,0,0.55)' }}>
          <div className="mono-text text-[9px] text-cyber-red/50 tracking-[0.2em]">// REPLACE WITH YOUR ART</div>
          <div className="mono-text text-[8px] text-white/20 tracking-[0.1em] mt-0.5">photo · illustration · ai art</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[30px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,50,80,0.45) 0%, transparent 70%)' }} />
    </div>
  )
}

function AbilityKey({ ability, isActive, onEnter, onLeave }: {
  ability: typeof ABILITIES[0]
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <motion.div
        whileHover={{ scale: 1.12, y: -3 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-9 h-9 flex items-center justify-center mono-text text-sm transition-all duration-200"
        style={{
          border:     `1px solid ${isActive ? 'rgba(255,70,85,0.7)' : 'rgba(255,255,255,0.14)'}`,
          background: isActive ? 'rgba(255,70,85,0.10)' : 'transparent',
          color:      isActive ? '#FF4655' : 'rgba(255,255,255,0.45)',
          clipPath:   'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
          boxShadow:  isActive ? '0 0 12px rgba(255,70,85,0.25)' : 'none',
        }}
      >
        {ability.key}
        {ability.type === 'ULTIMATE' && (
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyber-yellow rounded-full" />
        )}
      </motion.div>
      <span className="mono-text text-[8px] text-white/25 tracking-[0.15em]">{ability.name.split(' ')[0]}</span>
    </div>
  )
}

export default function HeroSection() {
  const nameRef = useRef<HTMLDivElement>(null)
  const [activeAbility, setActiveAbility] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = nameRef.current
    if (!el) return
    const id = setInterval(() => {
      if (Math.random() > 0.93) {
        const ox = (Math.random() - 0.5) * 6
        const oy = (Math.random() - 0.5) * 2
        el.style.transform  = `translate(${ox}px, ${oy}px)`
        el.style.textShadow = `${-ox * 2}px 0 #FF4655, ${ox * 2}px 0 #00F5FF`
        setTimeout(() => {
          el.style.transform  = ''
          el.style.textShadow = '2px 0 rgba(255,70,85,0.35), -1px 0 rgba(0,200,220,0.2)'
        }, 85)
      }
    }, 260)
    return () => clearInterval(id)
  }, [mounted])

  const activeAb = activeAbility !== null ? ABILITIES[activeAbility] : null

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', background: '#08000a' }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 68% 50%, #3a0010 0%, #1a0008 45%, #04000a 100%)' }} />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[65%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(160,0,35,0.32) 0%, transparent 72%)' }} />

      {/* HUD edge lines */}
      <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,0,64,0.65), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,0,64,0.4), transparent)' }} />

      <TriangleEmblem />
      <HudDots />

      {/* VALORANT wordmark */}
      <div className="absolute top-[72px] left-6 flex items-center gap-2 z-20" aria-hidden="true">
        <div className="w-5 h-5 bg-[#FF4655]"
          style={{ clipPath: 'polygon(0 0,100% 0,100% 20%,60% 20%,60% 100%,40% 100%,40% 20%,0 20%)' }} />
        <span className="display-text text-[13px] text-white tracking-[0.3em]">VALORANT</span>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex w-full" style={{ minHeight: '100svh' }}>

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-end pb-10 pt-28 pl-6 pr-6" style={{ width: 'clamp(280px, 42%, 480px)', flexShrink: 0 }}>

          {/* Role */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] border border-[#FF4655] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FF4655] rotate-45" />
            </div>
            <span className="mono-text text-[11px] text-white/45 tracking-[0.25em]">DUELIST</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="display-text leading-none"
            style={{ fontSize: 'clamp(60px, 9vw, 96px)', color: '#fff', textShadow: '2px 0 rgba(255,70,85,0.35), -1px 0 rgba(0,200,220,0.2)' }}
          >
            <div ref={nameRef} style={{ transition: 'transform 0.05s, text-shadow 0.05s' }}>VISHWESH</div>
          </motion.h1>

          {/* Ghost surname */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="display-text mt-0.5"
            style={{ fontSize: 'clamp(14px, 2.5vw, 22px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.10)', letterSpacing: '0.08em' }}
          >
            MASHRUWALA
          </motion.div>

          {/* Red divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }} animate={{ width: '80px', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-0.5 my-3 flex-shrink-0"
            style={{ background: 'linear-gradient(to right, #FF4655, transparent)' }} />

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-[13px] leading-relaxed max-w-[280px] mb-4"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.36)' }}
          >
            CS graduate. Creative developer. Freelancer. Runs the family embroidery empire by day,
            ships code and art by night. Somewhere between Akira and a git push.
          </motion.p>

          {/* Abilities */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
            className="flex gap-2 mb-2">
            {ABILITIES.map((ab, i) => (
              <AbilityKey key={ab.key} ability={ab} isActive={activeAbility === i}
                onEnter={() => setActiveAbility(i)} onLeave={() => setActiveAbility(null)} />
            ))}
          </motion.div>

          {/* Ability tooltip */}
          <div className="mono-text min-h-[48px] mb-4" style={{ fontSize: '10px' }}>
            <AnimatePresence mode="wait">
              {activeAb ? (
                <motion.div key={activeAb.key}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}>
                  <span className="block text-[11px] text-[#FF4655] mb-0.5">{activeAb.name}</span>
                  <span className="text-[8px] tracking-[0.2em]"
                    style={{ color: activeAb.type === 'ULTIMATE' ? '#FFD700' : 'rgba(0,245,255,0.7)' }}>
                    {activeAb.type}
                  </span>
                  <br />
                  <span style={{ color: 'rgba(255,255,255,0.32)' }}>{activeAb.desc}</span>
                </motion.div>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.16)' }}>
                  // HOVER ABILITY KEY TO INSPECT
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }} className="flex flex-col gap-[6px] mb-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="mono-text text-[8px] w-14 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.22)' }}>{s.label}</span>
                <div className="flex-1 h-0.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                    transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full" style={{ background: s.color, boxShadow: `0 0 4px ${s.color}` }} />
                </div>
                <span className="mono-text text-[8px] w-6 text-right" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }} className="flex gap-3 flex-wrap">
            <a href="#projects"
              className="display-text text-[13px] tracking-widest px-5 py-2.5 bg-[#FF4655] text-black hover:bg-white transition-colors duration-200"
              style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}>
              VIEW PROJECTS
            </a>
            <a href="#contact"
              className="display-text text-[13px] tracking-widest px-5 py-2.5 hover:text-[#FF4655] transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.60)', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}>
              GET IN TOUCH
            </a>
          </motion.div>
        </div>

        {/* CHARACTER ART */}
        <div className="absolute bottom-0 flex items-end justify-center"
          style={{ left: 'clamp(280px, 30%, 400px)', width: '50%', height: '100%', zIndex: 5 }}>
          <motion.div className="w-full h-[95%] flex items-end justify-center"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <AgentSilhouette />
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute right-4 top-0 bottom-0 flex flex-col justify-center items-end gap-1.5 z-10">
          <span className="display-text text-[11px] mb-3" style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.4em', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            VISHWESH
          </span>
          {HUD_CHIPS.map((chip) => (
            <div key={chip.label} className="flex items-center gap-1.5 px-2 py-1"
              style={{ border: '1px solid rgba(255,70,85,0.18)' }}>
              <div className="w-1 h-1 flex-shrink-0" style={{ background: chip.color }} />
              <span className="mono-text text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)' }}>{chip.label}</span>
              <span className="mono-text text-[9px] tracking-[0.1em]" style={{ color: chip.color }}>{chip.val}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="mono-text text-[9px] tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.20)' }}>SCROLL</div>
        <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, rgba(255,0,64,0.5), transparent)' }} />
      </motion.div>
    </section>
  )
}
