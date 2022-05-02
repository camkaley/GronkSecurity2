import React, { useRef, useState, useMemo, Suspense } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "react-three-fiber";
import { OrbitControls } from "./orbitControls";
import { GLTFLoader } from "./GLTFLoader";
import house from "../../resources/models/house.glb";
import arrow from "../../resources/models/arrow.glb";

extend({ OrbitControls });

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

export default function House(props) {

  function House() {
    const gltf = useLoader(GLTFLoader, house);
    return (
      <primitive
        object={gltf.scene}
        scale={[0.3, 0.3, 0.3]}
        position={[0, -0.5, 0]}
        rotation={[0, 4, 0]}
      />
    );
  }

  function Arrow() {
    const gltf = useLoader(GLTFLoader, arrow);
    return (
      <primitive
        object={gltf.scene}
        scale={[0.1, 0.1, 0.1]}
        position={[1.4, -0.13, -1.1]}
        rotation={[0, 7.14, 0]}
        onClick={() => openCamera(0)}
      />
    );
  }

  function openCamera(camID) {
    props.callback(camID)
  }

  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <CameraControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense>
        <House />
      </Suspense>
      <Suspense>
        <Arrow />
      </Suspense>
    </Canvas>
  );
}
