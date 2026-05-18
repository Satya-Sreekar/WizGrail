import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import Reveal, { fadeUp, stagger } from './Reveal'

const ease = [0.22, 1, 0.36, 1]
const cardHover = { whileHover: { y: -4 }, transition: { type: 'spring', stiffness: 350, damping: 25 } }

/* ---------- Story carousel (Problem → Challenge → Bring) ---------- */
const storySlides = [
  {
    key: 'problem',
    eyebrow: 'The problem',
    title: 'Your systems work — but are they working hard enough?',
    body: 'Competition is faster, customers expect more, and the data you already collect mostly sits in silos. The bar has moved.',
    points: [
      { h: 'Faster competition', p: 'Competitors are automating at speed and shortening the gap on response, pricing, and service.' },
      { h: 'Smarter expectations', p: 'Customers now expect quick, personalised, intelligent experiences as a baseline.' },
      { h: 'Underused data', p: 'The data you collect is growing, but most of it rarely informs a decision.' },
    ],
    tone: 'light',
  },
  {
    key: 'challenge',
    eyebrow: 'The challenge',
    title: 'Legacy systems are valuable.',
    body: 'SMEs rely on applications that were built, refined, and trusted over years. Replacing them is expensive, risky, and disruptive.',
    quote: 'How do you adopt AI without breaking what already works?',
    stats: [
      { v: '78%', l: 'of SMEs report core workflows still run on systems older than five years' },
      { v: '3–5×', l: 'more cost and time to replace a core system than to layer AI on top of it' },
      { v: '4–8 wks', l: 'typical pilot to deliver a measurable result' },
    ],
    tone: 'dark',
  },
  {
    key: 'bring',
    eyebrow: 'The answer',
    title: 'Bring AI to what already works.',
    body: 'A powerful AI platform that integrates directly with your existing applications, enhancing them without altering their core.',
    diagram: true,
    tone: 'light',
  },
]

function SlideProblem({ s }) {
  return (
    <div className="story-slide story-slide--light">
      <span className="tag">{s.eyebrow}</span>
      <h2 className="h2" style={{ marginTop: 12 }}>{s.title}</h2>
      <p className="lede">{s.body}</p>
      <div className="story-points">
        {s.points.map((p) => (
          <div key={p.h} className="story-point">
            <h4>{p.h}</h4>
            <p>{p.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideChallenge({ s }) {
  return (
    <div className="story-slide story-slide--dark">
      <span className="tag tag--light">{s.eyebrow}</span>
      <h2 className="h2 h2--light" style={{ marginTop: 12 }}>{s.title}</h2>
      <p className="lede lede--light">{s.body}</p>
      <blockquote className="quote">{s.quote}</blockquote>
      <div className="story-stats">
        {s.stats.map((st) => (
          <div key={st.l} className="ccount"><strong>{st.v}</strong><span>{st.l}</span></div>
        ))}
      </div>
    </div>
  )
}

function SlideBring({ s }) {
  return (
    <div className="story-slide story-slide--light story-slide--bring">
      <div>
        <span className="tag">{s.eyebrow}</span>
        <h2 className="h2" style={{ marginTop: 12 }}>{s.title}</h2>
        <p className="lede">{s.body}</p>
      </div>
      <div className="stack-diagram-wrap">
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
      </div>
    </div>
  )
}

const slideRenderers = { problem: SlideProblem, challenge: SlideChallenge, bring: SlideBring }

export function StoryCarousel() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()
  const touchX = useRef(0)
  const touchDX = useRef(0)
  const n = storySlides.length

  const go = useCallback((next) => {
    setDir(next > i || (i === n - 1 && next === 0) ? 1 : -1)
    setI(((next % n) + n) % n)
  }, [i, n])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [i, go])

  const slide = storySlides[i]
  const Renderer = slideRenderers[slide.key]

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <section className="section" id="story">
      <div className="container">
        <div
          className="story-carousel"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; touchDX.current = 0 }}
          onTouchMove={(e) => { touchDX.current = e.touches[0].clientX - touchX.current }}
          onTouchEnd={() => {
            if (Math.abs(touchDX.current) > 50) go(i + (touchDX.current < 0 ? 1 : -1))
          }}
        >
          <button className="story-nav story-nav--prev" aria-label="Previous slide" onClick={() => go(i - 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>

          <div className="story-stage">
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.div
                key={slide.key}
                custom={dir}
                variants={reduce ? {} : variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease }}
                className="story-card"
              >
                <Renderer s={slide} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="story-nav story-nav--next" aria-label="Next slide" onClick={() => go(i + 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        <div className="story-dots" role="tablist" aria-label="Story slides">
          {storySlides.map((s, idx) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Go to slide ${idx + 1}`}
              className={`story-dot ${idx === i ? 'is-active' : ''}`}
              onClick={() => go(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Counter (animates a number when scrolled into view) ---------- */
function Counter({ to, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ---------- Sample workflows (use cases with metrics) ---------- */
const workflows = [
  {
    label: 'Sales',
    title: 'A CRM that finally writes its own follow-ups',
    body: 'WizGrail reads your existing CRM activity, summarises every account in one paragraph, drafts follow-up notes in the rep\'s voice, and surfaces the three deals most likely to move this week.',
    metric: { value: 12, suffix: ' h', label: 'returned to each rep, every week' },
  },
  {
    label: 'Operations',
    title: 'Stockouts predicted three weeks before they happen',
    body: 'On top of an inventory ERP that has run since 2014, we layer demand forecasting that learns the rhythm of your business and flags low stock long before purchasing would notice.',
    metric: { value: 38, suffix: '%', label: 'fewer emergency reorders in 90 days' },
  },
  {
    label: 'Support',
    title: 'A queue that triages itself overnight',
    body: 'Incoming tickets are categorised, drafted with a suggested reply, and escalated only when they actually need a human. Your support team starts the day with a sorted, prioritised inbox.',
    metric: { value: 64, suffix: '%', label: 'of tickets resolved at first touch' },
  },
]

export function Workflows() {
  return (
    <section className="section" id="workflows">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">Sample workflows</h2>
          <p className="sub">Three places we're frequently asked to start. Figures shown are typical results from comparable SME engagements, measured over a 90-day post-deployment window against a baseline period of equivalent length. We are transparent about sample size and methodology during scoping, and we will not quote a number to you that we cannot defend.</p>
        </Reveal>

        <motion.div
          className="workflow-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.12)}
        >
          {workflows.map((w) => (
            <motion.article key={w.label} className="workflow" variants={fadeUp} {...cardHover}>
              <div className="workflow__head">
                <span className="tag">{w.label}</span>
              </div>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
              <div className="workflow__metric">
                <strong><Counter to={w.metric.value} suffix={w.metric.suffix} /></strong>
                <span>{w.metric.label}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Industries ---------- */
const industries = [
  {
    name: 'Manufacturing',
    tagline: 'Production planning, quality, supplier intelligence.',
    body: 'Layer AI on top of MES and ERP to forecast demand, surface quality drift early, and rank suppliers by real performance — without touching the systems that already run the shop floor.',
    uses: ['Demand forecasting on existing ERP data', 'Quality anomaly detection from line telemetry', 'Supplier scorecards and reorder suggestions'],
    metric: { v: '38%', l: 'fewer emergency reorders in 90 days' },
  },
  {
    name: 'Retail & E-commerce',
    tagline: 'Demand forecasting, dynamic pricing, search relevance.',
    body: 'Integrate with your existing storefront, OMS, and POS to forecast SKU demand, tune prices in policy-safe bands, and improve on-site search and recommendations.',
    uses: ['SKU-level demand forecasting', 'Guard-railed dynamic pricing', 'Search & recommendation tuning'],
    metric: { v: '12%', l: 'lift in conversion from search relevance' },
  },
  {
    name: 'Logistics',
    tagline: 'Routing, ETA prediction, exception handling.',
    body: 'Augment your TMS with predictive ETAs, automated exception triage, and route optimisation that respects driver, vehicle, and SLA constraints already encoded in your stack.',
    uses: ['Predictive ETAs across modes', 'Auto-triaged exceptions and re-routes', 'SLA-aware route optimisation'],
    metric: { v: '22%', l: 'reduction in late deliveries' },
  },
  {
    name: 'Healthcare',
    tagline: 'Documentation, scheduling, clinical-decision support.',
    body: 'On top of EHR and scheduling systems: ambient documentation, intelligent scheduling, and decision-support that surfaces evidence at the point of care — privacy-first by design.',
    uses: ['Ambient clinical documentation', 'Intelligent appointment scheduling', 'Evidence-linked decision support'],
    metric: { v: '5 h', l: 'returned to each clinician per week' },
  },
  {
    name: 'Financial services',
    tagline: 'Risk scoring, KYC automation, document review.',
    body: 'Compliance-grade automation on top of your core banking, CRM, and document platforms — risk scoring, KYC orchestration, and contract review with full audit trail.',
    uses: ['Risk scoring with explainability', 'KYC/AML document orchestration', 'Contract & policy review at scale'],
    metric: { v: '70%', l: 'faster KYC turnaround' },
  },
  {
    name: 'Professional services',
    tagline: 'Knowledge retrieval, drafting, billable-hour reclaim.',
    body: 'Knowledge retrieval grounded in your firm\'s documents, drafting assistants tuned to your style, and time-capture that reclaims billable hours from admin overhead.',
    uses: ['Firm-grounded knowledge retrieval', 'Voice-of-firm drafting assistants', 'Auto time capture from work signals'],
    metric: { v: '8 h', l: 'reclaimed weekly per fee-earner' },
  },
]

export function Industries() {
  const [active, setActive] = useState(0)
  const current = industries[active]

  return (
    <section className="section section--alt" id="industries">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">Industries we work with</h2>
          <p className="sub">We are not vertical-locked — but these are the domains where our team has the most reps. Pick one to see how WizGrail fits.</p>
        </Reveal>

        <div className="ind-tabs" role="tablist" aria-label="Industries">
          {industries.map((ind, idx) => (
            <button
              key={ind.name}
              role="tab"
              aria-selected={idx === active}
              aria-controls="ind-panel"
              className={`ind-tab ${idx === active ? 'is-active' : ''}`}
              onClick={() => setActive(idx)}
            >
              <span className="ind-tab__num">{String(idx + 1).padStart(2, '0')}</span>
              {ind.name}
            </button>
          ))}
        </div>

        <div className="ind-panel" id="ind-panel" role="tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.name}
              className="ind-panel__grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="ind-panel__copy">
                <span className="tag">{current.name}</span>
                <h3 className="ind-panel__h">{current.tagline}</h3>
                <p className="ind-panel__body">{current.body}</p>
                <ul className="ind-panel__uses">
                  {current.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
              <div className="ind-panel__metric">
                <strong>{current.metric.v}</strong>
                <span>{current.metric.l}</span>
                <a className="bare bare--accent" href="#contact">Talk to us about {current.name.toLowerCase()} →</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ---------- Process timeline ---------- */
const phases = [
  { week: 'Week 0', title: 'Discovery', body: 'A free 30-minute call. We map the workflow, the system, and the realistic outcome.' },
  { week: 'Week 1–2', title: 'Scoping', body: 'A short, written engagement plan with the pilot scope, success criteria, and timeline.' },
  { week: 'Week 3–8', title: 'Pilot', body: 'We build, integrate, and run the pilot in a contained scope, with weekly check-ins.' },
  { week: 'Week 8+', title: 'Operate & scale', body: 'You decide whether to scale. If yes, we widen the rollout and hand off operations.' },
]

export function Timeline() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">A typical engagement</h2>
          <p className="sub">Most pilots run four to eight weeks. You commit to the pilot, not to the rollout — that decision happens once you have evidence.</p>
        </Reveal>

        <motion.ol
          className="timeline"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.12)}
        >
          {phases.map((p, i) => (
            <motion.li key={p.title} className="phase" variants={fadeUp}>
              <div className="phase__rail" aria-hidden="true">
                <motion.span
                  className="phase__dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
                />
              </div>
              <div className="phase__body">
                <span className="phase__week">{p.week}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

/* ---------- Security & data ---------- */
const security = [
  { title: 'Your data stays in your environment', body: 'We deploy inside your VPC, on-prem, or in a tenant you control. Nothing leaves unless you explicitly approve it.' },
  { title: 'Encrypted in transit and at rest', body: 'TLS 1.2+ everywhere. AES-256 at rest. Keys you can rotate.' },
  { title: 'Role-based access, end to end', body: 'Every action is scoped to a role, every model call is bound to an identity.' },
  { title: 'Auditable by design', body: 'Every prompt, every output, every change. You can replay any decision the system made.' },
]

export function Security() {
  return (
    <section className="section section--alt" id="security">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">Built to satisfy your security review</h2>
          <p className="sub">Most SMEs are rightly cautious about pointing AI at their data. Our defaults are designed so you can pass an internal review without rewriting them.</p>
        </Reveal>

        <motion.div
          className="security-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.08)}
        >
          {security.map((s) => (
            <motion.div key={s.title} className="security" variants={fadeUp} {...cardHover}>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Engagement / pricing approach ---------- */
export function Engagement() {
  return (
    <section className="section" id="engagement">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">How we engage</h2>
          <p className="sub">We don't sell licences off a price list. We scope each engagement after a discovery call, because a rip-and-replace platform pricing model is exactly what we are not.</p>
        </Reveal>

        <div className="engage-grid">
          <Reveal className="engage">
            <span className="engage__num">01</span>
            <h3>Discovery is free</h3>
            <p>A 30-minute conversation, no NDA required, no obligation. We will tell you whether AI is the right answer for the workflow you're describing — sometimes it isn't.</p>
          </Reveal>
          <Reveal className="engage" transition={{ delay: 0.08 }}>
            <span className="engage__num">02</span>
            <h3>Pilots are fixed-scope</h3>
            <p>Once we agree on a workflow, we deliver a written engagement plan with a fixed scope, fixed price, and fixed timeline. No surprises mid-pilot.</p>
          </Reveal>
          <Reveal className="engage" transition={{ delay: 0.16 }}>
            <span className="engage__num">03</span>
            <h3>Scaling is your choice</h3>
            <p>If the pilot delivers, we propose a rollout plan. If it does not, we stop. Either way, you keep the artefacts we produced.</p>
          </Reveal>
        </div>

        <Reveal className="commercials">
          <h3 className="commercials__h">What this looks like commercially</h3>
          <ul className="commercials__list">
            <li><strong>Pilots</strong> are typically scoped as fixed-fee engagements over four to eight weeks. We share an indicative range during discovery so you can decide before signing anything.</li>
            <li><strong>Rollouts</strong> follow a milestone-based commercial structure tied to the success criteria you defined for the pilot.</li>
            <li><strong>You own the work product</strong> — code, prompts, models, configuration, documentation. We do not lock outputs behind a proprietary platform.</li>
            <li><strong>Exit at any milestone</strong> with a clean handover package. No long-term lock-ins.</li>
            <li><strong>Continuity</strong> — the same lead engineer who runs your pilot stays attached to your account through rollout and into operations. You never get re-introduced to a stranger.</li>
          </ul>
          <p className="commercials__note">
            We share standard MSA, SOW, NDA, and DPA templates as part of scoping. Custom terms, indemnity caps, payment schedules, and SLAs are negotiated per engagement.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Trust & compliance posture ---------- */
const trustItems = [
  { label: 'Data residency', body: 'Deploy in your VPC, on-prem, or in a tenant you control. Default is "data does not leave your environment".' },
  { label: 'Encryption', body: 'TLS 1.2+ in transit. AES-256 at rest. Customer-managed keys supported on request.' },
  { label: 'Access control', body: 'Role-based access, SSO/SAML/OIDC, identity-bound model calls, full audit trail.' },
  { label: 'Compliance posture', body: 'Designed against SOC 2 / ISO 27001 / DPDP / GDPR control objectives. Formal certifications progressing — current attestations available on request under NDA.' },
  { label: 'AI safety', body: 'Output guardrails, retrieval grounding, human-in-the-loop on critical actions. We document and disclose model behaviour, not hide it.' },
  { label: 'Continuity', body: 'Source-code escrow available. Documented runbooks. Two-engineer minimum on every account.' },
]

export function Trust() {
  return (
    <section className="section section--alt" id="trust">
      <div className="container">
        <Reveal as="header" className="section__head">
          <h2 className="h2">Security &amp; compliance posture</h2>
          <p className="sub">A short, plain-language summary. Full security pack, control matrix, and DPA available under NDA during scoping.</p>
        </Reveal>

        <motion.div
          className="trust-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.06)}
        >
          {trustItems.map((t) => (
            <motion.div key={t.label} className="trust" variants={fadeUp} {...cardHover}>
              <h4>{t.label}</h4>
              <p>{t.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: 'Will this break our existing systems?',
    a: 'No. We sit on top of them, reading and writing through the interfaces they already expose. If a system has no API, we work with whatever it does have — exports, screens, scheduled jobs.',
  },
  {
    q: 'How long does a pilot take?',
    a: 'Most run four to eight weeks from kickoff. Discovery and scoping are usually two to three weeks before that.',
  },
  {
    q: 'What data leaves our environment?',
    a: 'None, unless you specifically approve it. The default deployment runs models against your data within a tenancy you control.',
  },
  {
    q: 'Do we need an in-house AI team?',
    a: 'No. We work alongside your existing engineering and operations people. If you have an AI lead, even better — we coordinate with them.',
  },
  {
    q: 'What if the pilot does not work?',
    a: 'It is bounded by design. The pilot has explicit success criteria written into the engagement. If we do not meet them, you do not roll out.',
  },
  {
    q: 'Do you support legacy and on-prem systems?',
    a: 'Yes. That is the centre of what we do. If your most important system is from 2014 and you cannot move off it, we can still put AI on top of it.',
  },
  {
    q: 'What does this typically cost?',
    a: 'Pilots are fixed-fee, scoped for four to eight weeks. We give you an indicative range on the discovery call once we understand the workflow, and a written quote during scoping. Rollouts are milestone-based and tied to the pilot success criteria.',
  },
  {
    q: 'What are payment terms and SLAs?',
    a: 'Pilots: typically a deposit on kickoff with the balance on delivery. Rollouts: milestone billing. Production SLAs (uptime, response time, incident severity) are negotiated per engagement. Standard MSA, SOW, NDA, and DPA templates are shared during scoping.',
  },
  {
    q: 'Who owns the IP and the deliverables?',
    a: 'You do. Code, prompts, models, configuration, documentation — yours. We do not lock outputs behind a proprietary platform. Background IP we bring stays ours; everything we build for you is yours.',
  },
  {
    q: 'What about hallucinations and AI mistakes?',
    a: 'Every workflow has explicit guardrails: retrieval-grounded responses, validators on critical fields, human-in-the-loop on irreversible actions, and full audit logs you can replay. Indemnity terms are negotiated case by case during contracting.',
  },
  {
    q: 'What happens if we end the engagement?',
    a: 'You leave with a complete handover package — code, infrastructure-as-code, runbooks, and trained staff documentation. Source-code escrow is available on request. We do not hold work product hostage.',
  },
]

function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={`faq ${open ? 'is-open' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease, delay: idx * 0.04 }}
    >
      <button
        className="faq__q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <motion.span className="faq__icon" aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>+</motion.span>
      </button>
      <motion.div
        className="faq__a"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        style={{ overflow: 'hidden' }}
      >
        <p>{a}</p>
      </motion.div>
    </motion.div>
  )
}

export function FAQ() {
  return (
    <section className="section section--alt" id="faq">
      <div className="container narrow narrow--center">
        <Reveal as="header" className="section__head" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <h2 className="h2">Questions we get asked first</h2>
        </Reveal>
        <div className="faqs">
          {faqs.map((f, i) => <FaqItem key={f.q} {...f} idx={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------- Magnetic button (used by CTA) ---------- */
export function MagneticBtn({ className = '', children, strength = 18, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength)
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
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
