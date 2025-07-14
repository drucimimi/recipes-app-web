"use client"
import * as React from 'react'
import styles from '@/app/ui/styles/header.module.css'
import Icon from '@/components/ui/icon'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { deleteSessionCookie } from '@/services/authProvider'
import { UserResponse } from '@/types/definitions'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'

interface HeaderProps {
  icon:string,
  iconReverse:string,
  iconDescription:string
  title:string,
  hasMenu:boolean,
  role:string,
  userInfo?:UserResponse|null
}

/**
 * 
 * @param props - {icon, iconReverse, iconDescription, title, hasMenu, role, userInfo }
 * permet d'afficher le header avec des propriétés différentes selon les pages
 * @example
 * ```
   const session = (await cookies.get('session))?.value
   const sessionInfo = session ? await decrypt(session) : null
   const userDetail = sessionInfo?.userDetail
    // Si pas de menu sur la page et user non connecté
    return (
        <Header icon={iconSVG} icon={iconReverseSVG} iconDescription={'icone description'} title={'titre du header'} hasMenu=false role={''} />
    )
    // Si menu sur la page et user connecté
    return (
        <Header icon={iconSVG} icon={iconReverseSVG} iconDescription={'icone description'} title={'titre du header'} hasMenu=false role={userDetail.role} userDetail={userDetail} />
    )
    // Si pas de menu sur la page et user connecté
    return (
        <Header icon={iconSVG} icon={iconReverseSVG} iconDescription={'icone description'} title={'titre du header'} hasMenu=false role={userDetail.role} userDetail={userDetail} />
    )
    // Si menu sur la page et user connecté
    return (
        <Header icon={iconSVG} icon={iconReverseSVG} iconDescription={'icone description'} title={'titre du header'} hasMenu=true role={userDetail.role} userDetail={userDetail} />
    )
    ```
 */
const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const avatar = props.userInfo?.profile.avatar.replace("10.0.2.2", "localhost") || `http://localhost:8080/api/images/default/default-profile-image.jpg`
  const logout = async () => {
    const response = await fetch('/api/logout')
    if(response.status == 200){
      await deleteSessionCookie()
      deleteCookie("pseudo")
      deleteCookie("avatar")
      deleteCookie("recipe")
      if(pathname != "/web"){
        router.push("/web")
      } else {
        window.location.reload()
      }
    } else {
      console.error("Impossible de se déconnecter")
    }
  }
  return <header className={styles.header}>
    <Link href="/" className={styles.headerTitle}>
      <Icon image={props.icon} description={props.iconDescription} imageReverse={props.iconReverse}/>
      <h1>{props.title}</h1>
    </Link>
    { props.hasMenu && <div>
      <ul className='flex flex-col md:flex-row gap-2 justify-center md:justify-around items-center'>
        <li>
          <Link href="/web">Accueil</Link>
        </li>
        {props.role == "ADMIN" || props.role == "USER" ? <li>
          <Link href="/web/protected/profile" style={{display: "flex", gap:"0.3em"}}>
            <Image src={avatar} width={24} height={24} alt="avatar" />
            Mon Profil
          </Link>
        </li> : <li>
          <Link href="/web/login">Connexion</Link>
        </li>}
        {props.role == "ADMIN" && <li>
          <Link href="/web/protected/admin">Administration</Link>
        </li>}
        {props.role == "ADMIN" || props.role == "USER" ? <li><Button type="button" onClick={logout} className="bg-transparent text-base">Déconnexion</Button></li> : null}
      </ul>
    </div>}
  </header>
}
export default Header