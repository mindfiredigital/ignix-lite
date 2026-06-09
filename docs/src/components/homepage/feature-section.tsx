import React from 'react'
import styles from './styles.module.css'

export function FeatureSection() {
  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Why Choose <span className={styles.gradientText}>Ignix Lite ?</span></h2>
          <p>Built for agents and developers who want simplicity, performance and flexibility.</p>
        </div>
        <div className={styles.featureGrid}>
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
              title: 'Tiny Bundle Size',
              desc: 'Under 4KB gzipped. Zero external dependencies. Ships only the absolute minimum runtime overhead.'
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12s6.48 10 10 10z" />
                  <circle cx="7.5" cy="10.5" r="1.5" fill="var(--primary)" />
                  <circle cx="11.5" cy="7.5" r="1.5" fill="var(--primary)" />
                  <circle cx="16.5" cy="9.5" r="1.5" fill="var(--primary)" />
                  <circle cx="15.5" cy="14.5" r="1.5" fill="var(--primary)" />
                </svg>
              ),
              title: 'CSS-First Architecture',
              desc: 'Semantic layout properties powered entirely by CSS custom variables. Style once, inherit everywhere.'
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="15" x2="23" y2="15" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="15" x2="4" y2="15" />
                </svg>
              ),
              title: 'AI-Native Workflow',
              desc: 'Built-in Model Context Protocol (MCP) server integration lets AI agents theme, build, and audit your code.'
            }
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
