import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FloatingOctahedron({ color, position, speed = 1 }: { color: string; position: [number, number, number]; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * speed * 0.5
    meshRef.current.rotation.y = t * speed * 0.3
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.3
  })
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  )
}

function FeatureCanvas({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2} color={color} />
      <Suspense fallback={null}>
        <FloatingOctahedron color={color} position={[0, 0, 0]} speed={0.8} />
      </Suspense>
    </Canvas>
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
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `${feature.color}66`
        el.style.boxShadow = `0 0 30px ${feature.color}22`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `${feature.color}22`
        el.style.boxShadow = 'none'
      }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${feature.color}22`,
        borderRadius: '20px',
        padding: '2rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
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

      {/* 3D Canvas */}
      <div style={{ height: '120px', marginBottom: '1.5rem' }}>
        <FeatureCanvas color={feature.color} />
      </div>

      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>

      <h3 style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#ffffff',
        marginBottom: '0.75rem',
        letterSpacing: '0.05em',
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
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
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
