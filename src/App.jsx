import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import {
  Bring, Integrate, Problem, Challenge, Capabilities, About, Contact, Footer,
} from './components/Sections'
import {
  Workflows, Industries, Timeline, Security, Engagement, FAQ, Trust,
} from './components/NewSections'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <Bring />
        <Problem />
        <Challenge />
        <Integrate />
        <Timeline />
        <Capabilities />
        <Workflows />
        <Industries />
        <About />
        <Engagement />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
