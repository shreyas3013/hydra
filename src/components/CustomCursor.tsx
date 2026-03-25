import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    // Use event delegation on document so we catch all current and future elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderColor = '#39ff14'
        ring.style.opacity = '0.8'
        dot.style.opacity = '0'
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = '#00f5ff'
        ring.style.opacity = '0.6'
        dot.style.opacity = '1'
      }
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: '#00f5ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          boxShadow: '0 0 10px #00f5ff, 0 0 20px rgba(0,245,255,0.4)',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1.5px solid #00f5ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: 0.6,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
