import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// CSS 3D flip icon — no WebGL needed, very performant
function FlipIcon({
  color,
  icon,
  stat,
  variant,
}: {
  color: string
  icon: string
  stat: string
  variant: number
}) {
  const clipPaths = [
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',            // diamond
    'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)', // hexagon
    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // pentagon
    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // star
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',             // trapezoid
  ]
  const clip = clipPaths[variant % clipPaths.length]

  return (
    <div
      className="geo-icon-wrap"
      style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        {/* Outer slow rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12 + variant * 2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: clip,
            background: `conic-gradient(from 0deg, ${color}aa, ${color}22, ${color}aa)`,
            filter: `drop-shadow(0 0 10px ${color}88)`,
          }}
        />
        {/* Inner counter rotation */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8 + variant, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 14,
            clipPath: clip,
            background: `linear-gradient(135deg, ${color}55 0%, transparent 70%)`,
          }}
        />
        {/* Pulsing glow center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + variant * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        >
          {icon}
        </motion.div>
        {/* Stat overlay (appears on hover via parent) */}
        <div style={{
          position: 'absolute',
          bottom: -8,
          right: -8,
          background: `${color}22`,
          border: `1px solid ${color}55`,
          borderRadius: '8px',
          padding: '2px 6px',
          fontFamily: 'Orbitron, monospace',
          fontSize: '0.6rem',
          color: color,
          fontWeight: 700,
          letterSpacing: '0.05em',
          backdropFilter: 'blur(4px)',
        }}>
          {stat}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: '⚡',
    title: 'Zero Sugar',
    description: 'All the energy, none of the crash. Our advanced formula delivers sustained power without the sugar spike.',
    color: '#00f5ff',
    stat: '0g',
    statLabel: 'Sugar',
  },
  {
    icon: '🧠',
    title: '200mg Caffeine',
    description: 'Precision-dosed caffeine paired with L-Theanine for clean, focused energy that lasts for hours.',
    color: '#39ff14',
    stat: '200mg',
    statLabel: 'Caffeine',
  },
  {
    icon: '🌿',
    title: 'Natural Flavors',
    description: "Crafted from real fruit extracts and botanicals. No artificial flavors, no compromise on taste.",
    color: '#7b2fff',
    stat: '100%',
    statLabel: 'Natural',
  },
  {
    icon: '🔥',
    title: 'Nootropic Blend',
    description: "Enhanced with Lion's Mane, Rhodiola, and Alpha-GPC to boost cognitive performance.",
    color: '#ff6b35',
    stat: '5x',
    statLabel: 'Focus',
  },
  {
    icon: '💎',
    title: 'Electrolyte Matrix',
    description: 'Replenish what you lose. Our electrolyte complex keeps you hydrated and performing at peak.',
    color: '#00f5ff',
    stat: '4+',
    statLabel: 'Electrolytes',
  },
  {
    icon: '🚀',
    title: 'Fast Absorption',
    description: 'Nano-encapsulation technology ensures 3x faster absorption than standard energy drinks.',
    color: '#39ff14',
    stat: '3x',
    statLabel: 'Faster',
  },
]

type Feature = typeof features[0]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const rafRef = useRef<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const clientX = e.clientX
    const clientY = e.clientY
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotY = ((x - cx) / cx) * 8
      const rotX = -((y - cy) / cy) * 8
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const el = e.currentTarget
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    el.style.borderColor = `${feature.color}22`
    el.style.boxShadow = 'none'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = `${feature.color}55`
        el.style.boxShadow = `0 0 40px ${feature.color}18, 0 20px 60px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${feature.color}22`,
        borderRadius: '20px',
        padding: '2rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.3s, box-shadow 0.3s',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
      }} />

      {/* Background glow on hover (always present, fades in via opacity) */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: `radial-gradient(ellipse at 50% 0%, ${feature.color}08 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* CSS 3D Icon */}
      <FlipIcon
        color={feature.color}
        icon={feature.icon}
        stat={feature.stat}
        variant={index}
      />

      <h3 style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#ffffff',
        marginBottom: '0.75rem',
        letterSpacing: '0.05em',
        marginTop: '0.5rem',
      }}>{feature.title}</h3>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
      }}>{feature.description}</p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 900,
          fontSize: '1.8rem',
          color: feature.color,
          textShadow: `0 0 20px ${feature.color}80`,
        }}>{feature.stat}</span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>{feature.statLabel}</span>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: '#0a0a0a',
        position: 'relative',
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(20px)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              background: '#00f5ff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #00f5ff',
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              color: '#00f5ff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Advanced Formula
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, #ffffff, #00f5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}>
            Why HYDRA?
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            We didn't just make another energy drink. We engineered a performance
            system for the next generation of achievers.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
