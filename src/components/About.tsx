import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2019',
    title: 'The Idea',
    description: 'Born in a garage lab, frustrated with energy drinks that promised performance but delivered crashes and chemicals.',
  },
  {
    year: '2021',
    title: 'The Formula',
    description: 'After 2 years of research with sports scientists and nutritionists, the Hydra formula was perfected.',
  },
  {
    year: '2022',
    title: 'First Launch',
    description: 'Arctic Frost debuted at underground gaming tournaments. Sold out in 48 hours. The cult was born.',
  },
  {
    year: '2024',
    title: 'The Revolution',
    description: 'Four flavors. Millions of cans. HYDRA is now the fastest-growing performance drink on the planet.',
  },
]

const statsData = [
  { raw: 5, suffix: 'M+', label: 'Cans Sold' },
  { raw: 50, suffix: '+', label: 'Countries' },
  { raw: 1, prefix: '#', suffix: '', label: 'Rated Online' },
  { raw: 2025, suffix: '', label: 'Est. Formula' },
]

function AnimatedStat({ raw, suffix, prefix = '', label, delay }: {
  raw: number; suffix: string; prefix?: string; label: string; delay: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const steps = 40
    const increment = raw / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= raw) {
        setCount(raw)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, raw])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="stat-item"
      style={{ textAlign: 'center' }}
    >
      <p style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 900,
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.5rem',
        fontVariantNumeric: 'tabular-nums',
      } as React.CSSProperties}>
        {prefix}{count}{suffix}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
      }}>{label}</p>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.to('.about-bg', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -100,
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="about-bg" style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(20px)',
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(123,47,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,47,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(123,47,255,0.1)',
            border: '1px solid rgba(123,47,255,0.3)',
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              background: '#7b2fff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #7b2fff',
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              color: '#7b2fff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Our Story
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              background: 'linear-gradient(135deg, #ffffff, #7b2fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
            }}
          >
            Born to Disrupt
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            We didn't enter the energy drink market. We blew it up and rebuilt it
            from the ground up. This is the story of HYDRA.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '6rem',
          alignItems: 'start',
          marginBottom: '6rem',
        }}>
          {/* Left: Story text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: '1.8rem',
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: 1.3,
            }}>
              We Hated the Status Quo
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.9,
              marginBottom: '1.5rem',
            }}>
              The energy drink industry hadn't evolved in 20 years. Same sugar bombs.
              Same artificial garbage. Same crash-and-burn cycle. We knew there had to be a better way.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.9,
              marginBottom: '2rem',
            }}>
              HYDRA was designed for peak performers — gamers, athletes, creators,
              visionaries — who demand more from what they put in their bodies.
              Clean ingredients. Precise dosing. Zero compromise.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Third-party tested and certified',
                'No proprietary blends - full transparency',
                'Manufactured in FDA-registered facilities',
                'NSF Certified for Sport',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.4 }}
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'rgba(0,245,255,0.12)',
                      border: '1px solid #00f5ff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 8px rgba(0,245,255,0.2)',
                    }}
                  >
                    <span style={{ color: '#00f5ff', fontSize: '0.7rem' }}>✓</span>
                  </motion.div>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <div>
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '2.5rem',
                  position: 'relative',
                }}
              >
                {i < timeline.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: '24px',
                    top: '60px',
                    width: '2px',
                    height: 'calc(100% + 0px)',
                    background: 'linear-gradient(180deg, rgba(123,47,255,0.6) 0%, transparent 100%)',
                  }} />
                )}

                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    whileInView={{ boxShadow: ['0 0 0px rgba(123,47,255,0)', '0 0 20px rgba(123,47,255,0.4)', '0 0 10px rgba(123,47,255,0.2)'] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(123,47,255,0.12)',
                      border: '1px solid rgba(123,47,255,0.4)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#7b2fff',
                      letterSpacing: '0.05em',
                    }}
                  >{item.year}</motion.div>
                </div>

                <div>
                  <h4 style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em',
                  }}>{item.title}</h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                  }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          padding: '3rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow behind stats */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {statsData.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              raw={stat.raw}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
