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
            { icon: '⚡', title: 'Tiny Bundle Size', desc: 'Under 4KB gzipped. Zero external dependencies. Ships only the absolute minimum runtime overhead.' },
            { icon: '🧩', title: 'Framework Agnostic', desc: 'Deploy seamlessly on React, Vue, Svelte, or vanilla HTML. No lock-in or compiler restrictions.' },
            { icon: '🎨', title: 'CSS-First Architecture', desc: 'Semantic layout properties powered entirely by CSS custom variables. Style once, inherit everywhere.' },
            { icon: '🤖', title: 'AI-Native Workflow', desc: 'Built-in Model Context Protocol (MCP) server integration lets AI agents theme, build, and audit your code.' },
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