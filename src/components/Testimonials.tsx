import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Alex Chen',
    handle: '@alexchen_pro',
    role: 'Pro Esports Athlete',
    avatar: 'AC',
    color: '#00f5ff',
    text: "HYDRA completely changed my in-game performance. The focus is unreal — no jitters, no crash. I shaved 40ms off my reaction time in the first week.",
    stars: 5,
  },
  {
    name: 'Jordan Mills',
    handle: '@jordanfitness',
    role: 'CrossFit Coach',
    avatar: 'JM',
    color: '#39ff14',
    text: "Finally an energy drink that keeps up with my athletes. Clean ingredients, real results. The Venom Strike flavor has become a staple in our gym.",
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    handle: '@priyacodes',
    role: 'Senior Software Engineer',
    avatar: 'PS',
    color: '#7b2fff',
    text: "Late-night coding sessions are a different experience now. Arctic Frost keeps me sharp for hours without the afternoon crash I used to dread.",
    stars: 5,
  },
  {
    name: 'Marcus Webb',
    handle: '@marcuswebb',
    role: 'Content Creator — 2.8M Followers',
    avatar: 'MW',
    color: '#ff6b35',
    text: "I tried every energy drink out there. HYDRA is the only one that actually delivers on its promises. Nebula Storm tastes like outer space.",
    stars: 5,
  },
  {
    name: 'Sofia Reyes',
    handle: '@sofiareyes_art',
    role: 'Digital Artist',
    avatar: 'SR',
    color: '#00f5ff',
    text: "The nootropic blend is no joke. My creative flow is insane when I'm on HYDRA. Colors look more vivid, ideas come faster. Sounds weird but it works.",
    stars: 5,
  },
  {
    name: 'Tyler Knight',
    handle: '@tknight_speed',
    role: 'Speedrun World Record Holder',
    avatar: 'TK',
    color: '#39ff14',
    text: "Been drinking HYDRA for 6 months straight. Zero jitters, maximum precision. The electrolyte matrix is legit — I stay hydrated through 8-hour sessions.",
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#ffd700', fontSize: '0.9rem', textShadow: '0 0 8px rgba(255,215,0,0.6)' }}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${t.color}22`,
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${t.color}18, 0 20px 60px rgba(0,0,0,0.4)`
        e.currentTarget.style.borderColor = `${t.color}44`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${t.color}22`
      }}
    >
      {/* Glassmorphism top highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${t.color}88, transparent)`,
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: `radial-gradient(ellipse at 40% 0%, ${t.color}06 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Quote mark */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1.5rem',
        fontFamily: 'Georgia, serif',
        fontSize: '4rem',
        color: `${t.color}18`,
        lineHeight: 1,
        userSelect: 'none',
      }}>"</div>

      <StarRating count={t.stars} />

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.8,
        marginBottom: '1.75rem',
        position: 'relative',
        zIndex: 1,
      }}>
        "{t.text}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Avatar */}
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.color}44, ${t.color}22)`,
          border: `1px solid ${t.color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: t.color,
          boxShadow: `0 0 12px ${t.color}33`,
          flexShrink: 0,
        }}>{t.avatar}</div>

        <div>
          <p style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: '#ffffff',
            marginBottom: '0.2rem',
          }}>{t.name}</p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: t.color,
            opacity: 0.8,
          }}>{t.role}</p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.3)',
          }}>{t.handle}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #080812 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.2)',
              borderRadius: '50px',
              padding: '0.4rem 1.2rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ width: '6px', height: '6px', background: '#00f5ff', borderRadius: '50%', boxShadow: '0 0 8px #00f5ff' }} />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#00f5ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Social Proof
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
              background: 'linear-gradient(135deg, #ffffff, #00f5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            Real People. Real Results.
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
            Over 5 million cans consumed by the world's top performers.
            Here's what they have to say.
          </motion.p>
        </div>

        {/* Testimonial grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            marginTop: '5rem',
            padding: '2.5rem 3rem',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '4.9/5', label: 'Avg. Rating', color: '#ffd700' },
            { value: '50K+', label: 'Reviews', color: '#00f5ff' },
            { value: '98%', label: 'Would Recommend', color: '#39ff14' },
            { value: '#1', label: 'Rated Online', color: '#7b2fff' },
          ].map((b) => (
            <div key={b.label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                color: b.color,
                textShadow: `0 0 20px ${b.color}60`,
                marginBottom: '0.3rem',
              }}>{b.value}</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>{b.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
