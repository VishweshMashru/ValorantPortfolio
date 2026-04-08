'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CityGrid() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 3) % 10
    }
  })

  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = []
    const gridSize = 30
    const divisions = 15

    for (let i = -gridSize; i <= gridSize; i += gridSize / divisions) {
      // Z lines (going into screen)
      const zGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, -4, -80),
        new THREE.Vector3(i, -4, 20),
      ])
      lines.push(zGeo)
    }

    for (let j = -80; j <= 20; j += 6) {
      // X lines (horizontal)
      const xGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize, -4, j),
        new THREE.Vector3(gridSize, -4, j),
      ])
      lines.push(xGeo)
    }
    return lines
  }, [])

  return (
    <group ref={gridRef}>
      {gridLines.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color={i < 16 ? '#FF0040' : '#220011'}
            transparent
            opacity={i < 16 ? 0.3 : 0.15}
          />
        </line>
      ))}
    </group>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
      const pos = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < 800; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#FF0040"
        size={0.05}
        sizeAttenuation
        opacity={0.6}
      />
    </Points>
  )
}

function CyanParticles() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(400 * 3)
    for (let i = 0; i < 400; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.x = state.clock.elapsedTime * 0.02
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#00F5FF" size={0.03} sizeAttenuation opacity={0.4} />
    </Points>
  )
}

export default function CyberpunkScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#000000', 20, 80]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} color="#FF0040" intensity={5} distance={50} />
        <pointLight position={[-20, -2, -20]} color="#00F5FF" intensity={3} distance={40} />
        <CityGrid />
        <FloatingParticles />
        <CyanParticles />
      </Canvas>
    </div>
  )
}
