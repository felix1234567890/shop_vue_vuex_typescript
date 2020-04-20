<template>
  <div id="app">
    <main>
      <Navbar />
      <CartContainer log-value="doSomething" />
    </main>
    <!-- <router-view/> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import CartContainer from "@/components/CartContainer.vue";
import cartItems from "./cart-items";
import { ICartItem } from "./interfaces";
@Component({
  components: {
    Navbar,
    CartContainer
  }
})
export default class App extends Vue {
  private cartItems: ICartItem[] = cartItems;
}
</script>
<style>
</style>
