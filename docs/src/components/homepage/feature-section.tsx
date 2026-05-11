import React from 'react'
import styles from './styles.module.css'

export function FeatureSection() {
  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Why Choose <span className={styles.gradientText}>Ignix Lite</span></h2>
          <p>Built for developers who want simplicity, performance and flexibility.</p>
        </div>
        <div className={styles.featureGrid}>
          {[
            { icon: '⚡', title: 'Tiny Bundle Size',   desc: 'Lightweight architecture with minimal runtime overhead. Ships only what you use - nothing more.' },
            { icon: '🧩', title: 'Framework Agnostic', desc: 'Works with React, js or plain HTML. No lock-in, ever.' },
            { icon: '🎨', title: 'CSS First',          desc: 'Semantic components powered entirely through CSS variables. Style once, use everywhere.' },
          ].map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}