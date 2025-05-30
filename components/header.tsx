"use client"
import * as React from 'react'
import styles from '@/app/ui/styles/header.module.css'
import Icon from '@/components/ui/icon'
import Link from 'next/link'
import { Button } from './ui/button'
import { apiRequest } from '@/services/httpCall'
import { useRouter } from 'next/navigation'
import { deleteSessionCookie } from '@/services/authProvider'
import { UserResponse } from '@/types/definitions'
import { deleteCookie } from 'cookies-next'

interface HeaderProps {
  icon:string,
  iconReverse:string,
  iconDescription:string
  title:string,
  hasMenu:boolean,
  role:string,
  userInfo?:UserResponse|null
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const router = useRouter()
  const logout = async () => {
    const response = await apiRequest(`/auth/logout`, { headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${props.userInfo?.token}`}})
    if(response.status == 200){
      deleteSessionCookie()
      deleteCookie("pseudo")
      deleteCookie("avatar")
      router.push("/web")
    } else {
      console.error("Impossible de se déconnecter")
    }
  }
  return <header className={styles.header}>
    <div className={styles.headerTitle}>
        <Icon image={props.icon} description={props.iconDescription} imageReverse={props.iconReverse}/>
        <h1>{props.title}</h1>
    </div>
    { props.hasMenu && <div>
      <ul className='flex flex-col md:flex-row gap-2 justify-center items-center'>
        <li>
          <Link href="/web">Accueil</Link>
        </li>
        {props.role == "ADMIN" || props.role == "USER" ? <li>
          <details className='cursor-pointer'>
            <summary><Link href="/web/protected/profile">Mon Profil</Link></summary>
            <Button type="button" onClick={logout} className="bg-transparent">Déconnexion</Button>
          </details>
        </li> : <li>
          <Link href="/web/login">Connexion</Link>
        </li>}
        {props.role == "ADMIN" && <li>
          <Link href="/web/protected/admin">Administration</Link>
        </li>}
      </ul>
    </div>}
  </header>
}
export default Header