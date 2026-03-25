import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import About from './components/About'
import Footer from './components/Footer'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function PageLoader() {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Animated background rings */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 0.15, 0] }}
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '300px', height: '300px',
              marginLeft: '-150px', marginTop: '-150px',
              borderRadius: '50%',
              border: '1px solid #00f5ff',
            }}
          />
        ))}
      </div>

      <motion.div
        className="loader-logo"
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
      >
        HYDRA
      </motion.div>

      <div className="loader-track">
        <div className="loader-fill" />
      </div>

      <motion.span
        className="loader-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Initializing Systems...
      </motion.span>
    </motion.div>
  )
}

const LOADER_DURATION_MS = 2200

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = (anchor as HTMLAnchorElement).getAttribute('href')
        if (href) {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader key="loader" />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: '#0a0a0a', minHeight: '100vh', overflowX: 'hidden' }}
      >
        {/* Film grain / noise overlay */}
        <div className="noise-overlay" />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Products />
          <About />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default App
