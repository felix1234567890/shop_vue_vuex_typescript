<template>
  <div id="app">
    <main>
      <Navbar />
      <CartContainer :cartItems="cartItems" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import CartContainer from '@/components/CartContainer.vue';
import { useShopStore } from './stores/shop';
import { storeToRefs } from 'pinia';

const { cartItems } = storeToRefs(useShopStore())

</script>