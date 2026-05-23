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

const artEase = [0.22, 1, 0.36, 1]
const artContainerV = {
  enter: { opacity: 1 },
  center: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
  exit: { opacity: 1, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}
const artItemV = {
  enter: { opacity: 0, y: 10, scale: 0.88 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: artEase } },
  exit: { opacity: 0, y: 6, scale: 0.94, transition: { duration: 0.22, ease: artEase } },
}
const artItemAccent = {
  enter: { opacity: 0, scale: 0 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1], delay: 0.05 } },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.18 } },
}

function HeroSlideArt({ kind }) {
  const reduce = useReducedMotion()
  const containerV = reduce ? {} : artContainerV
  const itemV = reduce ? {} : artItemV
  const accentV = reduce ? {} : artItemAccent
  const stroke = 'rgba(212,197,255,.75)'
  const dim = 'rgba(212,197,255,.35)'
  const sparkle = (cx, cy, r = 2.2, opacity = 1) => (
    <path
      d={`M${cx} ${cy - r * 2}l${r * 0.6} ${r * 1.4}L${cx + r * 2} ${cy}l${-r * 1.4} ${r * 0.6}L${cx} ${cy + r * 2}l${-r * 0.6} ${-r * 1.4}L${cx - r * 2} ${cy}l${r * 1.4} ${-r * 0.6}z`}
      fill="#fbbf24"
      opacity={opacity}
    />
  )

  if (kind === 'problem') {
    // 3 data silos in a row, with tiny floating data dots above
    return (
      <motion.svg
        className="hero-story__art"
        viewBox="0 0 130 80"
        fill="none"
        aria-hidden="true"
        variants={containerV}
      >
        <defs>
          <linearGradient id="hsa-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity=".22" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity=".04" />
          </linearGradient>
        </defs>
        {/* tiny floating data dots (representing unused/scattered data) */}
        <motion.g variants={itemV} style={{ transformOrigin: '65px 10px' }} fill="#d4c5ff">
          <circle cx="18" cy="10" r="1.2" opacity=".55" />
          <circle cx="34" cy="6" r="1" opacity=".4" />
          <circle cx="56" cy="12" r="1.2" opacity=".5" />
          <circle cx="74" cy="8" r="1" opacity=".4" />
          <circle cx="96" cy="14" r="1.2" opacity=".55" />
          <circle cx="114" cy="9" r="1" opacity=".4" />
        </motion.g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${10 + i * 38} 28)`}>
            <motion.g variants={itemV} style={{ transformOrigin: '14px 25px' }}>
              <ellipse cx="14" cy="5" rx="14" ry="4" fill="url(#hsa-p)" stroke={stroke} strokeWidth=".9" />
              <path d="M0 5v36c0 2.2 6 4 14 4s14-1.8 14-4V5" fill="url(#hsa-p)" stroke={stroke} strokeWidth=".9" />
              <path d="M0 18c0 2.2 6 4 14 4s14-1.8 14-4" stroke={dim} strokeWidth=".8" />
              <path d="M0 30c0 2.2 6 4 14 4s14-1.8 14-4" stroke={dim} strokeWidth=".8" />
            </motion.g>
          </g>
        ))}
        {/* single subtle amber spark above the middle silo */}
        <motion.g variants={accentV} style={{ transformOrigin: '65px 4px' }}>
          {sparkle(65, 4, 2, 0.75)}
        </motion.g>
      </motion.svg>
    )
  }

  if (kind === 'challenge') {
    // Clean stacked legacy layers with a small outlined lock floating above
    return (
      <motion.svg
        className="hero-story__art"
        viewBox="0 0 130 90"
        fill="none"
        aria-hidden="true"
        variants={containerV}
      >
        <defs>
          <linearGradient id="hsa-c" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity=".22" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity=".04" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${10 + i * 4} ${66 - i * 18})`}>
            <motion.g variants={itemV} style={{ transformOrigin: '46px 8px' }}>
              <rect width="92" height="16" rx="4" fill="url(#hsa-c)" stroke={stroke} strokeWidth=".9" />
              <circle cx="9" cy="8" r="2" fill="#d4c5ff" opacity=".75" />
              <rect x="17" y="5" width="34" height="2.4" rx="1.2" fill="#d4c5ff" opacity=".45" />
              <rect x="17" y="9.6" width="54" height="2.4" rx="1.2" fill="#d4c5ff" opacity=".22" />
            </motion.g>
          </g>
        ))}
        {/* small outlined lock — refined, no solid fill */}
        <motion.g
          variants={accentV}
          style={{ transformOrigin: '107px 19px' }}
          transform="translate(96 8)"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".9"
        >
          <rect x="2" y="9" width="18" height="14" rx="2.5" />
          <path d="M5.5 9V5.5a5.5 5.5 0 0 1 11 0V9" />
          <circle cx="11" cy="16" r="1.5" fill="#fbbf24" />
        </motion.g>
      </motion.svg>
    )
  }

  if (kind === 'answer') {
    // AI layer sitting on top of an existing stack — outlined "AI" chip, not loud
    return (
      <motion.svg
        className="hero-story__art"
        viewBox="0 0 130 80"
        fill="none"
        aria-hidden="true"
        variants={containerV}
      >
        <defs>
          <linearGradient id="hsa-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity=".22" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity=".04" />
          </linearGradient>
          <linearGradient id="hsa-ai" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity=".18" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity=".08" />
          </linearGradient>
        </defs>
        {/* existing stack — 3 layers (entry order: stack first) */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(14 ${44 + i * 11})`}>
            <motion.g variants={itemV} style={{ transformOrigin: '51px 5px' }}>
              <rect width="102" height="9" rx="3" fill="url(#hsa-a)" stroke={stroke} strokeWidth=".8" />
              <rect x="7" y="3.5" width="22" height="2" rx="1" fill="#d4c5ff" opacity=".45" />
              <rect x="33" y="3.5" width="46" height="2" rx="1" fill="#d4c5ff" opacity=".22" />
            </motion.g>
          </g>
        ))}
        {/* connector down (appears after stack) */}
        <motion.g
          variants={itemV}
          style={{ transformOrigin: '65px 33px' }}
          transform="translate(65 28)"
          stroke={stroke}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M0 0v10" />
          <path d="M-3 7l3 3 3-3" />
        </motion.g>
        {/* AI layer — drops in last */}
        <motion.g
          variants={accentV}
          style={{ transformOrigin: '65px 15px' }}
          transform="translate(14 6)"
        >
          <rect width="102" height="18" rx="9" fill="url(#hsa-ai)" stroke="#fbbf24" strokeWidth="1" opacity=".95" />
          <text x="51" y="12.5" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#fbbf24" letterSpacing="2.5">AI LAYER</text>
        </motion.g>
        <motion.g variants={accentV} style={{ transformOrigin: '118px 6px' }}>
          {sparkle(118, 6, 1.8, 0.8)}
        </motion.g>
      </motion.svg>
    )
  }
  return null
}

function StoryCard({ eyebrow, title, body, stat, statLabel, art }) {
  return (
    <div className="hero-slide__inner hero-story">
      <div className="hero-story__glow" aria-hidden="true" />
      {art ? <HeroSlideArt kind={art} /> : null}
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
  { key: 'problem', art: 'problem', eyebrow: 'The problem', title: 'Your systems work — but hard enough?', body: 'Competition is faster, customers expect more, and most of your data never reaches a decision.' },
  { key: 'challenge', art: 'challenge', eyebrow: 'The challenge', title: 'Legacy systems are valuable.', body: 'Replacing what already works is expensive, risky, and disruptive.', stat: '3–5×', statLabel: 'more cost & time vs. layering AI on top' },
  { key: 'answer', art: 'answer', eyebrow: 'The answer', title: 'Bring AI to what already works.', body: 'A practical AI platform that integrates with your existing applications, enhancing them without altering their core.' },
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
    const id = setTimeout(() => go(i + 1), i === 0 ? 1500 : 5500)
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
