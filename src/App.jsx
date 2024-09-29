import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import './App.css'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from 'react'
import { color, DirectionalLight, DirectionalLightHelper, js } from "three/webgpu"

const Cube = ({ position, size, color }) => {

  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    // ref.current.position.z += Math.sin(state.clock.elapsedTime) * 2
    // console.log(state.clock.elapsedTime)
  })

  return (
    <mesh position={position}>
      <boxGeometry args={size}  ref={ref} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Sphere = ({ position, size }) => {

  const ref = useRef()

  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useFrame((state, delta) => {
    let speed = 0.5
    if (isHovered){
      ref.current.rotation.y += delta
    }
    ref.current.position.y = 0.5 - Math.sin(state.clock.elapsedTime) * speed

  })

  return(
    <mesh 
    position={position} ref={ref} 
    onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
    onPointerLeave={() => setIsHovered(false)}
    onClick={() => setIsClicked(!isClicked)}
    scale={isClicked ? 1.5 : 1} >
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? 'pink' : 'lightblue'} wireframe wireframeLinewidth={.0}/>
    </mesh>
  )
}

const Torus = ({ position, size, color }) => {

  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta
    ref.current.rotation.x += delta * Math.sin(state.clock.elapsedTime) * 4
    ref.current.rotation.z += delta
  })

  return(
    <mesh position={position} ref={ref}>
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ position, size, factor}) => {

  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
  })

  
  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size}/>
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={factor} color={"lightyellow"} />
    </mesh>
  )
}

const Scene = () => {

  return(
    <>
      <directionalLight position={[0, 0, 2]} intensity={0.5} color={'blue'} />
      <ambientLight intensity={0.1} />
      <spotLight position={[0,3,0]} intensity={8} color={'violet'} />

      {/* <group position={[0,-1,0]}>
        <Cube position={[1,0,0]} color={'green'} size={[1,1,1]} />
        <Cube position={[-1,0,0]} color={'hotpink'} size={[1,1,1]} />
        <Cube position={[-1,2,0]} color={'blue'} size={[1,1,1]} />
        <Cube position={[1,2,0]} color={'yellow'} size={[1,1,1]} />
      </group> */}

      {/* <Cube position={[0,0,0]} size={[1,1,1]} color={"yellow"} /> */}

      <Sphere position={[0,0,0]} size={[1,30,30]} color={"yellow"} />
      <Torus position={[2,0,0]} size={[0.8, 0.1, 30, 30]} color={"darkviolet"} />
      <TorusKnot position={[-2,0,0]} size={[0.5, 0.1, 1000, 50]} factor={Math.sin(20)*5} />

      <OrbitControls zoomToCursor />
    </>
  )
}

const App = () => {

  return (
    <>
      <h1>Welcome to Witor's REACT + THREE.JS Demo</h1>
      <Canvas>
        <Scene />
      </Canvas> 
    </>
  )
}

export default App
