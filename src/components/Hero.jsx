import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function MagBtn({ children, className = '', href, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 18)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 18)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { amount: 0.05 })
  const looping = !reduce && heroInView

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const pxA = useSpring(mx, { stiffness: 60, damping: 20 })
  const pyA = useSpring(my, { stiffness: 60, damping: 20 })
  const pxB = useSpring(mx, { stiffness: 40, damping: 22 })
  const pyB = useSpring(my, { stiffness: 40, damping: 22 })

  const onMouseMove = (e) => {
    if (reduce) return
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 40)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 40)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <section className="hero" id="top" ref={heroRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="hero__aurora" aria-hidden="true">
        <motion.div
          className="hero__blob hero__blob--a"
          style={{ x: pxA, y: pyA }}
          animate={looping ? { scale: [1, 1.08, 0.96, 1] } : { scale: 1 }}
          transition={{ duration: 18, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__blob hero__blob--b"
          style={{ x: pxB, y: pyB }}
          animate={looping ? { scale: [1, 0.94, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 22, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
        />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.h1
            className="display"
            aria-label="Cutting-edge AI for the modern SME."
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {['Cutting-edge', 'AI', 'for', 'the', 'modern', 'SME.'].map((word, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                style={{ display: 'inline-block', marginRight: word === 'SME.' ? 0 : '0.28em' }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            Empowering SME businesses with cutting-edge AI — without disrupting what already works.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.7 }}
          >
            <MagBtn href="#contact" className="btn btn--primary btn--lg btn--shine">
              Talk to us
            </MagBtn>
            <motion.a
              href="#integrate"
              className="btn btn--ghost btn--lg"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              How it works
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="hero__art"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
        >
          <motion.div
            className="logo-card"
            animate={looping ? { y: [0, -8, 0] } : { y: 0 }}
            transition={{ duration: 6, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
          >
            <motion.div
              className="logo-card__glow"
              aria-hidden="true"
              animate={looping ? { opacity: [0.5, 0.85, 0.5] } : { opacity: 0.6 }}
              transition={{ duration: 4, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
            />
            <motion.img
              className="logo-card__img"
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt=""
              width="600"
              height="338"
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
            />
            <motion.div
              className="logo-card__label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.85 }}
            >
              <span>AI ENABLER</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
