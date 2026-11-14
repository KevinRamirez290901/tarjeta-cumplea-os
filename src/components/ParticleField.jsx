import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 55

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    const COLORS = [
      'rgba(192, 132, 252,', // violet
      'rgba(249, 168, 212,', // pink
      'rgba(252, 211, 77,',  // gold
      'rgba(147, 197, 253,', // blue
      'rgba(255, 255, 255,', // white
    ]

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(1.5, 4),
      vx: randomBetween(-0.25, 0.25),
      vy: randomBetween(-0.6, -0.15),
      alpha: randomBetween(0.2, 0.9),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: randomBetween(0.004, 0.012),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      twinkleOffset: randomBetween(0, Math.PI * 2),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Drift
        p.x += p.vx
        p.y += p.vy
        // Twinkle
        p.twinkleOffset += p.alphaSpeed
        const a = 0.3 + 0.6 * (0.5 + 0.5 * Math.sin(p.twinkleOffset))

        // Wrap
        if (p.y < -10) { p.y = height + 10; p.x = randomBetween(0, width) }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        gradient.addColorStop(0, `${p.color}${a})`)
        gradient.addColorStop(1, `${p.color}0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.min(a + 0.3, 1)})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

