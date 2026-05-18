import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import {
  Integrate, Capabilities, About, AboutTeaser, AboutUsPage, Contact, Footer,
} from './components/Sections'
import {
  Workflows, Industries, Timeline, Engagement, FAQ, Trust,
} from './components/NewSections'

const pageEase = [0.22, 1, 0.36, 1]
const pageVariants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: pageEase } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: pageEase } },
}

function useRoute() {
  const get = () => (typeof window !== 'undefined' && window.location.hash.startsWith('#/about-us')) ? 'about' : 'home'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const onHash = () => {
      const next = get()
      setRoute(next)
      if (next === 'about' || window.location.hash === '' || window.location.hash === '#/') {
        window.scrollTo({ top: 0 })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })
  const route = useRoute()

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          {route === 'about' ? (
            <motion.div key="about" variants={pageVariants} initial="initial" animate="enter" exit="exit">
              <AboutUsPage />
            </motion.div>
          ) : (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="enter" exit="exit">
              <Hero />
              <Capabilities />
              <Workflows />
              <Integrate />
              <Timeline />
              <About />
              <AboutTeaser />
              <Industries />
              <Engagement />
              <Trust />
              <FAQ />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
