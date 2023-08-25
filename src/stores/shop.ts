import { defineStore } from 'pinia'
import cartItems from '../cart-items.js'

export interface ICartItem {
  id: number
  title: string
  price: number
  img?: string
  amount: number
}

type State = {
  cartItems: ICartItem[]
}
export const useShopStore = defineStore('shop', {
  state: (): State => ({
    cartItems,
  }),
  getters: {
    isCartEmpty({ cartItems }) {
      return !Boolean(cartItems.length)
    },
    averagePrice() {
      return (this.total / this.amount).toFixed(2)
    },
    total({cartItems}){
      const {total} = getTotAmount(cartItems) 
      return total
    },
    amount({cartItems}){
      const {amount} = getTotAmount(cartItems) 
      return amount
    },
    
  },
  actions: {
    clearCart() {
      this.cartItems = []
    },
    removeItem(id: number) {
      const newCartItems = this.cartItems.filter((cartItem) => cartItem.id !== id)
      this.cartItems = newCartItems
    },
    incrAmount(id: number) {
      const items = this.cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 }
        }
        return cartItem
      })
      this.cartItems = items
    },
    decrAmount(payload: { id: number }) {
      const items = this.cartItems.map((cartItem) => {
        if (cartItem.id === payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      this.cartItems = items
    },
  }
})
const getTotAmount = (cartItems)=> {
  let { total, amount } = cartItems.reduce(
    (cartTotal, cartItem) => {
      const { price, amount } = cartItem
      cartTotal.amount += amount
      const itemTot = price * amount
      cartTotal.total += itemTot
      return cartTotal
    },
    { total: 0, amount: 0 }
  )

  total = +total.toFixed(2)
  return {total, amount}
}