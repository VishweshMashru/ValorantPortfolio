'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const links = [
  { label: 'GITHUB', href: 'https://github.com/VishweshMashru', icon: '⌥', desc: 'CODE ARCHIVE' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/vishwesh-mashruwala-00a53122a/', icon: '⊡', desc: 'PROFESSIONAL DOSSIER' },
  { label: 'EMAIL', href: 'mailto:hello@vishwesh.dev', icon: '✉', desc: 'DIRECT COMMS' },
  { label: 'Code&Cloth', href: '-REDACTED-', icon: '◈', desc: 'UNKNOWN' },
]

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [typed, setTyped] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,0,64,0.04) 0%, transparent 70%)' }} />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-red/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="flex items-center gap-4 mb-2"
          >
            <span className="mono-text text-cyber-red text-xs tracking-[0.4em]">04_COMMS</span>
            <div className="flex-1 h-px bg-cyber-red/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="display-text text-[clamp(3rem,8vw,7rem)] text-white leading-none"
          >
            OPEN
            <span className="text-cyber-red"> CHANNEL</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div
              className="relative p-6"
              style={{ border: '1px solid rgba(255,0,64,0.2)', background: 'rgba(255,0,64,0.02)' }}
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
                <span className="mono-text text-[10px] text-white/20 ml-2">terminal // connect</span>
              </div>

              {/* Terminal output */}
              <div className="space-y-2 mb-4">
                {[
                  { prompt: 'sys', text: 'Hey! I\'m Vishwesh — CS grad, freelancer, creative.', color: 'text-white/60' },
                  { prompt: 'sys', text: 'Currently: helping run family embroidery biz + building my own thing.', color: 'text-white/40' },
                  { prompt: 'sys', text: 'Looking for: freelance work, cool collaborations, interesting problems.', color: 'text-cyber-cyan' },
                  { prompt: 'sys', text: 'Based in: Ahmedabad, India. Available globally (async friendly).', color: 'text-white/40' },
                ].map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="mono-text text-[10px] text-cyber-red/50 flex-shrink-0">[{line.prompt}]$</span>
                    <span className={`mono-text text-[11px] ${line.color} leading-relaxed`}>{line.text}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              {!submitted ? (
                <div className="flex gap-2 items-center border-t border-white/5 pt-3">
                  <span className="mono-text text-[10px] text-cyber-red/50">[you]$</span>
                  <input
                    type="text"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && typed.trim()) setSubmitted(true)
                    }}
                    placeholder="say something..."
                    className="flex-1 bg-transparent mono-text text-[11px] text-white/70 outline-none placeholder-white/15"
                  />
                  <button
                    onClick={() => typed.trim() && setSubmitted(true)}
                    className="mono-text text-[9px] text-cyber-red/60 hover:text-cyber-red transition-colors"
                  >
                    [ENTER]
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 border-t border-white/5 pt-3">
                  <span className="mono-text text-[10px] text-cyber-red/50">[sys]$</span>
                  <span className="mono-text text-[11px] text-neon-green">
                    Message received. Initiating response protocol... just email me below 😄
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group flex items-center gap-4 p-4 border border-white/5 hover:border-cyber-red/40 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.01)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300 group-hover:border-cyber-red/60"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {link.icon}
                </div>
                <div className="flex-1">
                  <div className="display-text text-lg text-white group-hover:text-cyber-red transition-colors tracking-widest">
                    {link.label}
                  </div>
                  <div className="mono-text text-[9px] text-white/25 tracking-widest">{link.desc}</div>
                </div>
                <div className="mono-text text-xs text-white/20 group-hover:text-cyber-red group-hover:translate-x-1 transition-all duration-200">
                  →
                </div>
              </motion.a>
            ))}

            {/* Status indicator */}
            <div
              className="p-4 border border-neon-green/20"
              style={{ background: 'rgba(0,255,136,0.02)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="mono-text text-xs text-neon-green/70">AVAILABLE FOR WORK</span>
              </div>
              <p className="mono-text text-[10px] text-white/30 leading-relaxed">
                Open to freelance projects, collaborations, and interesting ideas. 
                Typically respond within 24h.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="mono-text text-[10px] text-white/20">
            © 2026 VISHWESH MASHRUWALA // BUILT IN Surat
          </span>
          <span className="mono-text text-[10px] text-white/15">
            NEXT.JS // THREE.JS // FRAMER MOTION // TAILWIND
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyber-red rotate-45" />
            <span className="mono-text text-[10px] text-cyber-red/40">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
