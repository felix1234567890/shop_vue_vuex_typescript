<template>
  <div v-if="cartItems.length === 0">
    <section class="cart">
      <header>
        <h2>your bag</h2>
        <h4 class="empty-cart">is currently empty</h4>
      </header>
    </section>
  </div>
  <div v-else>
    <section class="cart">
      <header>
        <h2>your bag</h2>
      </header>

      <article v-for="item in cartItems" :key="item.id">
        <CartItem :cartItem="item" />
      </article>

      <footer>
        <hr />
        <div class="cart-total">
          <h4>
            total
            <span>${{ total }}</span>
          </h4>
        </div>
        <button class="btn clear-btn" @click.prevent="clrCart">clear cart</button>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { ICartItem } from "../interfaces";
import CartItem from "./CartItem.vue";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const shop = namespace("Shop");
import { getModule } from "vuex-module-decorators";
import Shop from "../store/shop";
@Component({
  components: {
    CartItem
  }
})
export default class CartContainer extends Vue {
  @shop.State
  public total!: number;

  @shop.State
  public cartItems!: ICartItem[];

  private shop: Shop;

  constructor() {
    super();
    this.shop = getModule(Shop, this.$store);
  }
  updated() {
    this.shop.getTotAmount();
  }

  public clrCart() {
    this.shop.clrCart();
  }
}
</script>

<style></style>
