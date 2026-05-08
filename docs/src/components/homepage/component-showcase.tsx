import React from 'react'
import styles from './styles.module.css'

export function ShowcaseSection() {
  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Component <span className={styles.gradientText}>Showcase</span></h2>
          <p>Beautiful semantic components for modern interfaces.</p>
        </div>
        <div className={styles.showcaseGrid}>

          <div className={styles.showcaseCard}>
            <h3>Buttons</h3>
            <div className={styles.row}>
              <button data-intent="primary">Primary</button>
              <button data-intent="success">Success</button>
              <button data-intent="danger">Danger</button>
              <button data-intent="warning">Warning</button>
              <button data-intent="neutral">Neutral</button>
           
              
            </div>
          </div>

          <div className={styles.showcaseCard}>
            <h3>Alert</h3>
            <aside data-intent="danger">Danger</aside>
            <aside data-intent="info">Info</aside>
          </div>

          <div className={styles.showcaseCard}>
            <h3>Meter</h3>
            <h3>Password</h3>
            <meter value="10" min="0" max="100" low={30} high={70} optimum={100}></meter>
            <h5>Your Password is too easy to guess</h5>
            <h3>Password</h3>
            <meter value="40" min="0" max="100" low={30} high={70} optimum={100}></meter>
            <h5>So-so must contain at least 1 letter</h5>
            <h3>Password</h3>
            <meter value="80" min="0" max="100" low={30} high={70} optimum={100}></meter>
            <h5>Awesome! You have a secure</h5>
          </div>

          <div className={styles.showcaseCard}>
            <h3>TextArea</h3>
            <label>Danger <textarea data-intent="danger"></textarea></label>
            <label>Warning <textarea data-intent="warning"></textarea></label>
            <label>Success <textarea data-intent="success"></textarea></label>
            <label>Disabled <textarea disabled></textarea></label>

          </div>

        </div>
      </div>
    </section>
  )
}