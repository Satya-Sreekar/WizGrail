import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
        >
          <HeroCarousel looping={looping} />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Hero carousel: slide 1 is the logo, then the story beats ---------- */
function LogoSlide({ looping }) {
  return (
    <motion.div
      className="logo-card hero-slide__inner"
      animate={looping ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{ duration: 6, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
    >
      <motion.div
        className="logo-card__glow"
        aria-hidden="true"
        animate={looping ? { opacity: [0.5, 0.85, 0.5] } : { opacity: 0.6 }}
        transition={{ duration: 4, repeat: looping ? Infinity : 0, ease: 'easeInOut' }}
      />
      <img
        className="logo-card__img"
        src={`${import.meta.env.BASE_URL}assets/logo.png`}
        alt="WizGrail"
        width="600"
        height="338"
      />
      <div className="logo-card__label">
        <span>AI ENABLER</span>
      </div>
    </motion.div>
  )
}

function StoryCard({ eyebrow, title, body, stat, statLabel }) {
  return (
    <div className="hero-slide__inner hero-story">
      <div className="hero-story__glow" aria-hidden="true" />
      <div className="hero-story__top">
        <span className="hero-story__eyebrow">{eyebrow}</span>
      </div>
      <div className="hero-story__mid">
        <h3 className="hero-story__title">{title}</h3>
        <p className="hero-story__body">{body}</p>
      </div>
      <div className="hero-story__foot">
        {stat ? (
          <>
            <strong>{stat}</strong>
            <span>{statLabel}</span>
          </>
        ) : (
          <span className="hero-story__hint">Swipe or use the dots to continue →</span>
        )}
      </div>
    </div>
  )
}

const heroSlides = [
  { key: 'logo' },
  { key: 'problem', eyebrow: 'The problem', title: 'Your systems work — but hard enough?', body: 'Competition is faster, customers expect more, and most of your data never reaches a decision.' },
  { key: 'challenge', eyebrow: 'The challenge', title: 'Legacy systems are valuable.', body: 'Replacing what already works is expensive, risky, and disruptive.', stat: '3–5×', statLabel: 'more cost & time vs. layering AI on top' },
  { key: 'answer', eyebrow: 'The answer', title: 'Bring AI to what already works.', body: 'A practical AI platform that integrates with your existing applications, enhancing them without altering their core.' },
]

function HeroCarousel({ looping }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()
  const touchX = useRef(0)
  const touchDX = useRef(0)
  const n = heroSlides.length

  const go = useCallback((next) => {
    setDir(next > i || (i === n - 1 && next === 0) ? 1 : -1)
    setI(((next % n) + n) % n)
  }, [i, n])

  // light autoplay on hero only
  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => go(i + 1), 5500)
    return () => clearTimeout(id)
  }, [i, reduce, go])

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 30 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -30 }),
  }

  const s = heroSlides[i]

  return (
    <div
      className="hero-carousel"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; touchDX.current = 0 }}
      onTouchMove={(e) => { touchDX.current = e.touches[0].clientX - touchX.current }}
      onTouchEnd={() => { if (Math.abs(touchDX.current) > 40) go(i + (touchDX.current < 0 ? 1 : -1)) }}
    >
      <div className="hero-slide">
        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.div
            key={s.key}
            custom={dir}
            variants={reduce ? {} : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hero-slide__motion"
          >
            {s.key === 'logo' ? <LogoSlide looping={looping} /> : <StoryCard {...s} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="hero-arrow hero-arrow--prev" aria-label="Previous slide" onClick={() => go(i - 1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button className="hero-arrow hero-arrow--next" aria-label="Next slide" onClick={() => go(i + 1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {heroSlides.map((sl, idx) => (
          <button
            key={sl.key}
            role="tab"
            aria-selected={idx === i}
            aria-label={`Slide ${idx + 1}`}
            className={`hero-dot ${idx === i ? 'is-active' : ''}`}
            onClick={() => go(idx)}
          />
        ))}
      </div>
    </div>
  )
}
