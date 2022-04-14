import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import five from "../../resources/images/dice.png"
import { OrbitControls } from "./orbitControls";

extend({ OrbitControls });

const Box = (props) => {
  const mesh = useRef();
  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture}/>
      </meshBasicMaterial>
    </mesh>
  );
};

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
    <Canvas style={{width: "500px", height: "500px", border: "3px solid white"}}>
      <CameraControls/>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} scale={[3, 3, 3]}/>
      <Box position={[1.1, 0, 0]} scale={[1, 1, 1]} onClick={() => console.log("test")}/>
    </Canvas>
  );
}
