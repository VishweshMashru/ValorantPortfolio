'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'FRONTEND',
    color: '#FF0040',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'BACKEND',
    color: '#00F5FF',
    skills: ['Node.js', 'PostgreSQL', 'Supabase', 'MongoDB', 'Redis', 'Drizzle ORM'],
  },
  {
    category: 'CREATIVE',
    color: '#FFD700',
    skills: ['Unity', 'Blender', 'React Three Fiber', 'GSAP', 'Pixel Art', 'Game Dev'],
  },
  {
    category: 'SYSTEMS',
    color: '#00FF88',
    skills: ['Linux (Fedora)', 'Docker', 'Git', 'C/C++', 'Shell Scripts', 'Self-hosting'],
  },
]

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-5 group hover:border-opacity-60 transition-all duration-300"
      style={{
        border: `1px solid ${group.color}20`,
        background: `linear-gradient(135deg, ${group.color}05 0%, transparent 60%)`,
      }}
    >
      {/* Animated border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${group.color}10, 0 0 20px ${group.color}08` }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `1px solid ${group.color}`, borderLeft: `1px solid ${group.color}` }} />
      <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `1px solid ${group.color}`, borderRight: `1px solid ${group.color}` }} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rotate-45" style={{ background: group.color }} />
        <span className="display-text text-sm tracking-[0.3em]" style={{ color: group.color }}>
          {group.category}
        </span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${group.color}40, transparent)` }} />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 gap-2">
        {group.skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
            className="flex items-center gap-2 group/skill"
          >
            <div
              className="w-1 h-1 flex-shrink-0 transition-all duration-200 group-hover/skill:w-2"
              style={{ background: `${group.color}60` }}
            />
            <span
              className="mono-text text-[11px] text-white/50 group-hover/skill:text-white/80 transition-colors duration-200"
            >
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M10 30 H 50" stroke="#FF0040" strokeWidth="0.5" fill="none"/>
              <path d="M30 10 V 50" stroke="#FF0040" strokeWidth="0.5" fill="none"/>
              <circle cx="30" cy="30" r="3" stroke="#FF0040" strokeWidth="0.5" fill="none"/>
              <circle cx="10" cy="30" r="2" fill="#FF0040"/>
              <circle cx="50" cy="30" r="2" fill="#FF0040"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4 mb-2"
          >
            <span className="mono-text text-cyber-red text-xs tracking-[0.4em]">02_LOADOUT</span>
            <div className="flex-1 h-px bg-cyber-red/20" />
            <span className="mono-text text-white/20 text-xs">SKILL TREE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="display-text text-[clamp(3rem,8vw,7rem)] text-white leading-none"
          >
            TECH
            <span className="text-cyber-red"> STACK</span>
          </motion.h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
