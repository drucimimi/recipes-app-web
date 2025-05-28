import * as React from 'react'
import styles from '@/app/ui/styles/header.module.css'
import Icon from '@/components/ui/icon'
import Link from 'next/link'

interface HeaderProps {
  icon:string,
  iconReverse:string,
  iconDescription:string
  title:string,
  hasMenu:boolean,
  role:string
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return <header className={styles.header}>
    <div className={styles.headerTitle}>
        <Icon image={props.icon} description={props.iconDescription} imageReverse={props.iconReverse}/>
        <h1>{props.title}</h1>
    </div>
    { props.hasMenu && <div>
      <ul>
        <li>
          <Link href="/web">Accueil</Link>
        </li>
        <li>
          <Link href="/web/settings">Paramètres</Link>
        </li>
        {props.role == "ADMIN" && <li>
          <Link href="/web/admin">Administration</Link>
        </li>}
      </ul>
    </div>}
  </header>
}
export default Header