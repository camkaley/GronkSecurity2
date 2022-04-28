import ReactDOM from 'react-dom'
import React, { Suspense, useState } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { GLTFLoader } from './GLTFLoader'
import house from '../../resources/models/house.glb'

function House() {
  const gltf = useLoader(GLTFLoader, house)
  return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}


export function Render() {
  const [clicked, set] = useState(false)
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Suspense fallback={<Box />}><House /></Suspense>
      </Canvas>
    </>
  )
}
