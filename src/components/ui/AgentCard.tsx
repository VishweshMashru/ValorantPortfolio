'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const abilities = [
  { key: 'Q', name: 'COMPILE', type: 'SIGNATURE', desc: 'Deploys full-stack solutions with extreme velocity. Leaves competitors with critical errors.' },
  { key: 'E', name: 'FREELANCE', type: 'BASIC', desc: 'Initiates independent contract mode. Penetrates any market. No cooldown.' },
  { key: 'C', name: 'EMBROID', type: 'BASIC', desc: 'Threads code into fabric. Merges craft and tech. Unique passive ability.' },
  { key: 'X', name: 'AKIRA DRIVE', type: 'ULTIMATE', desc: 'Overclocks all systems. Reality becomes canvas. Full creative chaos unlocked.' },
]

const stats = [
  { label: 'DUELIST', val: 88, color: '#FF0040' },
  { label: 'INITIATOR', val: 74, color: '#00F5FF' },
  { label: 'CONTROLLER', val: 62, color: '#FFD700' },
  { label: 'SENTINEL', val: 91, color: '#00FF88' },
]

export default function AgentCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeAbility, setActiveAbility] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 })

  const shineX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '130%'])
  const shineY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '130%'])

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="agent-card-container flex flex-col lg:flex-row gap-8 items-center">
      {/* The Card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: 80, rotateY: 30 }}
        animate={{ opacity: revealed ? 1 : 0, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex-shrink-0"
      >
        {/* Card body */}
        <div
          className="relative w-[280px] h-[440px] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0A0000 0%, #1A0008 40%, #0D0D0D 100%)',
            border: '1px solid rgba(255,0,64,0.4)',
            clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
          }}
        >
          {/* Shine overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />

          {/* Top bar */}
          <div className="relative z-10 px-4 pt-3 pb-2 flex items-center justify-between border-b border-cyber-red/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-red rotate-45" />
              <span className="mono-text text-[10px] text-cyber-red/70 tracking-[0.3em]">AGENT // PORTFOLIO</span>
            </div>
            <span className="mono-text text-[10px] text-white/30">#001</span>
          </div>

          {/* Agent visual area */}
          <div className="relative h-[200px] overflow-hidden">
            {/* Background stripes (Valorant-style) */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-full"
                  style={{
                    left: `${i * 14}%`,
                    width: '8%',
                    background: i % 2 === 0
                      ? 'linear-gradient(to bottom, rgba(255,0,64,0.08), transparent)'
                      : 'transparent',
                    transform: 'skewX(-15deg)',
                  }}
                />
              ))}
            </div>

            {/* Akira-style circular element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full"
                style={{
                  border: '1px solid rgba(255,0,64,0.3)',
                  boxShadow: '0 0 40px rgba(255,0,64,0.2)',
                }}
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full"
                style={{ border: '1px solid rgba(0,245,255,0.4)' }}
              />
            </div>

            {/* Akira-style kanji / logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="display-text text-7xl leading-none"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,0,64,0.8)',
                    textShadow: '0 0 40px rgba(255,0,64,0.5)',
                  }}
                >
                  V
                </div>
                <div className="mono-text text-[8px] text-cyber-red/50 tracking-[0.5em] mt-1">AKIRA</div>
              </div>
            </div>

            {/* Top-right badge */}
            <div
              className="absolute top-3 right-3 px-2 py-1 mono-text text-[8px] text-cyber-yellow tracking-widest"
              style={{ border: '1px solid rgba(255,215,0,0.4)', background: 'rgba(255,215,0,0.05)' }}
            >
              DUELIST
            </div>
          </div>

          {/* Agent info */}
          <div className="px-4 pt-3 pb-2 border-b border-white/5">
            <div className="flex items-end justify-between">
              <div>
                <div className="display-text text-3xl text-white leading-none tracking-wider">VISHWESH</div>
                <div className="mono-text text-[10px] text-cyber-red/70 mt-1 tracking-[0.3em]">MASHRUWALA</div>
              </div>
              <div className="text-right">
                <div className="mono-text text-[8px] text-white/30">ROLE</div>
                <div className="mono-text text-[10px] text-cyber-cyan">CREATIVE DEV</div>
              </div>
            </div>
          </div>

          {/* Stats bars */}
          <div className="px-4 py-3 space-y-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="mono-text text-[8px] text-white/40 w-16">{s.label}</span>
                <div className="flex-1 h-[3px] bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.val}%` }}
                    transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute h-full"
                    style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
                  />
                </div>
                <span className="mono-text text-[8px]" style={{ color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Abilities row */}
          <div className="px-4 py-2 flex gap-2">
            {abilities.map((ab, i) => (
              <motion.button
                key={ab.key}
                onHoverStart={() => setActiveAbility(i)}
                onHoverEnd={() => setActiveAbility(null)}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="flex-1 relative"
              >
                <div
                  className="aspect-square flex items-center justify-center text-xs mono-text transition-all duration-200"
                  style={{
                    border: `1px solid ${activeAbility === i ? '#FF0040' : 'rgba(255,255,255,0.1)'}`,
                    background: activeAbility === i ? 'rgba(255,0,64,0.15)' : 'rgba(255,255,255,0.03)',
                    color: activeAbility === i ? '#FF0040' : 'rgba(255,255,255,0.5)',
                    clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
                    boxShadow: activeAbility === i ? '0 0 12px rgba(255,0,64,0.4)' : 'none',
                  }}
                >
                  {ab.key}
                </div>
                {ab.type === 'ULTIMATE' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-yellow rounded-full" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Bottom status */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
              <span className="mono-text text-[8px] text-neon-green/70">ONLINE</span>
            </div>
            <span className="mono-text text-[8px] text-white/20">AHD // IND</span>
          </div>

          {/* Corner cuts */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-black"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-black"
            style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />

          {/* Scan line on card */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,245,255,0.5), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        </div>
      </motion.div>

      {/* Ability tooltip / info panel */}
      <div className="flex-1 max-w-sm">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Ability detail */}
          <div className="relative p-4 mb-6" style={{ border: '1px solid rgba(255,0,64,0.2)' }}>
            <div className="hud-corner hud-corner-tl text-cyber-red" />
            <div className="hud-corner hud-corner-tr text-cyber-red" />
            <div className="hud-corner hud-corner-bl text-cyber-red" />
            <div className="hud-corner hud-corner-br text-cyber-red" />

            <AnimatedAbilityPanel ability={activeAbility !== null ? abilities[activeAbility] : null} />
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2">
            {['NEXT.JS', 'REACT', 'UNITY', '3D ART', 'HIP-HOP', 'BASKETBALL', 'LOFI'].map((tag) => (
              <span key={tag} className="ability-tag text-cyber-red/70 border-cyber-red/30 hover:border-cyber-red hover:text-cyber-red transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function AnimatedAbilityPanel({ ability }: { ability: typeof abilities[0] | null }) {
  return (
    <motion.div
      key={ability?.key ?? 'default'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[80px]"
    >
      {ability ? (
        <>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 flex items-center justify-center mono-text text-sm text-cyber-red"
              style={{ border: '1px solid rgba(255,0,64,0.5)', background: 'rgba(255,0,64,0.1)' }}
            >
              {ability.key}
            </div>
            <div>
              <div className="display-text text-lg text-white tracking-widest">{ability.name}</div>
              <div
                className="mono-text text-[9px] px-2 py-0.5 inline-block"
                style={{
                  color: ability.type === 'ULTIMATE' ? '#FFD700' : '#00F5FF',
                  border: `1px solid ${ability.type === 'ULTIMATE' ? 'rgba(255,215,0,0.4)' : 'rgba(0,245,255,0.3)'}`,
                  background: ability.type === 'ULTIMATE' ? 'rgba(255,215,0,0.05)' : 'rgba(0,245,255,0.05)',
                }}
              >
                {ability.type}
              </div>
            </div>
          </div>
          <p className="mono-text text-xs text-white/50 leading-relaxed">{ability.desc}</p>
        </>
      ) : (
        <div className="flex flex-col justify-center h-full">
          <div className="mono-text text-xs text-white/20 mb-1">// HOVER ABILITY KEY TO INSPECT</div>
          <div className="mono-text text-[10px] text-white/10 leading-relaxed">
            SELECT AN ABILITY FROM THE CARD_<br />
            FULL LOADOUT ACCESSIBLE_<br />
            <span className="text-cyber-red/30">AGENT READY FOR DEPLOYMENT_</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
