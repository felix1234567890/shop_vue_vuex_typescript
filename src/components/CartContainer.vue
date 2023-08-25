<template>
  <div>
    <section class="cart">
      <header>
        <h2>your bag</h2>
        <h4 v-if="isCartEmpty" class="empty-cart">is currently empty</h4>
      </header>

      <article v-for="item in cartItems" :key="item.id">
        <CartItem :cartItem="item" />
      </article>

      <footer v-if="!isCartEmpty">
        <hr />
        <div class="cart-total">
          <h4>
            total
            <span>${{ total }}</span>
          </h4>
        </div>
        <button class="btn clear-btn" @click="clearCart">clear cart</button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import CartItem from './CartItem.vue'
import { useShopStore } from '../stores/shop' // Create this composables as explained before
import { storeToRefs } from 'pinia'
const { clearCart } = useShopStore()

const { total, cartItems, isCartEmpty } = storeToRefs(useShopStore())
</script>
