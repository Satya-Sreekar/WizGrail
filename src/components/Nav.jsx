import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsAppIcon } from './Icons'

const links = [
  { href: '#integrate', label: 'How it works' },
  { href: '#workflows', label: 'Workflows' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const mq = window.matchMedia('(min-width: 900px)')
    const onBreak = (e) => { if (e.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onBreak)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onBreak)
    }
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__row">
        <a className="brand" href="#top" aria-label="WizGrail home">
          <span className="brand__mark" aria-hidden="true">
            <img src="/assets/logo.png" alt="" width="36" height="36" />
          </span>
          <span className="brand__name">WizGrail<span className="brand__sub">AI Enabler</span></span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a href="#contact" className="btn btn--ghost">Contact</a>
          <a
            href="https://wa.me/919951389007"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Talk to us on WhatsApp"
          >
            <WhatsAppIcon width="16" height="16" />
            Talk to us
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileMenu"
            className="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a
              href="https://wa.me/919951389007"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon width="16" height="16" />
              Talk to us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
