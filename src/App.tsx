import { useState, useEffect, useCallback } from 'react'
import { MainMenu } from './components/game/MainMenu'
import { CharacterCreation } from './components/game/CharacterCreation'
import { SkatePark } from './components/game/SkatePark'
import { GameState, Player } from './types/game'
import blink from './blink/client'
import { Toaster } from 'sonner'

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'menu',
    player: null,
    isLoading: true
  })

  const [user, setUser] = useState<any>(null)

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setGameState(prev => ({ ...prev, isLoading: state.isLoading }))
    })
    return unsubscribe
  }, [])

  // Load player data when user is authenticated
  useEffect(() => {
    if (user) {
      loadPlayerData()
    }
  }, [user, loadPlayerData])

  const loadPlayerData = useCallback(async () => {
    if (!user) return
    try {
      const players = await blink.db.players.list({
        where: { userId: user.id },
        limit: 1
      })

      if (players.length > 0) {
        setGameState(prev => ({ ...prev, player: players[0] }))
      }
    } catch (error) {
      console.error('Failed to load player data:', error)
    }
  }, [user])

  const handleNavigate = (scene: string) => {
    setGameState(prev => ({ ...prev, currentScene: scene }))
  }

  const handleSaveCharacter = async (characterData: any) => {
    try {
      if (gameState.player) {
        // Update existing character
        await blink.db.players.update(gameState.player.id, {
          name: characterData.name,
          avatar: characterData.avatar,
          updatedAt: new Date().toISOString()
        })
      } else {
        // Create new character
        const newPlayer = await blink.db.players.create({
          userId: user.id,
          name: characterData.name,
          level: 1,
          experience: 0,
          money: 1000, // Starting money
          careerPath: 'none',
          avatar: characterData.avatar,
          stats: {
            trickLevel: 1,
            popularity: 0,
            shopExperience: 0
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        setGameState(prev => ({ ...prev, player: newPlayer }))
      }
      
      // Reload player data to get updated info
      await loadPlayerData()
      
      // Navigate back to menu
      handleNavigate('menu')
    } catch (error) {
      console.error('Failed to save character:', error)
      alert('Failed to save character. Please try again.')
    }
  }

  // Loading screen
  if (gameState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading Skate Life 3D...</h2>
          <p className="text-gray-400 mt-2">Preparing your skateboarding adventure</p>
        </div>
      </div>
    )
  }

  // Authentication required
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="font-display text-6xl font-bold bg-gradient-to-r from-orange-500 to-teal-400 bg-clip-text text-transparent mb-6">
            SKATE LIFE 3D
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Sign in to start your skateboarding adventure
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="game-button text-lg px-8 py-4"
          >
            Sign In to Play
          </button>
        </div>
      </div>
    )
  }

  // Render current scene
  const renderScene = () => {
    switch (gameState.currentScene) {
      case 'character_creation':
        return (
          <CharacterCreation
            onNavigate={handleNavigate}
            onSaveCharacter={handleSaveCharacter}
            existingCharacter={gameState.player}
          />
        )
      case 'skate_park':
        return (
          <SkatePark
            onNavigate={handleNavigate}
            player={gameState.player}
          />
        )
      case 'menu':
      default:
        return (
          <MainMenu
            onNavigate={handleNavigate}
            playerName={gameState.player?.name}
          />
        )
    }
  }

  return (
    <>
      {renderScene()}
      <Toaster position="top-right" />
    </>
  )
}

export default App