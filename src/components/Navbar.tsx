import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Products', href: '#products' },
    { label: 'Formula', href: '#ingredients' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Our Story', href: '#about' },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.12)' : 'none',
        padding: '0 2rem',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => scrollTo('#hero')}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 10px rgba(0,245,255,0.4)', '0 0 20px rgba(0,245,255,0.7)', '0 0 10px rgba(0,245,255,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: '1rem',
              color: '#0a0a0a',
            }}
          >H</motion.div>
          <span style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 800,
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>HYDRA</span>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              whileHover={{ color: '#00f5ff', y: -1 }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                position: 'relative',
              }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,245,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('#products')}
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
              border: 'none',
              color: '#0a0a0a',
              cursor: 'pointer',
              padding: '0.6rem 1.5rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Shop Now
          </motion.button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: '1px solid rgba(0,245,255,0.3)',
            color: '#00f5ff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0.4rem 0.6rem',
            borderRadius: '8px',
            transition: 'all 0.2s',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(0,245,255,0.1)',
              borderBottom: '1px solid rgba(0,245,255,0.1)',
              padding: '1.5rem 2rem',
              overflow: 'hidden',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '1rem 0',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => scrollTo('#products')}
              style={{
                marginTop: '1rem',
                width: '100%',
                background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
                border: 'none',
                color: '#0a0a0a',
                cursor: 'pointer',
                padding: '0.875rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Shop Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
