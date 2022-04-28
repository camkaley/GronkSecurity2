import React, { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend, useLoader } from "react-three-fiber";
import five from "../../resources/images/dice.png"
import { OrbitControls } from "./orbitControls";
import { GLTFLoader } from './GLTFLoader'
import house from '../../resources/models/house.glb'

extend({ OrbitControls });

function House() {
  const gltf = useLoader(GLTFLoader, house)
  return <primitive object={gltf.scene} scale={[0.3, 0.3, 0.3]} position={[0, -1, 0]} rotation={[0, 4, 0]}/>
}

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
      camera,
      gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
  };

export default function Test() {
  return (
    <Canvas style={{width: window.innerHeight, height: window.innerHeight, border: "3px solid white", margin: "0 auto"}}>
      <CameraControls/>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense><House/></Suspense>
    </Canvas>
  );
}
