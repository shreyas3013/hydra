import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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

    if (statsRef.current) {
      gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
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
        background: 'radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(123,47,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,47,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
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
          gridTemplateColumns: '1fr 1fr',
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
                  <div style={{
                    width: '20px',
                    height: '20px',
                    background: 'rgba(0,245,255,0.15)',
                    border: '1px solid #00f5ff',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: '#00f5ff', fontSize: '0.7rem' }}>✓</span>
                  </div>
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
                    background: 'linear-gradient(180deg, rgba(123,47,255,0.5) 0%, transparent 100%)',
                  }} />
                )}

                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(123,47,255,0.15)',
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
                  }}>{item.year}</div>
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

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            padding: '3rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
          }}
        >
          {[
            { value: '5M+', label: 'Cans Sold' },
            { value: '50+', label: 'Countries' },
            { value: '#1', label: 'Rated Online' },
            { value: '2025', label: 'Est. Formula' },
          ].map((stat, i) => (
            <div key={i} className="stat-item" style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
              }}>{stat.value}</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
