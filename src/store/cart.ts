import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  description: string
  quantity: number
  quantityCart: number
  price: number
}

interface CartState {
  products: Product[]
  addProduct: (product: Product) => void,
  updateQuantity: (id: number, typeAction: 'add' | 'subtract') => void
  removeProduct: (id: number) => void
  removeAllProducts: () => void
}

export const useCart = create<CartState>()(
  persist((set, get) => ({
    products: [],
    addProduct: (product: Product) => set((state) => ({ products: [...state.products, product] })),
    updateQuantity: (id: number, typeAction: 'add' | 'subtract') => set((state) => ({
      products: state.products.map((product) => {
        if (product.id === id) {

          if (typeAction === 'add') {
            if (product.quantityCart === product.quantity) {
              alert('Quantidade máxima atingida')
              return product
            }
            product.quantityCart = product.quantityCart + 1
          }
          else if (typeAction === 'subtract') {
            product.quantityCart = product.quantityCart - 1
          }

        }
        return product
      }
      )
    })),
    removeProduct: (id: number) => set((state) => ({
      products: state.products.filter((product) => product.id !== id)
    })),
    removeAllProducts: () => set((state) => ({
      products: []
    }))
  }),
    {
      name: 'cart-storage'
    })
)