<template>
  <div class="cart-item">
    <img :src="cartItem.img" alt="{title}" />
    <div>
      <h4>{{cartItem.title}}</h4>
      <h4 class="item-price">${{cartItem.price}}</h4>

      <button class="remove-btn" @click="removeCartItem(cartItem.id)">remove</button>
    </div>
    <div>
      <button class="amount-btn" @click="increaseAmount(cartItem.id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
        </svg>
      </button>

      <p class="amount">{{cartItem.amount}}</p>

      <button
        class="amount-btn"
        @click="cartItem.amount === 1 ? removeCartItem(cartItem.id) : decreaseAmount(cartItem.id, cartItem.amount)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICartItem } from "../interfaces";
import { getModule } from "vuex-module-decorators";
import Shop from "../store/shop";
@Component
export default class CartItem extends Vue {
  @Prop({
    type: Object
  })
  readonly cartItem!: ICartItem;
  private shop: Shop;

  constructor() {
    super();
    this.shop = getModule(Shop, this.$store);
  }

  public removeCartItem(id): void {
    this.shop.rmvItem(id);
  }
  increaseAmount(id): void {
    this.shop.incrAmount(id);
  }
  decreaseAmount(id, amount): void {
    this.shop.decrAmount({ id, amount });
  }
}
</script>

<style>
</style>