import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FRAGMENTS = [
  'Qué bonito que el mundo te haya traído hasta aquí',
  'Hasta esta pantalla',
  'Hasta este momento',
  'Hoy celebro que existes',
  'Que bailas',
  'Que sientes',
  'Que brillas',
]

// Typewriter speed per character (ms)
const CHAR_SPEED = 48
// Pause after fragment fully typed before fading out (ms)
const PAUSE_AFTER = 2000
// Duration of fade-out transition (ms)
const FADE_DURATION = 600

export default function PoemView({ onFinish }) {
  const [fragmentIndex, setFragmentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'fading'
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef(null)
  const charIndexRef = useRef(0)
  const intervalRef = useRef(null)

  const clearAll = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    // Reset for new fragment
    setDisplayedText('')
    setVisible(true)
    setPhase('typing')
    charIndexRef.current = 0

    const fragment = FRAGMENTS[fragmentIndex]

    // Type character by character
    intervalRef.current = setInterval(() => {
      charIndexRef.current += 1
      setDisplayedText(fragment.slice(0, charIndexRef.current))

      if (charIndexRef.current >= fragment.length) {
        clearInterval(intervalRef.current)
        setPhase('pausing')

        // After pause, fade out
        timeoutRef.current = setTimeout(() => {
          setPhase('fading')
          setVisible(false)

          // After fade, go to next fragment or finish
          timeoutRef.current = setTimeout(() => {
            if (fragmentIndex < FRAGMENTS.length - 1) {
              setFragmentIndex((i) => i + 1)
            } else {
              onFinish()
            }
          }, FADE_DURATION + 100)
        }, PAUSE_AFTER)
      }
    }, CHAR_SPEED)

    return clearAll
  }, [fragmentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Progress dots
  const progressDots = FRAGMENTS.map((_, i) => (
    <motion.div
      key={i}
      className="rounded-full"
      style={{
        width: i === fragmentIndex ? 20 : 6,
        height: 6,
        background: i <= fragmentIndex ? 'rgba(192,132,252,0.8)' : 'rgba(255,255,255,0.1)',
      }}
      animate={{
        width: i === fragmentIndex ? 20 : 6,
        background: i <= fragmentIndex ? 'rgba(192,132,252,0.8)' : 'rgba(255,255,255,0.1)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  ))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 relative">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(192,132,252,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Fragment display */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl min-h-48">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={fragmentIndex}
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
            >
              {/* Fragment number hint */}
              <motion.p
                className="text-xs uppercase tracking-[0.3em] mb-8"
                style={{ color: 'rgba(192,132,252,0.35)', fontFamily: 'var(--font-body)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {fragmentIndex + 1} / {FRAGMENTS.length}
              </motion.p>

              {/* Main text */}
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: 'var(--font-elegant)',
                  fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                  textShadow: '0 0 40px rgba(192,132,252,0.2)',
                }}
              >
                {displayedText}
                {phase === 'typing' && <span className="typewriter-cursor" />}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {progressDots}
      </motion.div>

      {/* Decorative corner lines */}
      {[
        'top-8 left-8',
        'top-8 right-8 rotate-90',
        'bottom-20 left-8 -rotate-90',
        'bottom-20 right-8 rotate-180',
      ].map((cls, i) => (
        <svg
          key={i}
          className={`absolute ${cls} opacity-10 pointer-events-none`}
          width="24" height="24" viewBox="0 0 24 24" fill="none"
        >
          <path d="M0 24 L0 0 L24 0" stroke="rgba(192,132,252,0.8)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  )
}

