import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal, { fadeUp, stagger } from './Reveal'
import {
  LayersIcon, PlugIcon, BotIcon, RocketIcon,
  BarsIcon, FlowIcon, LinkIcon, ScaleIcon, ShieldIcon,
  ClockIcon, MailIcon, WhatsAppIcon, CheckIcon,
} from './Icons'

const ease = [0.22, 1, 0.36, 1]
const cardHover = {
  whileHover: { y: -4 },
  transition: { type: 'spring', stiffness: 350, damping: 25 },
}

export function Bring() {
  return (
    <section className="section" id="bring">
      <div className="container bring-grid">
        <div className="bring__copy">
          <Reveal as="h2" className="h2">Bring AI to what already works.</Reveal>
          <Reveal as="p" className="lede">
            We provide a powerful AI platform that integrates directly with your existing applications, enhancing them without altering their core.
          </Reveal>
        </div>
        <Reveal className="stack-diagram-wrap">
          <div className="stack-diagram">
            <div className="stack-diagram__glow" aria-hidden="true" />
            <div className="stack-row stack-row--ai">
              <span className="stack-row__chip" aria-hidden="true">AI</span>
              <div className="stack-row__text">
                <strong>WizGrail AI layer</strong>
                <span>Insights · Automation · Integrations</span>
              </div>
              <span className="pulse" aria-hidden="true" />
            </div>
            <div className="stack-arrow" aria-hidden="true"><span /><span /><span /></div>
            <div className="stack-rows">
              <div className="stack-row stack-row--app">
                <div className="stack-row__icon">CRM</div>
                <div className="stack-row__text"><strong>Customer system</strong><span>Sales · pipeline · accounts</span></div>
              </div>
              <div className="stack-row stack-row--app">
                <div className="stack-row__icon">ERP</div>
                <div className="stack-row__text"><strong>Operations system</strong><span>Inventory · orders · finance</span></div>
              </div>
              <div className="stack-row stack-row--app">
                <div className="stack-row__icon">DMS</div>
                <div className="stack-row__text"><strong>Document store</strong><span>Contracts · reports · forms</span></div>
              </div>
            </div>
            <div className="stack-foot">Your existing stack — untouched</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const steps = [
  { Icon: LayersIcon, title: 'Layer AI', body: 'Add an intelligence layer on top of your current stack.' },
  { Icon: PlugIcon, title: 'Connect Legacy', body: 'Securely link existing systems and data so they work together.' },
  { Icon: BotIcon, title: 'Enable Automation', body: 'Automate repetitive workflows across departments.' },
  { Icon: RocketIcon, title: 'Rapid Deploy', body: 'Roll out in phases with monitoring and ongoing support.' },
]

export function Integrate() {
  return (
    <section className="section section--alt" id="integrate">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">How we integrate</h2>
          <p className="sub">A four-step path to add AI to your operations without rebuilding your technology stack.</p>
        </Reveal>

        <motion.ol
          className="steps"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {steps.map(({ Icon, title, body }, i) => (
            <motion.li
              key={title}
              className="step"
              variants={fadeUp}
              {...cardHover}
            >
              <motion.div
                className="step__icon"
                initial={{ rotate: -8, scale: 0.8 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              >
                <Icon />
              </motion.div>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

const problems = [
  { title: 'Faster competition', body: 'Competitors are automating at speed and shortening the gap on response times, pricing, and service.' },
  { title: 'Smarter expectations', body: 'Customers now expect quick, personalised, intelligent experiences as a baseline, not a bonus.' },
  { title: 'Underused data', body: 'The data you already collect is growing, but most of it sits in silos and rarely informs a decision.' },
]

export function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">The problem we solve</h2>
          <p className="sub">Your systems work. The question is whether they are working hard enough for the business you run today.</p>
        </Reveal>

        <motion.div
          className="cards-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {problems.map((p) => (
            <motion.article key={p.title} className="card" variants={fadeUp} {...cardHover}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Challenge() {
  return (
    <section className="section section--dark" id="challenge">
      <div className="container challenge-grid">
        <div className="challenge__copy">
          <Reveal as="h2" className="h2 h2--light">Legacy systems are valuable.</Reveal>
          <Reveal as="p" className="lede lede--light">
            SMEs rely on applications that were built, refined, and trusted over years. Replacing them is expensive, risky, and disruptive.
          </Reveal>
          <Reveal as="blockquote" className="quote">
            How do you adopt AI without breaking what already works?
          </Reveal>
        </div>
        <Reveal className="challenge__counters">
          <div className="ccount"><strong>78%</strong><span>of SMEs report core workflows still run on systems older than five years</span></div>
          <div className="ccount"><strong>3–5×</strong><span>more cost and time to replace a core system than to layer AI on top of it</span></div>
          <div className="ccount"><strong>4–8 wks</strong><span>typical pilot to deliver a measurable result</span></div>
        </Reveal>
      </div>
    </section>
  )
}

const caps = [
  { Icon: LinkIcon, title: 'AI Integration', body: 'Plug intelligence into the applications you already run — no rip-and-replace, no migration.' },
  { Icon: FlowIcon, title: 'Process Automation', body: 'Automate repetitive workflows across sales, finance, support, and operations.' },
  { Icon: BarsIcon, title: 'Data Analytics', body: 'Predictive analytics and real-time dashboards built on the data you already have.' },
  { Icon: BotIcon, title: 'Smart Workflows', body: 'AI-augmented workflows that route, decide, and act across your stack.' },
]

export function Capabilities() {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <Reveal as="header" className="section__head">
          <span className="tag">Solutions</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Four ways WizGrail powers your business.</h2>
          <p className="sub">A focused suite that drops into your existing stack and starts paying back in weeks, not quarters.</p>
        </Reveal>

        <motion.div
          className="cap-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.08)}
        >
          {caps.map(({ Icon, title, body }) => (
            <motion.article key={title} className="cap" variants={fadeUp} {...cardHover}>
              <div className="cap__icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const disciplines = [
  { title: 'Software development', body: 'Decades of shipping production systems at scale.' },
  { title: 'Marketing & growth', body: 'Turning capability into revenue and momentum.' },
  { title: 'Enterprise services', body: 'Embedded with operations, not just IT.' },
  { title: 'Business administration', body: 'An understanding of the realities SMEs face daily.' },
]

export function About() {
  return (
    <section className="section section--alt" id="why-wizgrail">
      <div className="container">
        <Reveal as="header" className="section__head">
          <span className="tag">Why WizGrail</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Operators, not consultants.</h2>
          <p className="sub">
            WizGrail was founded by people who have built, scaled, and run organisations. Each founder brings 30+ years of experience and works directly with you during pilots — you're not handed off to a junior team after kickoff.
          </p>
        </Reveal>

        <motion.div
          className="discipline-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.08)}
        >
          {disciplines.map((d) => (
            <motion.div key={d.title} className="disc" variants={fadeUp} {...cardHover}>
              <h4>{d.title}</h4>
              <p>{d.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="about-note">
          <p>
            <strong>Founder profiles and team page</strong> — published shortly. Want to meet the team before then? <a href="#contact">Book a 30-minute discovery call</a> and we will introduce ourselves directly.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const missionPoints = [
  { Icon: BotIcon, text: 'Reduce manual and repetitive work through automation' },
  { Icon: BarsIcon, text: 'Improve operational efficiency and productivity' },
  { Icon: RocketIcon, text: 'Enable lightning-fast and data-driven decision-making' },
  { Icon: FlowIcon, text: 'Deliver predictive analytics and actionable business insights' },
  { Icon: LinkIcon, text: 'Seamlessly integrate with existing enterprise systems' },
  { Icon: ScaleIcon, text: 'Drive sustainable growth through innovation and intelligence' },
]

const aboutStats = [
  { value: '30+', label: 'Years of combined IT leadership' },
  { value: '100%', label: 'Integration-first, no rip-and-replace' },
  { value: '4–8 wks', label: 'From pilot to measurable result' },
]

const pillars = [
  { Icon: LinkIcon, title: 'Seamless integration', body: 'AI that augments your existing applications without disrupting how your business runs today.' },
  { Icon: ShieldIcon, title: 'Secure & enterprise-ready', body: 'Built for mission-critical environments with security, governance, and reliability at the core.' },
  { Icon: ScaleIcon, title: 'Scalable by design', body: 'Start with one workflow, expand across teams and functions as confidence and value grow.' },
  { Icon: BarsIcon, title: 'Measurable impact', body: 'Every deployment is tied to outcomes — productivity, decisions, and ROI you can track.' },
]

export function FinalCTA() {
  return (
    <section className="section final-cta-section">
      <div className="container">
        <Reveal className="final-cta">
          <div className="final-cta__glow" aria-hidden="true" />
          <div className="final-cta__copy">
            <h2 className="h2 h2--light" style={{ margin: 0 }}>Accelerate your AI advantage.</h2>
            <p className="lede lede--light" style={{ margin: '8px 0 0', maxWidth: '52ch' }}>
              A 30-minute call, a 4–8 week pilot, measurable impact on your existing stack.
            </p>
          </div>
          <motion.a
            href="https://wa.me/919951389007"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Talk to an expert →
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}

export function AboutTeaser() {
  return (
    <section className="section about-teaser-section">
      <div className="container">
        <Reveal className="about-teaser">
          <div className="about-teaser__glow" aria-hidden="true" />
          <div className="about-teaser__copy">
            <span className="tag tag--light">About WizGrail</span>
            <h2 className="h2 h2--light" style={{ marginTop: 12 }}>
              30+ years of enterprise IT, focused on practical AI.
            </h2>
            <p className="lede lede--light">
              We build AI platforms that integrate with the systems you already run — no rip-and-replace, just measurable impact.
            </p>
          </div>
          <motion.a
            href="#/about-us"
            className="btn btn--primary btn--lg"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Learn more about us →
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}

function AboutHero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yB = useTransform(scrollYProgress, [0, 1], [0, 80])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const titleWords = 'Building intelligent AI platforms that work with what already works.'.split(' ')

  return (
    <section className="about-hero" id="about-us" ref={ref}>
      <div className="about-hero__aurora" aria-hidden="true">
        <motion.div
          className="about-hero__blob about-hero__blob--a"
          style={reduce ? undefined : { y: yA }}
          animate={reduce ? undefined : { x: [0, 40, -20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="about-hero__blob about-hero__blob--b"
          style={reduce ? undefined : { y: yB }}
          animate={reduce ? undefined : { x: [0, -30, 20, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="about-hero__grid-bg" style={reduce ? undefined : { y: gridY }} />
      </div>

      <div className="container">
        <motion.div className="about-hero__copy" style={reduce ? undefined : { opacity: titleOpacity }}>
          <motion.span
            className="tag tag--light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            About WizGrail
          </motion.span>
          <h1 className="display about-hero__title" aria-label={titleWords.join(' ')}>
            {titleWords.map((w, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="about-hero__word"
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.05 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="lede lede--light"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            A next-generation AI technology company combining 30+ years of enterprise IT expertise with cutting-edge innovation — to deliver scalable, future-ready AI ecosystems that accelerate transformation without disruption.
          </motion.p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.12)}
        >
          {aboutStats.map((s) => (
            <motion.div
              key={s.label}
              className="about-stat"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.strong
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                {s.value}
              </motion.strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function AboutUsPage() {
  return (
    <>
      {/* Hero banner */}
      <AboutHero />

      {/* Story */}
      <section className="section">
        <div className="container narrow narrow--center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.12)}>
            <motion.span className="tag" variants={fadeUp}>Our story</motion.span>
            <motion.h2 className="h2" style={{ marginTop: 12 }} variants={fadeUp}>
              Practical AI, built by operators who have shipped at scale.
            </motion.h2>
            <motion.p className="lede" variants={fadeUp}>
              We are a next-generation AI technology company focused on delivering state-of-the-art Artificial Intelligence platforms that transform the way businesses operate. Led by a team of highly experienced professionals with over 30 years of expertise in delivering IT solutions and services, we combine deep industry knowledge with cutting-edge innovation to build intelligent, scalable, and future-ready AI ecosystems.
            </motion.p>
            <motion.p className="sub" variants={fadeUp}>
              Our strength lies in developing AI platforms that seamlessly integrate with existing enterprise applications and workflows without disrupting ongoing operations. We understand that businesses need practical AI solutions that enhance performance while preserving operational continuity. That is why our platforms are designed for rapid adoption, scalability, security, and measurable business impact.
            </motion.p>
            <motion.p className="sub" variants={fadeUp}>
              By leveraging advanced AI, machine learning, predictive analytics, and intelligent automation, we help organizations unlock new levels of productivity, efficiency, and strategic decision-making.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section section--alt">
        <div className="container">
          <Reveal as="header" className="section__head">
            <span className="tag">What sets us apart</span>
            <h2 className="h2" style={{ marginTop: 12 }}>Four principles behind every platform we build.</h2>
          </Reveal>
          <motion.div
            className="cap-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.08)}
          >
            {pillars.map(({ Icon, title, body }, i) => (
              <motion.article
                key={title}
                className="cap pillar"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                <motion.div
                  className="cap__icon"
                  initial={{ rotate: -10, scale: 0.7 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 + i * 0.06 }}
                  whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
                >
                  <Icon />
                </motion.div>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision + Mission split */}
      <section className="section">
        <div className="container">
          <div className="vm-grid">
            <motion.div
              className="vm-card vm-card--vision"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="vm-card__icon"
                initial={{ scale: 0.5, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <RocketIcon />
              </motion.div>
              <span className="tag">Vision</span>
              <h3 className="vm-card__h">A global leader in AI innovation.</h3>
              <p>
                To become a global leader in AI innovation by delivering highly effective and intelligent AI platforms that seamlessly integrate with existing business applications, enabling organizations to accelerate digital transformation without disruption.
              </p>
            </motion.div>

            <motion.div
              className="vm-card vm-card--mission"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="vm-card__icon"
                initial={{ scale: 0.5, rotate: 20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                <BotIcon />
              </motion.div>
              <span className="tag">Mission</span>
              <h3 className="vm-card__h">Empower businesses with intelligent AI platforms.</h3>
              <motion.ul
                className="vm-list vm-list--icons"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger(0.06)}
              >
                {missionPoints.map(({ text }) => (
                  <motion.li key={text} variants={fadeUp} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                    <motion.span
                      className="vm-list__icon"
                      aria-hidden="true"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.1 }}
                    >
                      <CheckIcon />
                    </motion.span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <p className="vm-card__close">
                We are committed to helping organizations harness the full potential of Artificial Intelligence to create smarter, faster, and more agile businesses for the future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal className="cta__card about-cta">
            <h2 className="h2">Let's build your AI advantage.</h2>
            <p className="sub">Talk to our team about a 4–8 week pilot tailored to your existing systems.</p>
            <div className="cta__buttons" style={{ marginTop: 22 }}>
              <motion.a
                href="https://wa.me/919951389007"
                className="btn btn--primary btn--lg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                <WhatsAppIcon width="16" height="16" />
                Book a discovery call
              </motion.a>
              <a href="#/" className="btn btn--ghost btn--lg">Back to home</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export function Contact() {
  return (
    <section className="section cta" id="contact">
      <div className="container">
        <Reveal className="cta__card">
          <h2 className="h2">Ready to AI-power your business?</h2>
          <p className="sub">Every client has unique needs. Reach out and we will get back to you soon.</p>

          <motion.div
            className="contact-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1)}
          >
            <motion.div className="contact-card contact-card--static" variants={fadeUp}>
              <div className="contact-card__icon" aria-hidden="true"><WhatsAppIcon /></div>
              <div>
                <h3>WhatsApp / Phone</h3>
                <p><a className="bare" href="tel:+919951389007">+91 99513 89007</a></p>
                <a className="bare bare--accent" href="https://wa.me/919951389007" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>
              </div>
            </motion.div>

            <motion.div className="contact-card contact-card--static" variants={fadeUp}>
              <div className="contact-card__icon" aria-hidden="true"><ClockIcon /></div>
              <div>
                <h3>Hours</h3>
                <p>Mon–Fri</p>
                <strong>09:00 – 17:00</strong>
              </div>
            </motion.div>

            <motion.a
              href="mailto:hello@wizgrail.com"
              className="contact-card"
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <div className="contact-card__icon" aria-hidden="true"><MailIcon /></div>
              <div>
                <h3>Email</h3>
                <p>Send us a note</p>
                <strong>hello@wizgrail.com</strong>
              </div>
            </motion.a>
          </motion.div>

          <div className="cta__buttons">
            <motion.a
              href="https://wa.me/919951389007"
              className="btn btn--primary btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <WhatsAppIcon width="16" height="16" />
              Contact us on WhatsApp
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const yr = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand brand--footer" href="#/">
              <span className="brand__mark"><img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" width="36" height="36" /></span>
              <span className="brand__name">WizGrail<span className="brand__sub">AI Enabler</span></span>
            </a>
            <p>AI that integrates with the systems your business already runs. No rip-and-replace, no migration, no platform lock-in.</p>
            <a className="btn btn--primary" href="https://wa.me/919951389007" target="_blank" rel="noopener noreferrer">
              Book a discovery call
            </a>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h5>Solutions</h5>
              <a href="#solutions">AI Integration</a>
              <a href="#solutions">Process Automation</a>
              <a href="#solutions">Data Analytics</a>
              <a href="#solutions">Smart Workflows</a>
            </div>
            <div className="footer__col">
              <h5>Company</h5>
              <a href="#/about-us">About Us</a>
              <a href="#why-wizgrail">Why WizGrail</a>
              <a href="#contact">Contact</a>
              <a href="#trust">Privacy & Security</a>
            </div>
            <div className="footer__col">
              <h5>Get in touch</h5>
              <a href="tel:+919951389007">+91 99513 89007</a>
              <a href="https://wa.me/919951389007" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:hello@wizgrail.com">hello@wizgrail.com</a>
              <span className="footer__hours">Mon–Fri · IST · 1-day reply</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {yr} WizGrail. All Rights Reserved.</span>
          <span className="footer__compliance">AI Enablement for the Modern SME · SOC 2 / ISO 27001 / DPDP / GDPR controls in place.</span>
        </div>
      </div>
    </footer>
  )
}
