import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  setAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User) => void
  signOut: () => void
}

export const useAuth = create<AuthState>()(
  persist((set, get) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set({ user }),
    setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    signOut: () => {
      localStorage.removeItem('cart-storage')
      set({ isAuthenticated: false, user: null })
    }
  }),
    {
      name: 'auth-storage',
    }
  )
)