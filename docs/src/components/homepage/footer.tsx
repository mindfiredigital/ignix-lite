import React from 'react'
import styles from './styles.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Mindfire Digital · Ignix Lite
    </footer>
  )
}