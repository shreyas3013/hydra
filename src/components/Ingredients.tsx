import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const ingredients = [
  {
    name: 'Caffeine Anhydrous',
    dose: '200mg',
    purpose: 'Energy & Alertness',
    description: 'Precision-dosed pure caffeine that activates your central nervous system for peak alertness and sustained energy without the jitter crash.',
    color: '#00f5ff',
    icon: '⚡',
    category: 'Stimulant',
  },
  {
    name: 'L-Theanine',
    dose: '150mg',
    purpose: 'Focus & Calm',
    description: 'Works in synergy with caffeine to smooth out the energy curve. Produces alpha brain waves associated with relaxed alertness and creative flow.',
    color: '#39ff14',
    icon: '🧘',
    category: 'Amino Acid',
  },
  {
    name: "Lion's Mane Extract",
    dose: '500mg',
    purpose: 'Cognitive Enhancement',
    description: "Medicinal mushroom proven to stimulate NGF (Nerve Growth Factor) production. Enhances memory, focus, and neuroplasticity for long-term brain health.",
    color: '#7b2fff',
    icon: '🧠',
    category: 'Nootropic',
  },
  {
    name: 'Rhodiola Rosea',
    dose: '300mg',
    purpose: 'Stress Resistance',
    description: 'Adaptogenic herb that helps your body resist physical and mental stress. Reduces fatigue and improves performance under pressure.',
    color: '#ff6b35',
    icon: '🌿',
    category: 'Adaptogen',
  },
  {
    name: 'Alpha-GPC',
    dose: '250mg',
    purpose: 'Memory & Learning',
    description: 'Highly bioavailable choline compound that crosses the blood-brain barrier. Boosts acetylcholine levels for sharper recall and faster processing.',
    color: '#00f5ff',
    icon: '💡',
    category: 'Cholinergic',
  },
  {
    name: 'Electrolyte Matrix',
    dose: '4 Types',
    purpose: 'Hydration & Performance',
    description: 'Sodium, Potassium, Magnesium, and Calcium in optimal ratios. Prevents cramping, supports muscle function, and keeps cellular hydration optimal.',
    color: '#39ff14',
    icon: '💎',
    category: 'Minerals',
  },
]

const categoryColors: Record<string, string> = {
  Stimulant: '#00f5ff',
  'Amino Acid': '#39ff14',
  Nootropic: '#7b2fff',
  Adaptogen: '#ff6b35',
  Cholinergic: '#00f5ff',
  Minerals: '#39ff14',
}

function IngredientCard({ ing, index }: { ing: typeof ingredients[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        padding: '3rem',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${ing.color}18`,
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}
      className="ingredient-card-grid"
      whileHover={{
        borderColor: `${ing.color}40`,
        boxShadow: `0 0 60px ${ing.color}12, 0 20px 80px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Top highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${ing.color}66, transparent)`,
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at ${isEven ? '20%' : '80%'} 50%, ${ing.color}06 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Left: Icon + category badge */}
      <div style={{ order: isEven ? 0 : 1, textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 1.5rem',
            background: `linear-gradient(135deg, ${ing.color}22, ${ing.color}08)`,
            border: `1px solid ${ing.color}44`,
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: `0 0 40px ${ing.color}22`,
            position: 'relative',
          }}
        >
          {/* Inner glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            background: `radial-gradient(circle at center, ${ing.color}18 0%, transparent 70%)`,
          }} />
          <span style={{ position: 'relative', zIndex: 1, filter: `drop-shadow(0 0 10px ${ing.color})` }}>{ing.icon}</span>
        </motion.div>

        <span style={{
          display: 'inline-block',
          background: `${ing.color}18`,
          border: `1px solid ${ing.color}44`,
          color: categoryColors[ing.category] || ing.color,
          padding: '0.25rem 0.75rem',
          borderRadius: '50px',
          fontSize: '0.7rem',
          fontFamily: 'Orbitron, monospace',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>{ing.category}</span>

        <p style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 900,
          fontSize: '2.5rem',
          color: ing.color,
          textShadow: `0 0 30px ${ing.color}60`,
          marginTop: '1rem',
        }}>{ing.dose}</p>
      </div>

      {/* Right: Text */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          color: ing.color,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
          opacity: 0.8,
        }}>{ing.purpose}</p>

        <h3 style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 800,
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          color: '#ffffff',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>{ing.name}</h3>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.8,
        }}>{ing.description}</p>
      </div>
    </motion.div>
  )
}

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 1])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax / scroll-zoom background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: bgScale,
          opacity: bgOpacity,
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }}
      />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(57,255,20,0.08)',
              border: '1px solid rgba(57,255,20,0.2)',
              borderRadius: '50px',
              padding: '0.4rem 1.2rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ width: '6px', height: '6px', background: '#39ff14', borderRadius: '50%', boxShadow: '0 0 8px #39ff14' }} />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#39ff14', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Full Transparency
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              background: 'linear-gradient(135deg, #ffffff, #39ff14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            Inside the Formula
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            No proprietary blends. No hidden doses. Every ingredient, every milligram —
            fully disclosed because we have nothing to hide.
          </motion.p>
        </div>

        {/* Ingredient cards */}
        <div>
          {ingredients.map((ing, i) => (
            <IngredientCard key={ing.name} ing={ing} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
