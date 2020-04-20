import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ICartItem } from "../interfaces";
import cartItems from "@/cart-items.js";

@Module({ name: "Shop", namespaced: true })
class Shop extends VuexModule {
  public cartItems: ICartItem[] = cartItems;
  public total;
  public amount;

  get averagePrice() {
    return (this.total / this.amount).toFixed(2);
  }
  constructor() {
    super({});
    this.getTotalAndAmount();
  }

  @Mutation
  public clearCart(value): void {
    this.cartItems = value;
  }
  @Action({ rawError: true, commit: "clearCart" })
  public clrCart() {
    return [];
  }

  //alternative way
  // @Action({ rawError: true })
  // public clrCart() {
  //   this.context.commit("clearCart", []);
  // }

  @Action({ rawError: true, commit: "removeItem" })
  public rmvItem(id) {
    return id;
  }
  @Mutation
  public removeItem(id) {
    const newCartItems = this.cartItems.filter((cartItem) => {
      return cartItem.id !== id;
    });
    this.cartItems = newCartItems;
  }
  @Action({ rawError: true, commit: "increaseAmount" })
  incrAmount(id) {
    return id;
  }
  @Mutation
  increaseAmount(id) {
    const items = this.cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    this.cartItems = items;
  }
  @Action({ rawError: true, commit: "decreaseAmount" })
  decrAmount(obj) {
    return obj;
  }
  @Mutation
  decreaseAmount(payload) {
    const items = this.cartItems.map((cartItem) => {
      if (cartItem.id === payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });
    this.cartItems = items;
  }
  @Action({ rawError: true, commit: "getTotalAndAmount" })
  getTotAmount() {
    return;
  }
  @Mutation
  getTotalAndAmount() {
    //eslint-disable-next-line
    let { total, amount } = this.cartItems.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        const itemTot = price * amount;
        cartTotal.total += itemTot;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = +total.toFixed(2);
    this.amount = amount;
    this.total = total;
  }
}
export default Shop;
