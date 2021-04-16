import React from 'react'
import styles from '../styles/Button.module.scss'
type Props ={
    text: string,
    handler: ()=>void
}
export default function Button({text, handler}:Props) {
    return (
        <button onClick={handler} className={styles.btn}>
            {text}
        </button>
    )
}
