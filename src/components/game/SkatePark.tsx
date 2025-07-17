import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Plane } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Users, Zap, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import * as THREE from 'three'

interface SkateboardProps {
  position: [number, number, number]
}

function Skateboard({ position }: SkateboardProps) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Deck */}
      <Box args={[2, 0.1, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      {/* Wheels */}
      <Box args={[0.2, 0.2, 0.2]} position={[-0.7, -0.2, 0.25]}>
        <meshStandardMaterial color="#333" />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[-0.7, -0.2, -0.25]}>
        <meshStandardMaterial color="#333" />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[0.7, -0.2, 0.25]}>
        <meshStandardMaterial color="#333" />
      </Box>
      <Box args={[0.2, 0.2, 0.2]} position={[0.7, -0.2, -0.25]}>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  )
}

function Ramp({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[4, 0.2, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#666" />
      </Box>
      <Box args={[4, 2, 0.2]} position={[0, 1, -4]}>
        <meshStandardMaterial color="#555" />
      </Box>
    </group>
  )
}

function SkateScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      {/* Ground */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>

      {/* Skate Park Elements */}
      <Ramp position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Ramp position={[10, 0, 5]} rotation={[0, Math.PI / 4, 0]} />
      <Ramp position={[-8, 0, -3]} rotation={[0, -Math.PI / 6, 0]} />

      {/* Rails */}
      <Box args={[8, 0.1, 0.1]} position={[0, 1, 8]}>
        <meshStandardMaterial color="#888" />
      </Box>
      <Box args={[6, 0.1, 0.1]} position={[-5, 0.5, -8]}>
        <meshStandardMaterial color="#888" />
      </Box>

      {/* Skateboard */}
      <Skateboard position={[2, 0.5, 2]} />

      {/* Text */}
      <Text
        position={[0, 5, -10]}
        fontSize={2}
        color="#FF6B35"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bebas-neue.woff"
      >
        SKATE PARK
      </Text>

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

interface SkateParKProps {
  onNavigate: (scene: string) => void
  player: any
}

export function SkatePark({ onNavigate, player }: SkateParKProps) {
  const [trickCombo, setTrickCombo] = useState(0)
  const [score, setScore] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [isPerformingTrick, setIsPerformingTrick] = useState(false)

  const tricks = [
    { key: 'Q', name: 'Ollie', difficulty: 1, points: 100 },
    { key: 'W', name: 'Kickflip', difficulty: 2, points: 250 },
    { key: 'E', name: '360 Flip', difficulty: 3, points: 500 },
    { key: 'R', name: 'Heelflip', difficulty: 2, points: 300 },
    { key: 'T', name: 'Varial', difficulty: 3, points: 400 }
  ]

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const trick = tricks.find(t => t.key.toLowerCase() === event.key.toLowerCase())
      if (trick && energy >= trick.difficulty * 10) {
        performTrick(trick)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [energy, isPerformingTrick, trickCombo]) // Include relevant state dependencies

  const performTrick = (trick: any) => {
    if (isPerformingTrick) return

    setIsPerformingTrick(true)
    setEnergy(prev => Math.max(0, prev - trick.difficulty * 10))
    
    // Simulate trick success/failure
    const success = Math.random() > 0.3
    
    if (success) {
      setScore(prev => prev + trick.points * (trickCombo + 1))
      setTrickCombo(prev => prev + 1)
    } else {
      setTrickCombo(0)
    }

    setTimeout(() => {
      setIsPerformingTrick(false)
    }, 1000)
  }

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(100, prev + 2))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black relative">
      {/* 3D Scene */}
      <Canvas camera={{ position: [10, 8, 10], fov: 60 }}>
        <SkateScene />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="flex justify-between items-start p-4 pointer-events-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('menu')}
            className="text-white hover:text-orange-500 bg-black/50 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2" size={20} />
            Exit Park
          </Button>

          <div className="flex gap-4">
            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-3">
              <div className="flex items-center gap-2 text-white">
                <Trophy className="text-orange-500" size={20} />
                <span className="font-bold">{score.toLocaleString()}</span>
              </div>
            </Card>
            
            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-3">
              <div className="flex items-center gap-2 text-white">
                <Zap className="text-yellow-500" size={20} />
                <span className="font-bold">{trickCombo}x</span>
              </div>
            </Card>

            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-3">
              <div className="flex items-center gap-2 text-white">
                <Coins className="text-green-500" size={20} />
                <span className="font-bold">${player?.money || 0}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom UI */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <div className="flex justify-between items-end">
            {/* Energy Bar */}
            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-4 w-64">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-yellow-500" size={16} />
                <span className="text-white font-semibold">Energy</span>
              </div>
              <Progress value={energy} className="h-2" />
            </Card>

            {/* Trick Controls */}
            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-4">
              <h3 className="text-white font-bold mb-3">Tricks</h3>
              <div className="grid grid-cols-5 gap-2">
                {tricks.map((trick) => (
                  <div
                    key={trick.key}
                    className={`text-center p-2 rounded border ${
                      energy >= trick.difficulty * 10
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                  >
                    <div className="text-white font-bold text-lg">{trick.key}</div>
                    <div className="text-xs text-gray-300">{trick.name}</div>
                    <div className="text-xs text-orange-400">{trick.points}pts</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">
                Press keys to perform tricks
              </p>
            </Card>

            {/* Controls Help */}
            <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-4">
              <h3 className="text-white font-bold mb-2">Controls</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <div>WASD - Move camera</div>
                <div>Mouse - Look around</div>
                <div>Q/W/E/R/T - Tricks</div>
                <div>Scroll - Zoom</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Trick Feedback */}
        {isPerformingTrick && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-6xl font-bold text-orange-500 text-center">
              SICK!
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}