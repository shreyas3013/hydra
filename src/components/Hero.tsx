import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import DrinkCan from './DrinkCan'
import ParticleField from './ParticleField'

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    if (titleRef.current) {
      tl.from(titleRef.current.children, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
    }
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
    }
    if (ctaRef.current) {
      tl.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')
    }
  }, [])

  const letters = 'HYDRA'.split('')

  const scrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #0d1a1a 0%, #0a0a0a 70%)',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }} />

      {/* Scan line effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
        opacity: 0.5,
        animation: 'scan-line 4s linear infinite',
        zIndex: 1,
      }} />

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
          <pointLight position={[-5, -5, 5]} intensity={1} color="#7b2fff" />
          <pointLight position={[0, 3, 3]} intensity={1.5} color="#ffffff" />
          <Suspense fallback={null}>
            <DrinkCan
              color="#001a1a"
              emissiveColor="#00f5ff"
              position={[1.8, 0, 0]}
              scale={1.4}
              autoRotate
            />
            <ParticleField count={300} color="#00f5ff" />
            <Sparkles count={50} scale={10} size={2} speed={0.3} color="#00f5ff" />
            <Environment preset="night" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>

      {/* Text Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        width: '100%',
        paddingTop: '72px',
      }}>
        <div style={{ maxWidth: '600px' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0,245,255,0.1)',
              border: '1px solid rgba(0,245,255,0.3)',
              borderRadius: '50px',
              padding: '0.4rem 1rem',
              marginBottom: '2rem',
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              background: '#39ff14',
              borderRadius: '50%',
              display: 'inline-block',
              boxShadow: '0 0 8px #39ff14',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.75rem',
              color: '#00f5ff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              New Formula 2025
            </span>
          </motion.div>

          {/* Main Title */}
          <div ref={titleRef} style={{ display: 'flex', gap: '0.1em', marginBottom: '0.5rem', perspective: '1000px' }}>
            {letters.map((letter, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 900,
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  lineHeight: 1,
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #00f5ff, #7b2fff)'
                    : 'linear-gradient(135deg, #ffffff, #00f5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.5))',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <div ref={subtitleRef} style={{ marginBottom: '2.5rem' }}>
            <p style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}>
              UNLEASH YOUR{' '}
              <span style={{ color: '#39ff14', textShadow: '0 0 20px rgba(57,255,20,0.8)' }}>
                POTENTIAL
              </span>
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '1rem',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}>
              Next-generation energy enhanced with adaptogens, nootropics, and
              zero compromise on taste. Fuel your flow state.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,255,0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToFeatures}
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
                border: 'none',
                color: '#0a0a0a',
                cursor: 'pointer',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Explore Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(0,245,255,0.1)', borderColor: '#00f5ff' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,245,255,0.4)',
                color: '#00f5ff',
                cursor: 'pointer',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Watch Film
            </motion.button>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {[
              { value: '200mg', label: 'Caffeine' },
              { value: '0g', label: 'Sugar' },
              { value: '8', label: 'Flavors' },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: '#00f5ff',
                  textShadow: '0 0 20px rgba(0,245,255,0.5)',
                }}>{stat.value}</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: '0.25rem',
                }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={scrollToFeatures}
      >
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(0,245,255,0.3)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div style={{
            width: '4px',
            height: '10px',
            background: '#00f5ff',
            borderRadius: '2px',
            boxShadow: '0 0 8px #00f5ff',
          }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
