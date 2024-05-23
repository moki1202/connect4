import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface InGameNameStoreState {
  inGameName: string
  setInGameName: (name: string) => void
  loadInGameName: () => Promise<void>
}

const useInGameNameStore = create<InGameNameStoreState>((set) => ({
  inGameName: 'Player1',
  setInGameName: async (name: string) => {
    set({ inGameName: name })
    await AsyncStorage.setItem('inGameName', name)
  },
  loadInGameName: async () => {
    const name = await AsyncStorage.getItem('inGameName')
    if (name) {
      set({ inGameName: name })
    }
  },
}))

export default useInGameNameStore
