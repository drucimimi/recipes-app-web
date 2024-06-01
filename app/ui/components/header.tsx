import * as React from 'react'
import styles from '@/app/ui/styles/header.module.css'
import Icon from './icon'
import logo from '@/public/images/light/logo.svg'
import logoReverse from '@/public/images/dark/logo.svg'


const Header: React.FunctionComponent = () => {
  return <header className={styles.header}>
    <div className={styles.headerTitle}>
        <Icon image={logo} description='Logo Recipes App' imageReverse={logoReverse}/>
        <h1>Recipes App</h1>
    </div>
  </header>
}
export default Header