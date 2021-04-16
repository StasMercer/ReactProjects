import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import strings from '../utils/strings'
import TryItem from '../components/TryItem'
import Header from '../components/Header'
export default function Home() {

  return (
    <div className={styles.main}>

      <Header />
      <div className={styles.content}>
        <div className={styles.full_logo}>
          <span>Try</span>
          <span className={styles.logo}>ai</span>
          <span></span>
        </div>
        <div className={styles.description}>{strings.description}</div>
        
      </div>
      <div className={styles.tryitems}>
        <TryItem
          link="/pacanes"
          imgPath="/images/pacanes.jpg"
          description={strings.pacanes_description}
          title={strings.pacanes_title}/>
        
        <TryItem
          link="/poetos" 
          imgPath="/images/poetos.jpg"
          description={strings.poetos_description}
          title={strings.poetos_title}/>
        
      </div>
      
      <div className={styles.description}>{strings.additional_desc}</div>
    </div>
  )
}
