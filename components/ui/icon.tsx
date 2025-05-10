import Image from 'next/image'
import * as React from 'react'

interface IconProps {
  image:string,
  imageReverse:string,
  description:string
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  return <picture>
    <source srcSet={props.image} type="image/svg+xml"></source>
    <source srcSet={props.imageReverse} type="image/svg+xml"></source>
    <Image
      width={24}
      height={24}
      src={props.imageReverse}
      alt={props.description}
    />
    </picture>
}
export default Icon