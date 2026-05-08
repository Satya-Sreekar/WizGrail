import { motion } from 'framer-motion'
import Reveal, { fadeUp, stagger } from './Reveal'
import {
  LayersIcon, PlugIcon, BotIcon, RocketIcon,
  BarsIcon, FlowIcon, LinkIcon, ScaleIcon, ShieldIcon,
  ClockIcon, MailIcon, WhatsAppIcon,
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
          <div className="ccount"><strong>3–5×</strong><span>typical multiplier on a full replacement vs. layering AI on top</span></div>
          <div className="ccount"><strong>4–8 wks</strong><span>typical pilot to deliver a measurable result</span></div>
        </Reveal>
      </div>
    </section>
  )
}

const caps = [
  { Icon: BarsIcon, title: 'AI-driven insights', body: 'Predictive analytics and real-time dashboards built on the data you already have.' },
  { Icon: FlowIcon, title: 'Process automation', body: 'Automate repetitive workflows across sales, finance, support, and operations.' },
  { Icon: LinkIcon, title: 'Smart integrations', body: 'Connect AI to current applications without complex migrations or rewrites.' },
  { Icon: ScaleIcon, title: 'Scalable architecture', body: 'Start with one workflow and expand as confidence and value grow.' },
  { Icon: ShieldIcon, title: 'Secure & reliable', body: 'Enterprise-grade security suitable for mission-critical environments.' },
]

export function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">Capabilities</h2>
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
    <section className="section section--alt" id="about">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">The team you're hiring</h2>
          <p className="sub">
            WizGrail was founded by operators who have built, scaled, and run organisations. Each founder brings 30+ years of experience and works directly with you during pilots — you're not handed off to a junior team after the kickoff.
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
  'Reduce manual and repetitive work through automation',
  'Improve operational efficiency and productivity',
  'Enable lightning-fast and data-driven decision-making',
  'Deliver predictive analytics and actionable business insights',
  'Seamlessly integrate with existing enterprise systems',
  'Drive sustainable growth through innovation and intelligence',
]

export function AboutUs() {
  return (
    <section className="section" id="about-us">
      <div className="container">
        <Reveal as="header" className="section__head">
          <span className="tag">About Us</span>
          <h2 className="h2" style={{ marginTop: 12 }}>A next-generation AI technology company</h2>
        </Reveal>

        <Reveal as="p" className="lede">
          We are a next-generation AI technology company focused on delivering state-of-the-art Artificial Intelligence platforms that transform the way businesses operate. Led by a team of highly experienced professionals with over 30 years of expertise in delivering IT solutions and services, we combine deep industry knowledge with cutting-edge innovation to build intelligent, scalable, and future-ready AI ecosystems.
        </Reveal>
        <Reveal as="p" className="sub">
          Our strength lies in developing AI platforms that seamlessly integrate with existing enterprise applications and workflows without disrupting ongoing operations. We understand that businesses need practical AI solutions that enhance performance while preserving operational continuity. That is why our platforms are designed for rapid adoption, scalability, security, and measurable business impact.
        </Reveal>
        <Reveal as="p" className="sub">
          By leveraging advanced AI, machine learning, predictive analytics, and intelligent automation, we help organizations unlock new levels of productivity, efficiency, and strategic decision-making.
        </Reveal>

        <div className="vm-grid">
          <Reveal className="vm-card">
            <span className="tag">Vision</span>
            <p>
              To become a global leader in AI innovation by delivering highly effective and intelligent AI platforms that seamlessly integrate with existing business applications, enabling organizations to accelerate digital transformation without disruption.
            </p>
          </Reveal>
          <Reveal className="vm-card">
            <span className="tag">Mission</span>
            <p>Our mission is to empower businesses with intelligent AI platforms that:</p>
            <ul className="vm-list">
              {missionPoints.map((m) => <li key={m}>{m}</li>)}
            </ul>
            <p>
              We are committed to helping organizations harness the full potential of Artificial Intelligence to create smarter, faster, and more agile businesses for the future.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
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
            <a className="brand brand--footer" href="#top">
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
              <h5>Product</h5>
              <a href="#integrate">How it works</a>
              <a href="#workflows">Workflows</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
            </div>
            <div className="footer__col">
              <h5>Company</h5>
              <a href="#about-us">About Us</a>
              <a href="#about">Team</a>
              <a href="#engagement">How we engage</a>
              <a href="#trust">Security</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer__col">
              <h5>Contact</h5>
              <a href="tel:+919951389007">+91 99513 89007</a>
              <a href="https://wa.me/919951389007" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:hello@wizgrail.com">hello@wizgrail.com</a>
              <span className="footer__hours">Mon–Fri · IST · 1-day reply</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {yr} WizGrail. All rights reserved.</span>
          <span className="footer__compliance">SOC 2 / ISO 27001 / DPDP / GDPR — controls in place; formal certifications in progress.</span>
        </div>
      </div>
    </footer>
  )
}
