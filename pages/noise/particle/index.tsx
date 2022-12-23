import { Canvas } from '@react-three/fiber'
import { Particles } from '@/components/partical'
import dynamic from 'next/dynamic'

export const Page = () => {
  // エラーになるため、ダイナミックインポートする
  const NextOrbitControls = dynamic(
    () => import('@/components/drie/orbitControls'),
    { ssr: false }
  )
  const NextStats = dynamic(() => import('@/components/drie/stats'), {
    ssr: false,
  })
  return (
    <Canvas dpr={2}>
      <color attach="background" args={[0xf5f3fd]} />
      <NextOrbitControls makeDefault />
      <NextStats />
      <Particles />
    </Canvas>
  )
}

export default Page
