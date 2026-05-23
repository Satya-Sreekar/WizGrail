import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import {
  Integrate, Capabilities, About, AboutTeaser, AboutUsPage, Contact, FinalCTA, Footer,
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

const SPOTLIGHT_SELECTOR = '.workflow, .security, .trust, .engage, .contact-card, .ind-panel'

function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    let raf = 0
    let pending = null
    const flush = () => {
      raf = 0
      if (!pending) return
      const { el, x, y } = pending
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
      pending = null
    }
    const onMove = (e) => {
      const el = e.target.closest && e.target.closest(SPOTLIGHT_SELECTOR)
      if (!el) return
      const r = el.getBoundingClientRect()
      pending = { el, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
      if (!raf) raf = requestAnimationFrame(flush)
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })
  const route = useRoute()
  useSpotlight()

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
              <FinalCTA />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
