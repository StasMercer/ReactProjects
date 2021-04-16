import React from 'react'
import styles from '../styles/TryItem.module.scss'
import Image from 'next/image'
type Props = {
    imgPath: string,
    title: string, 
    description: string
    link: string
}
export default function TryItem(props:Props) {
    return (
        <a href={props.link} className={styles.item}>
            <img
                className={styles.image} 
                src={props.imgPath}
                
            />
            <div className={styles.content}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
            </div>
        </a>
    )
}
