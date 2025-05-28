import * as React from 'react'
import styles from '@/app/ui/styles/footer.module.css'

const Footer: React.FunctionComponent = () => {
  const year = new Date().getFullYear()
  return <footer className={styles.footer}>
    <div className={styles.contentinfo}>
      <p>©{year} Recipes App</p>
      <p>Drucilla Deroche</p> 
      <p>Tous droits réservés</p>
    </div>
  </footer>
}
export default Footer