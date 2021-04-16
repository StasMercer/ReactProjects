import React from 'react'
import styles from '../styles/Header.module.scss'
export default function Header() {
    return (
        <div className={styles.header}>
            <a href="/" className={styles.logo}>ai</a>
        </div>
    )
}
