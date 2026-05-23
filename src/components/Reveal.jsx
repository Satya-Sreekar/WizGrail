import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
})

const accentVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease, delay: 0.2 } },
}

export default function Reveal({ as = 'div', children, variants = fadeUp, className, amount = 0.2, once = true, ...rest }) {
  const Comp = motion[as] || motion.div
  const isSectionHead = typeof className === 'string' && className.split(' ').includes('section__head')
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
      {isSectionHead ? (
        <motion.span className="section__accent" aria-hidden="true" variants={accentVariants} />
      ) : null}
    </Comp>
  )
}

/* Mouse-tracked spotlight wrapper for cards.
   Tracks pointer over the element and writes --mx / --my CSS vars so a
   radial-gradient overlay can follow the cursor. Falls back to a static
   subtle glow when prefers-reduced-motion is set or pointer leaves. */
export function Spotlight({ className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div className={`spotlight ${className}`} onMouseMove={onMove} {...rest}>
      {children}
    </div>
  )
}
