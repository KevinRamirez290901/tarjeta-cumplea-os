import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

// The correct passphrase to unlock the experience
const SECRET_PHRASE = 'te quiero'

export default function LoginView({ onSuccess }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleVerify = () => {
    if (value.trim().toLowerCase() === SECRET_PHRASE.toLowerCase()) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleVerify()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 }}
          className="flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{
            background: 'rgba(192,132,252,0.08)',
            border: '1px solid rgba(192,132,252,0.2)',
          }}
        >
          <Sparkles size={26} style={{ color: '#c084fc' }} />
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(192,132,252,0.6)' }}>
            Acceso especial
          </p>
          <h1 className="text-2xl font-light text-white/90">
            Introduce la frase
          </h1>
          <p className="text-sm mt-2 text-white/30 font-light">
            Solo quien sabe, puede entrar ✨
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          className="w-full"
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              onKeyDown={handleKeyDown}
              placeholder="Escribe aquí..."
              className="input-elegant w-full px-1 py-3 text-center text-lg tracking-wide"
              autoComplete="off"
              spellCheck="false"
            />
            {error && (
              <motion.p
                className="absolute -bottom-6 left-0 right-0 text-center text-xs"
                style={{ color: 'rgba(249,168,212,0.8)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Eso no es correcto... inténtalo de nuevo 🌸
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={handleVerify}
          className="relative group flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide overflow-hidden cursor-pointer"
          style={{
            background: 'rgba(192,132,252,0.12)',
            border: '1px solid rgba(192,132,252,0.3)',
            color: '#c084fc',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          // Delay after input
        >
          {/* Hover glow overlay */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            style={{ background: 'rgba(192,132,252,0.08)', boxShadow: '0 0 30px rgba(192,132,252,0.2)' }}
          />
          <span className="relative z-10">Verificar</span>
          <ArrowRight size={15} className="relative z-10" />
        </motion.button>
      </motion.div>

      {/* Bottom ambient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(147,197,253,0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  )
}

