import { motion } from 'motion/react'
import './App.css'

function RotatingSquare() {
  return (
    <motion.div
      className="h-[100px] w-[100px] rounded-2xl bg-indigo-500"
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    />
  )
}

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <RotatingSquare />
    </main>
  )
}

export default App
