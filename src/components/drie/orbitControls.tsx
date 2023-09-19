import { OrbitControlsProps } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'

export const NextOrbitControls = (props: OrbitControlsProps) => {
  return <OrbitControls {...props} />
}

export default NextOrbitControls
