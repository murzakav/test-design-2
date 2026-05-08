import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { useState } from 'react'
import { Agentation } from 'agentation'
import './App.css'

const AGENTATION_ENDPOINT = import.meta.env.VITE_AGENTATION_ENDPOINT ?? 'http://localhost:4747'

const demoCards = [
  { id: 1, title: 'Hero Fade', color: '#5b8cff' },
  { id: 2, title: 'List Stagger', color: '#7c5cff' },
  { id: 3, title: 'Drag Bounce', color: '#00a6a6' },
]

function App() {
  const [selectedId, setSelectedId] = useState(1)
  const [isOpen, setIsOpen] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.28,
  })
  const progressScale = shouldReduceMotion ? scrollYProgress : springProgress

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 24,
        mass: 0.5,
      }}
      reducedMotion="user"
    >
      <>
        <main className="page">
          <motion.div className="progress-bar" style={{ scaleX: progressScale }} />

        <motion.section
          className="hero"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.5, ease: 'easeOut' }}
        >
          <h1>Motion.dev Demo Playground</h1>
          <p>Набор анимаций для быстрого ревью в Agentation workflow.</p>
        </motion.section>

        <section className="section">
          <h2>Stagger cards</h2>
          <motion.div
            className="cards"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.08,
                  delayChildren: shouldReduceMotion ? 0 : 0.04,
                },
              },
            }}
          >
            {demoCards.map((card) => (
              <motion.button
                key={card.id}
                type="button"
                className={`card ${selectedId === card.id ? 'active' : ''}`}
                aria-pressed={selectedId === card.id}
                style={{ '--card-accent': card.color }}
                onClick={() => setSelectedId(card.id)}
                variants={{
                  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {card.title}
              </motion.button>
            ))}
          </motion.div>
        </section>

        <section className="section">
          <h2>Drag + layout transition</h2>
          <motion.div
            className="drag-box"
            drag={!shouldReduceMotion}
            dragElastic={0.16}
            dragConstraints={{ top: -40, left: -40, right: 40, bottom: 40 }}
            dragTransition={{ bounceStiffness: 220, bounceDamping: 20 }}
            layout
            whileDrag={shouldReduceMotion ? undefined : { scale: 1.04, rotate: 3 }}
          >
            Drag me
          </motion.div>
        </section>

        <section className="section">
          <h2>AnimatePresence toggle</h2>
          <button type="button" className="toggle" onClick={() => setIsOpen((v) => !v)}>
            {isOpen ? 'Hide panel' : 'Show panel'}
          </button>
          <AnimatePresence initial={false} mode="wait">
            {isOpen && (
              <motion.div
                key="panel"
                className="panel"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.32, ease: 'easeInOut' }}
              >
                Agentation будет использовать этот блок как целевую область для ревью
                таймингов и плавности.
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        </main>
        <Agentation
          endpoint={AGENTATION_ENDPOINT}
          onSessionCreated={(sessionId) => {
            console.log('Session started:', sessionId)
          }}
        />
      </>
    </MotionConfig>
  )
}

export default App
