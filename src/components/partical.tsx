import { useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import vertexShader from 'src/shaders/particleNoise/vert'
import fragmentShader from 'src/shaders/particleNoise/frag'

export const Particles = () => {
  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 128, 128)
    const positions = planeGeometry.attributes.position.array

    return positions
  }, [])

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    []
  )

  useFrame(() => {
    shaderArgs.uniforms.uTime.value++
  })

  return (
    <points rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={planePositions}
          itemSize={3}
          count={planePositions.length / 3}
        />
      </bufferGeometry>
      <shaderMaterial
        args={[shaderArgs]}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </points>
  )
}
