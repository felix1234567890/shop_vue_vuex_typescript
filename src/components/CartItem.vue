<template>
  <div class="cart-item">
    <img :src="cartItem.img" :alt="cartItem.title" />
    <div>
      <h4>{{ cartItem.title }}</h4>
      <h4 class="item-price">${{ cartItem.price }}</h4>

      <button class="remove-btn" @click="removeCartItem(cartItem.id)">remove</button>
    </div>
    <div>
      <button class="amount-btn" @click="increaseAmount(cartItem.id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
        </svg>
      </button>

      <p class="amount">{{ cartItem.amount }}</p>

      <button
        class="amount-btn"
        @click="decreaseAmount(cartItem.id, cartItem.amount)"
        :disabled="cartItem.amount === 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
import { ICartItem } from '../interfaces'
const { cartItem } = defineProps<{ cartItem: ICartItem }>()

const { removeItem, incrAmount, decrAmount } = useShopStore()

function removeCartItem(id: number): void {
  removeItem(id)
}

function increaseAmount(id: number): void {
  incrAmount(id)
}

function decreaseAmount(id: number, amount: number): void {
  if (amount > 1) {
    decrAmount({ id })
  }
}
</script>
