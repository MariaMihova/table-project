import Vue from "vue";
import Vuex from "vuex";
import ProductsApi from "../api/productsService.js";
import UsersApi from "../api/usersService.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [],
    products: [],
    users: [],
  },
  getters: {
    allProducts: (state) => {
      return state.products;
    },
    getProductById: (state) => (id) => {
      return state.products.length > 0
        ? state.products.find((p) => p.id === id)
        : null;
    },
    getCartProducts: (state) => {
      return state.cartProducts;
    },

    getUsers: (state) => {
      return state.users;
    },
    getUserById: (state) => (id) => {
      return state.users.length > 0
        ? state.users.find((u) => u.id === id)
        : null;
    },
  },
  mutations: {
    addProductToCart(state, item) {
      state.cartProducts.push(item);
    },
    setProducts(state, data) {
      state.products = data;
    },
    editProduct(state, product) {
      const index = state.products.findIndex((p) => p.id === product.id);
      state.products[index] = { ...product };
    },
    setUsers(state, data) {
      state.users = [...data];
    },
  },
  actions: {
    async allProducts({ commit }) {
      const responseData = await ProductsApi.getAllProducts();
      const data = await responseData.json();
      commit("setProducts", data);
    },
    async editProduct({ commit, state }, product) {
      const responseData = await ProductsApi.editProduct(product);
      if (responseData.ok) {
        commit("editProduct", product);
      }
    },
    async populateUsers({ commit }) {
      const responseData = await UsersApi.getUsers();
      const data = await responseData.json();
      commit("setUsers", data);
    },
  },
});

export default store;
