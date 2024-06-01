import * as React from 'react'
import styles from '@/app/ui/styles/footer.module.css'

const Footer: React.FunctionComponent = () => {
  return <footer className={styles.footer}>
    <div className={styles.contentinfo}>
      <p>©2024 Recipes App</p>
      <p>Drucilla Deroche</p> 
      <p>Tous droits réservés</p>
    </div>
  </footer>
}
export default Footer