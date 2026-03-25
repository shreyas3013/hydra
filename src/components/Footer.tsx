import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'Instagram', icon: '◉', href: '#' },
    { name: 'TikTok', icon: '▶', href: '#' },
    { name: 'YouTube', icon: '▶▶', href: '#' },
  ]

  const links: Record<string, string[]> = {
    Products: ['Arctic Frost', 'Venom Strike', 'Nebula Storm', 'Solar Flare', 'Bundle Packs'],
    Company: ['Our Story', 'Team', 'Careers', 'Press Kit', 'Sustainability'],
    Support: ['FAQ', 'Shipping', 'Returns', 'Store Locator', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Certifications'],
  }

  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(0,245,255,0.1)',
      padding: '5rem 2rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,245,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Newsletter section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.05) 0%, rgba(123,47,255,0.05) 100%)',
          border: '1px solid rgba(0,245,255,0.15)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}>
              Join the HYDRA Network
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.5)',
            }}>
              Early access, exclusive drops, and performance content. No spam.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#39ff14',
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.9rem',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>✓</span>
              You're in. Welcome to the network.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(0,245,255,0.2)',
                  borderRadius: '50px',
                  padding: '0.75rem 1.5rem',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '260px',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
                  border: 'none',
                  color: '#0a0a0a',
                  cursor: 'pointer',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </motion.button>
            </form>
          )}
        </div>

        {/* Main footer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{
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
              }}>H</div>
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 800,
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #00f5ff, #7b2fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>HYDRA</span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Next-generation performance energy for those who refuse to settle.
              Clean formula. Maximum output.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: '#00f5ff' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '0.75rem',
                color: '#00f5ff',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: '1.5rem',
              }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ color: '#00f5ff', x: 4 }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.4)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        display: 'inline-block',
                      }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
          }}>
            © 2025 HYDRA Energy Co. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: '#39ff14',
              borderRadius: '50%',
              boxShadow: '0 0 8px #39ff14',
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}>
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
