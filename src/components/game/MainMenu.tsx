import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, User, Settings, Trophy, Users, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface MainMenuProps {
  onNavigate: (scene: string) => void
  playerName?: string
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const menuItems = [
    {
      id: 'skate_park',
      label: 'Enter Skate Park',
      icon: Play,
      description: 'Start skating and practice tricks',
      primary: true
    },
    {
      id: 'character_creation',
      label: playerName ? 'Edit Character' : 'Create Character',
      icon: User,
      description: 'Customize your skater'
    },
    {
      id: 'trick_academy',
      label: 'Trick Academy',
      icon: Trophy,
      description: 'Learn new skateboarding tricks'
    },
    {
      id: 'skateshop',
      label: 'Skate Shop',
      icon: ShoppingBag,
      description: 'Buy gear and equipment'
    },
    {
      id: 'social_hub',
      label: 'Social Hub',
      icon: Users,
      description: 'Meet friends and chat'
    },
    {
      id: 'career_hub',
      label: 'Career Hub',
      icon: Settings,
      description: 'Choose your path'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-teal-400 bg-clip-text text-transparent mb-4">
            SKATE LIFE 3D
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            Skateboarding RPG Adventure
          </p>
          {playerName && (
            <p className="text-lg text-teal-400 mt-2">
              Welcome back, {playerName}!
            </p>
          )}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`game-card p-6 cursor-pointer transition-all duration-300 ${
                    item.primary ? 'col-span-full md:col-span-2 lg:col-span-3' : ''
                  } ${
                    hoveredButton === item.id
                      ? 'border-orange-500/50 shadow-lg shadow-orange-500/20'
                      : 'hover:border-teal-500/30'
                  }`}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => onNavigate(item.id)}
                >
                  <div className={`flex items-center ${item.primary ? 'justify-center' : 'flex-col'} gap-4`}>
                    <div className={`${item.primary ? 'text-orange-500' : 'text-teal-400'} ${item.primary ? 'text-4xl' : 'text-3xl'}`}>
                      <Icon size={item.primary ? 48 : 32} />
                    </div>
                    <div className={item.primary ? 'text-center' : 'text-center'}>
                      <h3 className={`font-bold ${item.primary ? 'text-2xl md:text-3xl' : 'text-xl'} text-white mb-2`}>
                        {item.label}
                      </h3>
                      <p className={`text-gray-400 ${item.primary ? 'text-lg' : 'text-sm'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Use WASD to move • Space to jump • Mouse to look around
          </p>
        </motion.div>
      </div>
    </div>
  )
}