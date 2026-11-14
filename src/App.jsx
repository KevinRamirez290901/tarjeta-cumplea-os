import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginView from './components/LoginView'
import PoemView from './components/PoemView'
import VideoView from './components/VideoView'
import FinalView from './components/FinalView'

// View transition variants — fade + slide up
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const goToStep = (step) => setCurrentStep(step)

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Global subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Step content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LoginView onSuccess={() => goToStep(2)} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step-2"
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PoemView onFinish={() => goToStep(3)} />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step-3"
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <VideoView
              src="video1.mp4"
              showDownload={true}
              stepLabel="Un mensaje para ti · 1 / 2"
              onContinue={() => goToStep(4)}
            />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step-4"
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <VideoView
              src="video2.mp4"
              showDownload={false}
              stepLabel="Un mensaje para ti · 2 / 2"
              onContinue={() => goToStep(5)}
            />
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div
            key="step-5"
            className="absolute inset-0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FinalView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step indicator — subtle bottom bar */}
      {currentStep !== 2 && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="rounded-full transition-all duration-500"
              style={{
                width: step === currentStep ? 24 : 6,
                height: 6,
                background:
                  step < currentStep
                    ? 'rgba(192,132,252,0.5)'
                    : step === currentStep
                    ? 'rgba(192,132,252,0.9)'
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
