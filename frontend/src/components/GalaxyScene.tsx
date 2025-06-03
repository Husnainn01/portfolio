'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Html as DreiHtml } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tilt: number;
  textureUrl?: string;
  onClick: () => void;
  hasRings?: boolean;
  ringColor?: string;
  icon?: string;
}

// Planet component with orbits around the sun
const Planet: React.FC<PlanetProps> = ({ 
  position, 
  name, 
  color, 
  size, 
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  tilt,
  textureUrl,
  onClick,
  hasRings,
  ringColor,
  icon
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [initialAngle] = useState(Math.random() * Math.PI * 2);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Orbit around the center (sun)
      const angle = initialAngle + clock.getElapsedTime() * orbitSpeed;
      groupRef.current.position.x = Math.sin(angle) * orbitRadius;
      groupRef.current.position.z = Math.cos(angle) * orbitRadius;
    }
    
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[tilt, 0, 0]}>
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.3}
        />
        
        {/* Tech stack label */}
        <DreiHtml 
          position={[0, size + 0.3, 0]} 
          center 
          distanceFactor={15}
          occlude
        >
          <div className={`
            transform transition-all duration-300 ease-in-out
            ${hovered ? 'scale-110' : 'scale-100'}
            px-3 py-1.5 rounded-full bg-darkBlue/90 backdrop-blur-sm
            border border-lightBlue/40 shadow-lg shadow-lightBlue/20
            flex items-center gap-2
          `}>
            {icon && (
              <span className="text-sm">{icon}</span>
            )}
            <span className="text-white font-medium whitespace-nowrap text-sm">
              {name}
            </span>
          </div>
        </DreiHtml>
      </mesh>
      
      {/* Orbit path indicator */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.025, orbitRadius + 0.025, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Rings for specific planets */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
          <meshBasicMaterial color={ringColor || "#f9c087"} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Sun component at the center
const Sun: React.FC<{ size: number, color: string }> = ({ size, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle sun rotation
      meshRef.current.rotation.y += 0.002;
      
      // Pulsing effect
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} />
      
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[size * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1} 
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 1.5, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.05} 
        />
      </mesh>
      
      {/* Sun rays/corona */}
      <pointLight color={color} intensity={2} distance={100} decay={2} />
    </mesh>
  );
};

// Technology icons using emoji as placeholders (you could replace with SVG icons)
const techIcons: Record<string, string> = {
  'React': '⚛️',
  'Next.js': '▲',
  'Node.js': '📦',
  'MongoDB': '🍃',
  'Tailwind': '🌊',
  'TypeScript': '🔷',
  'JavaScript': '🟨',
  'HTML/CSS': '🌐',
};

const SolarSystemScene: React.FC = () => {
  // Define tech stack "planets" with their properties
  const techPlanets = [
    { 
      name: 'React', 
      position: [1, 0, 0] as [number, number, number], 
      color: '#61DAFB',
      size: 0.2,
      orbitRadius: 2.5,
      orbitSpeed: 0.05,
      rotationSpeed: 0.008,
      tilt: 0.2,
      icon: techIcons['React'],
    },
    { 
      name: 'Next.js', 
      position: [1.5, 0, 0] as [number, number, number], 
      color: '#FFFFFF',
      size: 0.18,
      orbitRadius: 3.5,
      orbitSpeed: 0.035,
      rotationSpeed: 0.006,
      tilt: 0.1,
      icon: techIcons['Next.js'],
    },
    { 
      name: 'TypeScript', 
      position: [2, 0, 0] as [number, number, number], 
      color: '#3178C6',
      size: 0.19,
      orbitRadius: 4.5,
      orbitSpeed: 0.025,
      rotationSpeed: 0.007,
      tilt: 0.15,
      icon: techIcons['TypeScript'],
    },
    { 
      name: 'Node.js', 
      position: [2.5, 0, 0] as [number, number, number], 
      color: '#68A063',
      size: 0.22,
      orbitRadius: 5.5,
      orbitSpeed: 0.02,
      rotationSpeed: 0.005,
      tilt: 0.1,
      icon: techIcons['Node.js'],
    },
    { 
      name: 'MongoDB', 
      position: [3, 0, 0] as [number, number, number], 
      color: '#4DB33D',
      size: 0.21,
      orbitRadius: 6.5,
      orbitSpeed: 0.015,
      rotationSpeed: 0.004,
      tilt: 0.2,
      icon: techIcons['MongoDB'],
    },
    { 
      name: 'Tailwind', 
      position: [3.5, 0, 0] as [number, number, number], 
      color: '#38B2AC',
      size: 0.18,
      orbitRadius: 7.5,
      orbitSpeed: 0.012,
      rotationSpeed: 0.006,
      tilt: 0.15,
      hasRings: true,
      ringColor: '#0EA5E9',
      icon: techIcons['Tailwind'],
    },
    { 
      name: 'JavaScript', 
      position: [4, 0, 0] as [number, number, number], 
      color: '#F7DF1E',
      size: 0.24,
      orbitRadius: 8.5,
      orbitSpeed: 0.01,
      rotationSpeed: 0.008,
      tilt: 0.2,
      icon: techIcons['JavaScript'],
    },
    { 
      name: 'HTML/CSS', 
      position: [4.5, 0, 0] as [number, number, number], 
      color: '#E34F26',
      size: 0.2,
      orbitRadius: 9.5,
      orbitSpeed: 0.008,
      rotationSpeed: 0.005,
      tilt: 0.1,
      hasRings: true,
      ringColor: '#264DE3',
      icon: techIcons['HTML/CSS'],
    },
  ];

  const handleTechClick = (name: string) => {
    console.log(`Clicked on ${name}`);
    // Add navigation logic here if needed
  };

  // Adjust camera based on window size
  const CameraController = () => {
    const { camera } = useThree();
    
    useEffect(() => {
      camera.position.set(0, 8, 16);
      camera.lookAt(0, 0, 0);
    }, [camera]);
    
    return null;
  };

  return (
    <div className="w-full h-screen">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]} // Better performance on high-DPI screens
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <CameraController />
        
        {/* Scene lighting */}
        <ambientLight intensity={0.1} />
        
        {/* Background stars */}
        <Stars 
          radius={120} 
          depth={60} 
          count={5000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.2} 
        />
        
        {/* Sun at the center (representing core skills or central technology) */}
        <Sun size={0.8} color="#FDB813" />
        
        {/* Tech planets */}
        {techPlanets.map((tech, index) => (
          <Planet
            key={index}
            position={tech.position}
            name={tech.name}
            color={tech.color}
            size={tech.size}
            orbitRadius={tech.orbitRadius}
            orbitSpeed={tech.orbitSpeed}
            rotationSpeed={tech.rotationSpeed}
            tilt={tech.tilt}
            hasRings={tech.hasRings}
            ringColor={tech.ringColor}
            icon={tech.icon}
            onClick={() => handleTechClick(tech.name)}
          />
        ))}
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.3}
          zoomSpeed={0.5}
          minDistance={3}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.1}
        />
      </Canvas>
    </div>
  );
};

export default SolarSystemScene; 