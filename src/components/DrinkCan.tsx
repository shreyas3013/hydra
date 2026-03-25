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

function OrbitRing({
  color,
  radius,
  tube,
  tiltX,
  tiltZ,
  speed,
}: {
  color: string
  radius: number
  tube: number
  tiltX: number
  tiltZ: number
  speed: number
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!ringRef.current) return
    ringRef.current.rotation.z += speed * 0.01
  })
  return (
    <mesh ref={ringRef} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tube, 6, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.6}
        roughness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
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
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 2.0,
    })
    const labelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#000d1a'),
      metalness: 0.3,
      roughness: 0.4,
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: 0.2,
    })
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(emissiveColor),
      metalness: 0.8,
      roughness: 0.05,
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: 1.0,
    })
    const tabMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#aaaaaa'),
      metalness: 1.0,
      roughness: 0.02,
    })
    return { metalMat, labelMat, accentMat, tabMat }
  }, [color, emissiveColor])

  const stripes = useMemo(() => {
    return Array.from({ length: 4 }, () =>
      new THREE.CylinderGeometry(0.508, 0.508, 0.025, 64, 1, true)
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
      {/* Can body */}
      <mesh geometry={bodyGeo} material={metalMat} />
      <mesh geometry={labelGeo} material={labelMat} />

      {/* Accent stripes */}
      {stripes.map((geo, i) => (
        <mesh key={i} geometry={geo} material={accentMat} position={[0, -0.45 + i * 0.35, 0]} />
      ))}

      {/* Caps */}
      <mesh geometry={bottomCapGeo} material={metalMat} position={[0, -0.95, 0]} />
      <mesh geometry={topNeckGeo} material={metalMat} position={[0, 1.025, 0]} />
      <mesh geometry={topCapGeo} material={metalMat} position={[0, 1.185, 0]} />

      {/* Pull tab */}
      <mesh
        geometry={pullTabGeo}
        material={tabMat}
        position={[0.1, 1.24, 0]}
        rotation={[Math.PI / 2, 0, 0.3]}
      />

      {/* Glowing rings on the can */}
      <mesh position={[0, 1.19, 0]}>
        <torusGeometry args={[0.22, 0.018, 8, 40]} />
        <meshStandardMaterial color={emissiveColor} emissive={emissiveColor} emissiveIntensity={3} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <torusGeometry args={[0.48, 0.018, 8, 40]} />
        <meshStandardMaterial color={emissiveColor} emissive={emissiveColor} emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.505, 0.012, 8, 40]} />
        <meshStandardMaterial color={emissiveColor} emissive={emissiveColor} emissiveIntensity={1.5} />
      </mesh>

      {/* Orbital rings around the can */}
      <OrbitRing
        color={emissiveColor}
        radius={0.9}
        tube={0.008}
        tiltX={Math.PI / 2.8}
        tiltZ={0.3}
        speed={1.2}
      />
      <OrbitRing
        color={emissiveColor}
        radius={1.15}
        tube={0.006}
        tiltX={Math.PI / 2.2}
        tiltZ={-0.5}
        speed={-0.8}
      />
      <OrbitRing
        color={emissiveColor}
        radius={0.75}
        tube={0.005}
        tiltX={Math.PI / 3}
        tiltZ={1.0}
        speed={1.6}
      />
    </group>
  )
}
