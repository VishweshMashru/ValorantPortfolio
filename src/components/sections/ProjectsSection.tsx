'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: '001',
    name: 'LYBYTEX',
    subtitle: 'Inventory Management System',
    desc: 'Full-stack inventory & operations platform for the family embroidery empire. Next.js + Supabase + TanStack Table. Live at lybytex.com.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'TanStack'],
    status: 'LIVE',
    statusColor: '#00FF88',
    accent: '#FF0040',
    link: 'https://lybytex.com',
  },
  {
    id: '002',
    name: 'HEAPOVERFLOW',
    subtitle: 'Developer Q&A Platform',
    desc: 'Stack Overflow clone built from scratch. Next.js, PostgreSQL, Drizzle ORM, Clerk auth. Full CRUD, voting, tagging system.',
    tags: ['Next.js', 'PostgreSQL', 'Drizzle', 'Clerk'],
    status: 'DEPLOYED',
    statusColor: '#00F5FF',
    accent: '#00F5FF',
    link: '#',
  },
  {
    id: '003',
    name: 'AUGST AI',
    subtitle: 'Freelance Full-Stack',
    desc: 'Production freelance work on an AI-powered platform. TypeScript, React, Next.js, Node.js, MongoDB + Redis. Real users, real scale.',
    tags: ['TypeScript', 'Next.js', 'MongoDB', 'Redis'],
    status: 'SHIPPED',
    statusColor: '#FFD700',
    accent: '#FFD700',
    link: '#',
  },
  {
    id: '004',
    name: 'VSHELL',
    subtitle: 'Unix Shell Implementation',
    desc: 'Custom Unix shell in C. Pipes, redirection, job control, built-ins. Systems programming, the hard way.',
    tags: ['C', 'Unix', 'Systems', 'OS'],
    status: 'COMPLETE',
    statusColor: '#FF006E',
    accent: '#FF006E',
    link: '#',
  },
  {
    id: '005',
    name: 'MARS LANDER',
    subtitle: '3D Simulator — OpenFrameworks',
    desc: 'Real-time 3D Mars rover landing simulator. Physics engine, particle systems, octree collision detection. Built for CS134.',
    tags: ['C++', 'OpenFrameworks', '3D', 'Physics'],
    status: 'ARCHIVED',
    statusColor: '#888',
    accent: '#888',
    link: '#',
  },
  {
    id: '006',
    name: 'RETROWAVE VAULT',
    subtitle: 'Concept // Coming Soon',
    desc: 'Curated marketplace for retro & lofi digital art. Gumroad meets Are.na. Building the vibe economy.',
    tags: ['Concept', 'Marketplace', 'Art', 'Web3'],
    status: 'IN PROGRESS',
    statusColor: '#FF0040',
    accent: '#FF0040',
    link: '#',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <a
        href={project.link}
        target={project.link !== '#' ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="block relative p-6 overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${hovered ? project.accent + '60' : 'rgba(255,255,255,0.06)'}`,
          background: hovered
            ? `linear-gradient(135deg, ${project.accent}08 0%, transparent 60%)`
            : 'rgba(255,255,255,0.01)',
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <span className="mono-text text-xs text-white/20">{project.id}_</span>
          <div
            className="flex items-center gap-1.5 px-2 py-0.5"
            style={{
              border: `1px solid ${project.statusColor}30`,
              background: `${project.statusColor}08`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: project.statusColor,
                boxShadow: `0 0 4px ${project.statusColor}`,
                animation: project.status === 'IN PROGRESS' ? 'pulse 2s infinite' : 'none',
              }}
            />
            <span className="mono-text text-[9px] tracking-widest" style={{ color: project.statusColor }}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Project name */}
        <div className="mb-1">
          <h3
            className="display-text text-2xl tracking-wider transition-colors duration-200"
            style={{ color: hovered ? project.accent : 'white' }}
          >
            {project.name}
          </h3>
          <div className="mono-text text-[10px] text-white/30 tracking-widest">{project.subtitle}</div>
        </div>

        {/* Divider */}
        <div
          className="h-px my-4 transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${hovered ? project.accent : 'rgba(255,255,255,0.06)'}, transparent)`,
          }}
        />

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="ability-tag text-[9px]"
              style={{
                color: `${project.accent}90`,
                borderColor: `${project.accent}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute bottom-5 right-5 mono-text text-xs"
          style={{ color: project.accent }}
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          VIEW →
        </motion.div>

        {/* Corner accent */}
        {hovered && (
          <>
            <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: `1px solid ${project.accent}`, borderLeft: `1px solid ${project.accent}` }} />
            <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: `1px solid ${project.accent}`, borderRight: `1px solid ${project.accent}` }} />
          </>
        )}
      </a>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" className="relative py-24">
      {/* Akira-style horizontal divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="flex items-center gap-4 mb-2"
          >
            <span className="mono-text text-cyber-red text-xs tracking-[0.4em]">03_MISSIONS</span>
            <div className="flex-1 h-px bg-cyber-red/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="display-text text-[clamp(3rem,8vw,7rem)] text-white leading-none"
          >
            PROJECT
            <span
              className="block"
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,0,64,0.5)' }}
            >
              ARCHIVE
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
