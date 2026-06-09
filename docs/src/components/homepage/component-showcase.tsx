import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

type Intent = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'

function CodeCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <button
      className={styles.codeCopyBtn}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true) } catch { /* empty */ }
      }}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <span className={styles.copiedText}>Copied!</span>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

export function ShowcaseSection() {
  const [activeIntent, setActiveIntent] = useState<Intent>('primary')
  const [password, setPassword] = useState('MySecr3tPassword!')

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { value: 0, text: 'Enter a password', color: 'neutral' }
    const length = pass.length
    const hasLetters = /[a-zA-Z]/.test(pass)
    const hasNumbers = /[0-9]/.test(pass)
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass)

    let score = 0
    if (length >= 6) score += 20
    if (length >= 10) score += 20
    if (hasLetters) score += 20
    if (hasNumbers) score += 20
    if (hasSpecial) score += 20

    if (score <= 40) return { value: score, text: 'Weak (too easy to guess)', color: 'danger' }
    if (score <= 80) return { value: score, text: 'Medium (add special characters)', color: 'warning' }
    return { value: score, text: 'Strong and highly secure!', color: 'success' }
  }

  const strength = getPasswordStrength(password)

  const alertMessages: Record<Intent, string> = {
    primary: 'Ignix Lite alerts are lightweight, semantic, and inherit variables.',
    success: 'Success! Your layout modifications have been successfully compiled.',
    warning: 'Caution: Bundle exceeds 4KB limit. Check framework imports.',
    danger: 'Error: Connection to MCP tool server failed. Retrying...',
    neutral: 'Information: Standard system logs are writing to local console.'
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Live Component <span className={styles.gradientText}>Playground</span></h2>
          <p>Toggle semantic intents dynamically and interact with real responsive controls.</p>
        </div>

        <div className={styles.intentSelectorWrapper}>
          <div className={styles.intentSelectorLabel}>Active Intent:</div>
          <div className={styles.intentSelector}>
            {(['primary', 'success', 'warning', 'danger', 'neutral'] as Intent[]).map(intent => (
              <button
                key={intent}
                data-intent={activeIntent === intent ? intent : 'ghost'}
                className={`${styles.intentBtn} ${activeIntent === intent ? styles.intentBtnActive : ''}`}
                onClick={() => {
                  setActiveIntent(intent)
                  if (intent === 'danger') {
                    setPassword('123')
                  } else if (intent === 'warning') {
                    setPassword('Password123')
                  } else if (intent === 'success') {
                    setPassword('MySecr3tPassword!')
                  } else if (intent === 'neutral') {
                    setPassword('123456')
                  } else if (intent === 'primary') {
                    setPassword('IgnixLitePrimary1!')
                  }
                }}
              >
                {intent.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.playgroundLayout}>
          <div className={styles.showcaseGrid}>

            <div className={styles.showcaseCard}>
              <h3>Semantic Button</h3>
              <div className={styles.interactiveArea}>
                <button data-intent={activeIntent} className={styles.showcaseBtn}>
                  {activeIntent.charAt(0).toUpperCase() + activeIntent.slice(1)} Action
                </button>
                <button data-intent="ghost" className={styles.showcaseBtn}>
                  Ghost Alternate
                </button>
              </div>
            </div>

            <div className={styles.showcaseCard}>
              <h3>Alert Aside</h3>
              <div className={styles.interactiveArea}>
                <aside data-intent={activeIntent === 'neutral' ? 'info' : activeIntent}>
                  <strong>{activeIntent.toUpperCase()} ALERT</strong>
                  <span>{alertMessages[activeIntent]}</span>
                </aside>
              </div>
            </div>


            <div className={styles.showcaseCard}>
              <h3>Password Strength</h3>
              <div className={styles.interactiveArea}>
                <label className={styles.showcaseLabel}>
                  Test Input
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type a password…"
                    data-intent={activeIntent}
                  />
                </label>
                <div className={styles.meterContainer}>
                  <meter
                    data-intent={activeIntent}
                    value={strength.value}
                    min={0}
                    max={100}
                    low={40}
                    high={80}
                    optimum={100}
                    style={{ width: '100%', height: '0.5rem' }}
                  />
                  <span className={styles.meterFeedback} data-intent={activeIntent}>
                    {strength.text}
                  </span>
                </div>
              </div>
            </div>


            <div className={styles.showcaseCard}>
              <h3>Forms & Inputs</h3>
              <div className={styles.interactiveArea}>
                <label className={styles.showcaseLabel}>
                  Status Input
                  <textarea
                    data-intent={activeIntent}
                    placeholder={`Type in this ${activeIntent} styled input field...`}
                    rows={2}
                  />
                </label>
              </div>
            </div>

          </div>

          <div className={styles.codePanel}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDot} style={{ background: '#ef4444' }}></div>
              <div className={styles.codeDot} style={{ background: '#fbbf24' }}></div>
              <div className={styles.codeDot} style={{ background: '#22c55e' }}></div>
              <span className={styles.codeTitle}>index.html</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <CodeCopyButton text={`<button data-intent="${activeIntent}">
  ${activeIntent.charAt(0).toUpperCase() + activeIntent.slice(1)} Action
</button>
<button data-intent="ghost">
  Ghost Alternate
</button>

<aside data-intent="${activeIntent === 'neutral' ? 'info' : activeIntent}">
  <strong>${activeIntent.toUpperCase()} ALERT</strong>
  <span>${alertMessages[activeIntent]}</span>
</aside>

<label>
  Test Input
  <input type="text" value="${password}" data-intent="${activeIntent}" />
</label>
<meter
  data-intent="${activeIntent}"
  value="${strength.value}"
  min="0"
  max="100"
  low="40"
  high="80"
  optimum="100"
></meter>

<textarea data-intent="${activeIntent}" placeholder="Type in this ${activeIntent} styled input field..." rows="2"></textarea>`} />
              </div>
            </div>
            <pre className={styles.codePre}>
              <code>
                {`<button data-intent="${activeIntent}">
  ${activeIntent.charAt(0).toUpperCase() + activeIntent.slice(1)} Action
</button>
<button data-intent="ghost">
  Ghost Alternate
</button>

<aside data-intent="${activeIntent === 'neutral' ? 'info' : activeIntent}">
  <strong>${activeIntent.toUpperCase()} ALERT</strong>
  <span>${alertMessages[activeIntent]}</span>
</aside>

<label>
  Test Input
  <input type="text" value="${password}" data-intent="${activeIntent}" />
</label>
<meter
  data-intent="${activeIntent}"
  value="${strength.value}"
  min="0"
  max="100"
  low="40"
  high="80"
  optimum="100"
></meter>

<textarea data-intent="${activeIntent}" placeholder="Type in this ${activeIntent} styled input field..." rows="2"></textarea>`}
              </code>
            </pre>
            <div className={styles.codeFoot}>
              <span>Powered by ignix-lite.min.css</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}