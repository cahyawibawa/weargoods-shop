import { Coolshape } from 'coolshapes-react'

interface LogoProps {
  className?: string
}
export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Coolshape
      type="triangle"
      className={className}
      index={8}
      noise={false}
      size={20}
    />
  )
}
