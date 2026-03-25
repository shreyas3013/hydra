import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import DrinkCan from './DrinkCan'

const products = [
  {
    id: 1,
    name: 'Arctic Frost',
    flavor: 'Icy Blue Raspberry',
    description: 'A glacial blast of blue raspberry with a crystalline finish. Pure focus in sub-zero form.',
    canColor: '#001a2e',
    emissiveColor: '#00f5ff',
    accentColor: '#00f5ff',
    price: '$3.99',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Venom Strike',
    flavor: 'Toxic Green Apple',
    description: 'Electrifyingly tart green apple with a venomous kick that hits different.',
    canColor: '#001a00',
    emissiveColor: '#39ff14',
    accentColor: '#39ff14',
    price: '$3.99',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Nebula Storm',
    flavor: 'Wild Berry Fusion',
    description: 'A cosmic collision of wild berries and tropical citrus. Your taste buds will never be the same.',
    canColor: '#1a0030',
    emissiveColor: '#7b2fff',
    accentColor: '#7b2fff',
    price: '$3.99',
    tag: 'Limited',
  },
  {
    id: 4,
    name: 'Solar Flare',
    flavor: 'Citrus Explosion',
    description: 'A supernova of citrus energy. Blood orange meets passion fruit in this solar-charged formula.',
    canColor: '#1a0800',
    emissiveColor: '#ff6b35',
    accentColor: '#ff6b35',
    price: '$3.99',
    tag: 'Hot',
  },
]

type Product = typeof products[0]

function ProductCan({ product, isActive }: { product: Product; isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * (isActive ? 0.8 : 0.3)
  })

  return (
    <group ref={groupRef}>
      <DrinkCan
        color={product.canColor}
        emissiveColor={product.emissiveColor}
        position={[0, 0, 0]}
        scale={isActive ? 1.3 : 1.0}
        autoRotate={false}
      />
    </group>
  )
}

function ProductCanvas({ product, isActive }: { product: Product; isActive: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color={product.emissiveColor} />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color={product.accentColor} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProductCan product={product} isActive={isActive} />
        </Float>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}

// Mini card using CSS only (no WebGL) - solves the "too many WebGL contexts" problem
function ProductMiniCard({
  product,
  isActive,
  onClick,
}: {
  product: Product
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="product-mini-card"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${product.accentColor}18 0%, ${product.accentColor}08 100%)`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? product.accentColor + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.3s',
        boxShadow: isActive ? `0 0 30px ${product.accentColor}18` : 'none',
      }}
    >
      {/* Animated color orb */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, ${product.accentColor}44 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(12px)',
        transition: 'opacity 0.4s',
        opacity: isActive ? 1 : 0.4,
      }} />

      {/* Stylised can icon (CSS only) */}
      <div style={{
        position: 'relative',
        width: '28px',
        height: '52px',
        margin: '0 auto 1rem',
        borderRadius: '5px 5px 4px 4px',
        background: `linear-gradient(135deg, ${product.canColor}, #1a1a1a)`,
        border: `1px solid ${product.accentColor}44`,
        boxShadow: isActive ? `0 0 12px ${product.accentColor}44` : 'none',
        transition: 'box-shadow 0.3s',
        overflow: 'hidden',
      }}>
        {/* Can stripe */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          height: '2px',
          background: product.accentColor,
          opacity: 0.8,
          boxShadow: `0 0 6px ${product.accentColor}`,
        }} />
        <div style={{
          position: 'absolute',
          top: '55%',
          left: 0,
          right: 0,
          height: '1px',
          background: product.accentColor,
          opacity: 0.4,
        }} />
      </div>

      <p style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 700,
        fontSize: '0.75rem',
        color: isActive ? product.accentColor : '#ffffff',
        marginBottom: '0.3rem',
        transition: 'color 0.3s',
        letterSpacing: '0.04em',
      }}>{product.name}</p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.3,
      }}>{product.flavor}</p>

      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="activeProductDot"
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: product.accentColor,
            boxShadow: `0 0 8px ${product.accentColor}`,
          }}
        />
      )}
    </motion.div>
  )
}

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(0)
  const product = products[activeProduct]

  return (
    <section
      id="products"
      style={{
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #050510 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ background: `radial-gradient(circle, ${product.accentColor}08 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          top: '30%',
          right: '-20%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(30px)',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(57,255,20,0.08)',
            border: '1px solid rgba(57,255,20,0.2)',
            borderRadius: '50px',
            padding: '0.4rem 1.2rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              background: '#39ff14',
              borderRadius: '50%',
              boxShadow: '0 0 8px #39ff14',
            }} />
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              color: '#39ff14',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Choose Your Weapon
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
              background: 'linear-gradient(135deg, #ffffff, #39ff14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
            }}
          >
            The Lineup
          </motion.h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.5)',
          }}>
            Four formulas. Four experiences. Infinite possibilities.
          </p>
        </div>

        {/* Product showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* 3D Can viewer — single WebGL canvas */}
          <div style={{ height: '500px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <ProductCanvas product={product} isActive={true} />
              </motion.div>
            </AnimatePresence>
            {/* Shadow under the can */}
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '40px',
              background: `radial-gradient(ellipse, ${product.accentColor}44 0%, transparent 70%)`,
              filter: 'blur(10px)',
              pointerEvents: 'none',
              transition: 'background 0.6s',
            }} />
          </div>

          {/* Product info */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.45 }}
              >
                <span style={{
                  display: 'inline-block',
                  background: `${product.accentColor}22`,
                  border: `1px solid ${product.accentColor}44`,
                  color: product.accentColor,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontFamily: 'Orbitron, monospace',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                }}>{product.tag}</span>

                <h3 style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  lineHeight: 1.1,
                }}>{product.name}</h3>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: product.accentColor,
                  marginBottom: '1.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>{product.flavor}</p>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  marginBottom: '2.5rem',
                }}>{product.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: '2rem',
                    color: product.accentColor,
                    textShadow: `0 0 20px ${product.accentColor}60`,
                  }}>{product.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: `0 0 30px ${product.accentColor}55` }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: `linear-gradient(135deg, ${product.accentColor}, ${product.emissiveColor}88)`,
                      border: 'none',
                      color: '#0a0a0a',
                      cursor: 'pointer',
                      padding: '0.875rem 2rem',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontFamily: 'Orbitron, monospace',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Product selector (CSS-only mini cards) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
              marginTop: '2rem',
            }}>
              {products.map((p, i) => (
                <ProductMiniCard
                  key={p.id}
                  product={p}
                  isActive={i === activeProduct}
                  onClick={() => setActiveProduct(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
