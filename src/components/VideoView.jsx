import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Play } from 'lucide-react'

export default function VideoView({ src, showDownload = false, onContinue, stepLabel }) {
  const videoRef = useRef(null)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 py-12">
      {/* Ambient glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-56 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(147,197,253,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
      >
        {/* Step label */}
        <motion.p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: 'rgba(147,197,253,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stepLabel}
        </motion.p>

        {/* Video container */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden video-glow"
          style={{
            border: '1px solid rgba(192,132,252,0.15)',
            background: '#0a0a0a',
            aspectRatio: '16/9',
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <video
            ref={videoRef}
            src={src}
            controls
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />

          {/* Fallback overlay shown when no src loads */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 100%)',
              // Only show when video doesn't load — handled by video element itself
              display: src ? 'none' : 'flex',
            }}
          >
            <Play size={48} style={{ color: 'rgba(192,132,252,0.4)' }} />
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {src || 'Video no disponible'}
            </p>
          </div>

          {/* Corner accent */}
          <div
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(192,132,252,0.08) 0%, transparent 60%)',
            }}
          />
        </motion.div>

        {/* Buttons row */}
        <motion.div
          className="flex items-center gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 100, damping: 18 }}
        >
          {showDownload && (
            <motion.a
              href={src || '#'}
              download
              className="group flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
              }}
              whileHover={{
                scale: 1.03,
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.9)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Download size={15} />
              Descargar video
            </motion.a>
          )}

          <motion.button
            onClick={onContinue}
            className="group relative flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-medium overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(192,132,252,0.2) 0%, rgba(147,197,253,0.15) 100%)',
              border: '1px solid rgba(192,132,252,0.4)',
              color: '#c084fc',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Inner glow on hover */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              style={{ boxShadow: 'inset 0 0 20px rgba(192,132,252,0.15)' }}
            />
            <span className="relative z-10">Continuar</span>
            <ArrowRight size={15} className="relative z-10" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

