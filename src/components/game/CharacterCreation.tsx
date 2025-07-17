import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CharacterCreationProps {
  onNavigate: (scene: string) => void
  onSaveCharacter: (character: any) => void
  existingCharacter?: any
}

export function CharacterCreation({ onNavigate, onSaveCharacter, existingCharacter }: CharacterCreationProps) {
  const [character, setCharacter] = useState({
    name: existingCharacter?.name || '',
    style: existingCharacter?.avatar?.style || 'casual',
    clothing: existingCharacter?.avatar?.clothing || 'hoodie',
    board: existingCharacter?.avatar?.board || 'classic'
  })

  const styles = [
    { id: 'casual', name: 'Casual', description: 'Relaxed street style' },
    { id: 'punk', name: 'Punk', description: 'Edgy and rebellious' },
    { id: 'retro', name: 'Retro', description: 'Old school vibes' },
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary' }
  ]

  const clothing = [
    { id: 'hoodie', name: 'Hoodie', description: 'Comfortable and warm' },
    { id: 'tshirt', name: 'T-Shirt', description: 'Classic and simple' },
    { id: 'tank', name: 'Tank Top', description: 'Cool and breathable' },
    { id: 'jacket', name: 'Jacket', description: 'Stylish outer layer' }
  ]

  const boards = [
    { id: 'classic', name: 'Classic', description: 'Traditional skateboard' },
    { id: 'street', name: 'Street', description: 'Perfect for tricks' },
    { id: 'cruiser', name: 'Cruiser', description: 'Smooth riding' },
    { id: 'longboard', name: 'Longboard', description: 'Speed and stability' }
  ]

  const handleSave = () => {
    if (!character.name.trim()) {
      alert('Please enter a character name!')
      return
    }

    onSaveCharacter({
      name: character.name,
      avatar: {
        style: character.style,
        clothing: character.clothing,
        board: character.board
      }
    })
  }

  const randomizeCharacter = () => {
    setCharacter({
      name: character.name,
      style: styles[Math.floor(Math.random() * styles.length)].id,
      clothing: clothing[Math.floor(Math.random() * clothing.length)].id,
      board: boards[Math.floor(Math.random() * boards.length)].id
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('menu')}
            className="text-white hover:text-orange-500"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Menu
          </Button>
          <h1 className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-teal-400 bg-clip-text text-transparent">
            {existingCharacter ? 'EDIT CHARACTER' : 'CREATE CHARACTER'}
          </h1>
          <div className="w-32" /> {/* Spacer */}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="game-card p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Character Preview</h2>
              
              {/* 3D Character Preview Placeholder */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-96 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {character.name.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                  <p className="text-white text-xl font-semibold">{character.name || 'Unnamed Skater'}</p>
                  <p className="text-gray-400 capitalize">{character.style} Style</p>
                </div>
              </div>

              <Button
                onClick={randomizeCharacter}
                className="w-full game-button-secondary"
              >
                <Shuffle className="mr-2" size={20} />
                Randomize Look
              </Button>
            </Card>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Name Input */}
            <Card className="game-card p-6">
              <Label htmlFor="name" className="text-white text-lg font-semibold mb-3 block">
                Character Name
              </Label>
              <Input
                id="name"
                value={character.name}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                placeholder="Enter your skater name..."
                className="bg-gray-800 border-gray-600 text-white text-lg"
                maxLength={20}
              />
            </Card>

            {/* Style Selection */}
            <Card className="game-card p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setCharacter({ ...character, style: style.id })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.style === style.id
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-white font-semibold">{style.name}</div>
                    <div className="text-gray-400 text-sm">{style.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Clothing Selection */}
            <Card className="game-card p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Clothing</h3>
              <div className="grid grid-cols-2 gap-3">
                {clothing.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCharacter({ ...character, clothing: item.id })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.clothing === item.id
                        ? 'border-teal-500 bg-teal-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-white font-semibold">{item.name}</div>
                    <div className="text-gray-400 text-sm">{item.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Board Selection */}
            <Card className="game-card p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Skateboard</h3>
              <div className="grid grid-cols-2 gap-3">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setCharacter({ ...character, board: board.id })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.board === board.id
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-white font-semibold">{board.name}</div>
                    <div className="text-gray-400 text-sm">{board.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full game-button text-lg py-4"
              disabled={!character.name.trim()}
            >
              <Save className="mr-2" size={20} />
              {existingCharacter ? 'Save Changes' : 'Create Character'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}