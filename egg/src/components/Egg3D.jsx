import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Egg3D = ({ isRunning, progress, level }) => {
  const meshRef = useRef();
  
  // Calculate yolk color based on progress and level
  const yolkColor = useMemo(() => {
    if (progress === 100) return '#FF9F1C';
    return '#FFD60A';
  }, [progress]);

  useFrame((state) => {
    if (meshRef.current) {
      if (isRunning) {
        // Subtle boiling vibration
        meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 10) * 0.02;
        meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 5) * 0.05;
      } else {
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow receiveShadow scale={[1, 1.35, 1]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.1} 
            metalness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Inner Yolk (Visible when cracked or via transparency?) 
            For now, let's add a glowing core effect to represent the heat */}
        <mesh scale={[0.4, 0.5, 0.4]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={yolkColor} 
            emissive={yolkColor} 
            emissiveIntensity={isRunning ? 2 : 0.5}
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </Float>

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      <Environment preset="city" />
    </>
  );
};

export default Egg3D;
