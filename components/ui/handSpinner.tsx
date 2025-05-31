"use client"
import * as React from 'react'
import Image from 'next/image'
import styles from '@/app/ui/styles/handspinner.module.css'

const HandSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Image 
        src="/images/favicon.ico"
        alt={"Chargment des données en cours"}
        width={50}
        height={50}
        className={styles.spinner}
      />
    </div>
  )
}

export default HandSpinner