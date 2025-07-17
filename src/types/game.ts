export interface Player {
  id: string
  userId: string
  name: string
  level: number
  experience: number
  money: number
  careerPath: 'none' | 'pro_skater' | 'shop_worker'
  avatar: {
    style: string
    clothing: string
    board: string
  }
  stats: {
    trickLevel: number
    popularity: number
    shopExperience: number
  }
  createdAt: string
  updatedAt: string
}

export interface Trick {
  id: string
  name: string
  difficulty: number
  category: 'basic' | 'intermediate' | 'advanced' | 'pro'
  description: string
  requiredLevel: number
  unlocked: boolean
}

export interface Friend {
  id: string
  playerId: string
  friendId: string
  friendshipLevel: number
  metAt: string
  createdAt: string
}

export interface ShopItem {
  id: string
  name: string
  category: 'deck' | 'wheels' | 'trucks' | 'bearings' | 'clothing' | 'accessories'
  price: number
  description: string
  stats?: {
    speed?: number
    grip?: number
    durability?: number
    style?: number
  }
  imageUrl?: string
}

export interface GameState {
  currentScene: 'menu' | 'character_creation' | 'skate_park' | 'skateshop' | 'career_hub' | 'trick_academy' | 'social_hub' | 'profile'
  player: Player | null
  isLoading: boolean
}