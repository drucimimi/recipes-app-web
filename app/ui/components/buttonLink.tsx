import Link from 'next/link'
import * as React from 'react'
import styles from '@/app/ui/styles/button.module.css'
import Icon from './icon'

interface  ButtonLinkProps {
  source:string,
  name:string,
  action:string,
  icon:string,
  iconReverse:string,
  iconDescription:string
}

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = (props) => {
  return <div className={styles.buttonLink}>
    <Icon image={props.icon} description={props.iconDescription} imageReverse={props.iconReverse}/> 
    <Link 
      href={props.source} 
      className={props.action === "Supprimer" ? styles.red : props.action === "Modifier" ? styles.blue : props.action === "Ajouter" ? styles.green : styles.white}> 
      <p>{props.name}</p>
    </Link>
  </div>
}
export default ButtonLink