import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface DrinkCanProps {
  color?: string
  emissiveColor?: string
  position?: [number, number, number]
  scale?: number
  autoRotate?: boolean
}

export default function DrinkCan({
  color = '#001a1a',
  emissiveColor = '#00f5ff',
  position = [0, 0, 0],
  scale = 1,
  autoRotate = true,
}: DrinkCanProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  const canParts = useMemo(() => {
    const bodyGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.8, 64, 1, true)
    const topCapGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.1, 64)
    const bottomCapGeo = new THREE.CylinderGeometry(0.5, 0.45, 0.1, 64)
    const topNeckGeo = new THREE.CylinderGeometry(0.2, 0.45, 0.25, 64)
    const pullTabGeo = new THREE.TorusGeometry(0.08, 0.025, 8, 20)
    const labelGeo = new THREE.CylinderGeometry(0.505, 0.505, 1.2, 64, 1, true)
    return { bodyGeo, topCapGeo, bottomCapGeo, topNeckGeo, pullTabGeo, labelGeo }
  }, [])

  const materials = useMemo(() => {
    const metalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1.5,
    })
    const labelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#000d1a'),
      metalness: 0.3,
      roughness: 0.4,
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: 0.15,
    })
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(emissiveColor),
      metalness: 0.8,
      roughness: 0.1,
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: 0.6,
    })
    const tabMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#888888'),
      metalness: 1.0,
      roughness: 0.05,
    })
    return { metalMat, labelMat, accentMat, tabMat }
  }, [color, emissiveColor])

  const stripes = useMemo(() => {
    return Array.from({ length: 3 }, () =>
      new THREE.CylinderGeometry(0.508, 0.508, 0.04, 64, 1, true)
    )
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    if (autoRotate) {
      groupRef.current.rotation.y = t * 0.5
    }
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15
    const targetX = mouse.y * 0.3
    const targetZ = mouse.x * 0.3
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05
  })

  const { bodyGeo, topCapGeo, bottomCapGeo, topNeckGeo, pullTabGeo, labelGeo } = canParts
  const { metalMat, labelMat, accentMat, tabMat } = materials

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={bodyGeo} material={metalMat} />
      <mesh geometry={labelGeo} material={labelMat} />
      {stripes.map((geo, i) => (
        <mesh key={i} geometry={geo} material={accentMat} position={[0, -0.3 + i * 0.35, 0]} />
      ))}
      <mesh geometry={bottomCapGeo} material={metalMat} position={[0, -0.95, 0]} />
      <mesh geometry={topNeckGeo} material={metalMat} position={[0, 1.025, 0]} />
      <mesh geometry={topCapGeo} material={metalMat} position={[0, 1.185, 0]} />
      <mesh
        geometry={pullTabGeo}
        material={tabMat}
        position={[0.1, 1.24, 0]}
        rotation={[Math.PI / 2, 0, 0.3]}
      />
      <mesh position={[0, 1.19, 0]}>
        <torusGeometry args={[0.22, 0.015, 8, 40]} />
        <meshStandardMaterial color={emissiveColor} emissive={emissiveColor} emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <torusGeometry args={[0.48, 0.015, 8, 40]} />
        <meshStandardMaterial color={emissiveColor} emissive={emissiveColor} emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}
