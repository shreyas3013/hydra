import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Zoom in as section enters, zoom out slightly as it leaves
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 2rem',
      }}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          scale: bgScale,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.08) 0%, rgba(123,47,255,0.06) 30%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }} />

      {/* Rotating rings */}
      {[300, 480, 660].map((size, i) => (
        <motion.div
          key={size}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 30 + i * 8, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${size}px`,
            height: `${size}px`,
            marginTop: `-${size / 2}px`,
            marginLeft: `-${size / 2}px`,
            border: `1px solid rgba(0,245,255,${0.06 - i * 0.015})`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main content — zoom in on scroll */}
      <motion.div
        ref={titleRef}
        style={{ scale, opacity, textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '900px' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(57,255,20,0.1)',
            border: '1px solid rgba(57,255,20,0.3)',
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ width: '8px', height: '8px', background: '#39ff14', borderRadius: '50%', boxShadow: '0 0 10px #39ff14', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: '#39ff14', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Available Now
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #7b2fff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            filter: 'drop-shadow(0 0 40px rgba(0,245,255,0.3))',
          }}>
            Are You Ready to
          </span>
          <span style={{
            background: 'linear-gradient(135deg, #39ff14, #00f5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            filter: 'drop-shadow(0 0 60px rgba(57,255,20,0.4))',
          }}>
            Evolve?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
          }}
        >
          Join 5 million peak performers who have made the switch.
          Your next level starts with a single can.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(0,245,255,0.5), 0 0 120px rgba(0,245,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProducts}
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
              border: 'none',
              color: '#0a0a0a',
              cursor: 'pointer',
              padding: '1.1rem 3rem',
              borderRadius: '50px',
              fontSize: '0.95rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              boxShadow: '0 0 30px rgba(0,245,255,0.3)',
            }}
          >
            Shop the Lineup
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, background: 'rgba(0,245,255,0.1)', borderColor: '#00f5ff', boxShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,245,255,0.35)',
              color: '#00f5ff',
              cursor: 'pointer',
              padding: '1.1rem 3rem',
              borderRadius: '50px',
              fontSize: '0.95rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
            }}
          >
            Find a Store
          </motion.button>
        </motion.div>

        {/* Micro trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '2rem',
            letterSpacing: '0.05em',
          }}
        >
          Free shipping on orders over $30 · 30-day money-back guarantee · No subscription traps
        </motion.p>
      </motion.div>
    </section>
  )
}
