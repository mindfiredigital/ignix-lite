import React, { useState, useEffect } from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'
import { FeatureSection } from './feature-section'
import { ShowcaseSection } from './component-showcase'
import { CTASection } from './cta-section'
import { Footer } from './footer'

const WORDS = ['AI', 'Humans']

function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')

  useEffect(() => {
    const word = WORDS[wordIndex]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 110)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), 1400)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 70)
        return () => clearTimeout(t)
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, wordIndex])

  return (
    <span className={styles.typewriterWord}>
      {displayed || '\u00A0'}
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <button
      className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true) } catch { /* empty */ }
      }}
      aria-label={copied ? 'Copied!' : 'Copy'}
      title={copied ? 'Copied!' : 'Copy'}
    >
      {copied
        ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        )
      }
    </button>
  )
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>

        <mark className={styles.badge}>
          Ignix Lite
        </mark>

       <h1 className={styles.heroTitle}>
          Ultra-light
          <br />
          <span className={styles.gradientText}>
            browser-native UI toolkit for <TypewriterWord />
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          Designed for humans. Optimized for AI. Built for the modern web.
          </p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <strong>~4KB</strong>
            <span>Bundle Size</span>
          </div>
          <div className={styles.statItem}>
            <strong>0</strong>
            <span>Dependencies</span>
          </div>
          <div className={styles.statItem}>
            <strong>100%</strong>
            <span>Framework Free</span>
          </div>
          <div className={styles.statItem}>
            <strong>A11y</strong>
            <span>Accessible</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link to="/docs/introduction">
            <button className={styles.primaryButton}>
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </Link>

          <Link to="https://github.com/mindfiredigital/ignix-lite" target="_blank">
            <button className={styles.secondaryButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </Link>
        </div>

        <div className={styles.installBox}>
          <CopyButton text="pnpm add @mindfiredigital/ignix-lite" />
          <code>npm install @mindfiredigital/ignix-lite</code>
        </div>

      </div>
    </section>
  )
}

export default function MainPage() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <ShowcaseSection />
      <CTASection />
      <Footer />
    </main>
  )
}