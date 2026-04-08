'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'AGENT', href: '#hero', code: '01' },
  { label: 'SKILLS', href: '#skills', code: '02' },
  { label: 'PROJECTS', href: '#projects', code: '03' },
  { label: 'CONTACT', href: '#contact', code: '04' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyber-red/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-cyber-red rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
            <div className="absolute inset-[6px] bg-cyber-red rotate-45 group-hover:scale-0 transition-transform duration-300" />
          </div>
          <span className="display-text text-xl text-white tracking-widest">
            V<span className="text-cyber-red">M</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative mono-text text-xs text-white/50 hover:text-white transition-colors duration-200"
            >
              <span className="text-cyber-red mr-1">{item.code}_</span>
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-red group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="mono-text text-xs border border-cyber-red text-cyber-red px-4 py-2 hover:bg-cyber-red hover:text-black transition-all duration-200"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            RESUME
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-8 h-6 flex flex-col justify-between"
        >
          <span className={`block h-px bg-cyber-red transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-3' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-cyber-red transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-3' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/95 border-t border-cyber-red/20 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="mono-text text-sm text-white/70 hover:text-cyber-red transition-colors"
                >
                  <span className="text-cyber-red">{item.code}_</span> {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
