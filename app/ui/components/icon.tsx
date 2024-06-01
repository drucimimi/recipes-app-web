import Image from 'next/image'
import * as React from 'react'
import styles from '@/app/ui/styles/button.module.css'

interface IconProps {
  image:string,
  imageReverse:string,
  description:string
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  return <picture>
    <source srcSet={props.image} type="image/svg+xml"></source>
    <Image
      width={24}
      height={24}
      src={props.imageReverse}
      alt={props.description}
  />
    </picture>
}
export default Icon