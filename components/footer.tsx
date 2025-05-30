import * as React from 'react'
import styles from '@/app/ui/styles/footer.module.css'
import Link from 'next/link'

const Footer: React.FunctionComponent = () => {
  const year = new Date().getFullYear()
  return <footer className={styles.footer}>
    <div>
      <Link href="/web/cgu">Conditions générales d'utilisation</Link>
    </div>
    <div className={styles.contentinfo}>
      <p>©{year} Recipes App</p>
      <Link href="mailto:drucilladeroche@proton.me">Drucilla Deroche</Link> 
      <p>Tous droits réservés</p>
    </div>
  </footer>
}
export default Footer