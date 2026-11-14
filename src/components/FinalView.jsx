import { motion } from 'framer-motion'
import ParticleField from './ParticleField'

export default function FinalView() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 overflow-hidden">
      {/* Particle background */}
      <ParticleField />

      {/* Deep ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(252,211,77,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-xl">
        {/* Cake */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.1 }}
          className="cake-pulse select-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', lineHeight: 1 }}
          role="img"
          aria-label="Pastel de cumpleaños"
        >
          🎂
        </motion.div>

        {/* "Feliz Cumpleaños" */}
        <motion.h1
          className="gradient-text-birthday text-glow-violet"
          style={{
            fontFamily: 'var(--font-elegant)',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.4 }}
        >
          Feliz Cumpleaños
        </motion.h1>

        {/* Secondary phrase */}
        <motion.p
          style={{
            fontFamily: 'var(--font-elegant)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            textShadow: '0 0 30px rgba(252,211,77,0.15)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.75 }}
        >
          Que cada día brilles más ✨
        </motion.p>

        {/* Decorative stars row */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 120, damping: 14 }}
        >
          {['🌟', '💜', '🌟'].map((icon, i) => (
            <motion.span
              key={i}
              className="text-xl select-none"
              animate={{
                y: [0, -6, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            >
              {icon}
            </motion.span>
          ))}
        </motion.div>

        {/* Thin decorative line */}
        <motion.div
          className="w-24 h-px mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.5), transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

