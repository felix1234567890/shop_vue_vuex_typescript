import Vue from "vue";
import Vuex from "vuex";
import Shop from "./shop";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Shop,
  },
});
