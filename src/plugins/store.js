import Vue from "vue";
import Vuex from "vuex";
import ProductsApi from "../api/productsService.js";
import UsersApi from "../api/usersService.js";
import CategoriesApi from "../api/categoriesService.js";
import ArtWork from "../helpers/Art.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [],
    products: [], // do not change
    users: [],
    categories: [],
    filters: {
      categories: [],
      priceRange: null,
      userId: null,
    },
    sort: "",
    clearFilter: false,
  },
  getters: {
    allProducts: (state) => {
      let products = state.products;
      if (state.filters && state.filters.categories.length > 0) {
        products = products.filter((p) => {
          for (let i = 0; i <= state.filters.categories.length; i++) {
            if (p.category === state.filters.categories[i]) {
              return true;
            }
          }
          return false;
        });
      }
      if (state.filters && state.filters.priceRange) {
        products = products.filter(
          (p) =>
            p.price > state.filters.priceRange.min &&
            p.price < state.filters.priceRange.max
        );
      }
      if (state.filters && state.filters.userId) {
        products = products.filter((p) => p.userId === state.filters.userId);
      }

      if (state.sort) {
        switch (state.sort) {
          case "asc":
            products.sort((a, b) => a.price - b.price);
            break;
          case "des":
            products.sort((a, b) => b.price - a.price);
            break;
          default:
            products.sort((a, b) =>
              typeof a[state.sort] === "number"
                ? a[state.sort] - b[state.sort]
                : a[state.sort].localeCompare(b[state.sort])
            );
        }
      }

      if (state.clearFilter) {
        products = state.products;
      }

      return products;
    },

    getProductById: (state) => (id) => {
      return state.products.length > 0
        ? state.products.find((p) => p.id === id)
        : null;
    },
    getFurstTenProducts: (state) => {
      return state.products.slice(0, 10);
    },

    filterbyCategory: (state) => (categoryName) => {
      return state.products.filter((p) => p.category === categoryName);
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

    getCategories: (state) => {
      return state.categories;
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
    setCategories(state, data) {
      state.categories = [...data];
    },

    setSort: (state, propName) => {
      state.sort = propName;
    },

    setFilterCategory: (state, filters) => {
      state.filters.categories = filters;
    },
    setFilterPriceRange: (state, range) => {
      state.filters.priceRange = { min: range[0], max: range[1] }; //range = {min: number, max: number}
    },
    setFilterUserId: (state, id) => {
      state.filters.userId = id;
    },
  },
  actions: {
    async allProducts({ commit }) {
      const responseData = await ProductsApi.getAllProducts();
      const data = await responseData.json();
      commit("setProducts", data);
    },
    async editProduct(context, product) {
      const responseData = await ProductsApi.editProduct(product);
      if (responseData.ok) {
        context.commit("editProduct", product);
      }
    },
    async populateUsers({ commit }) {
      const responseData = await UsersApi.getUsers();
      const data = await responseData.json();
      commit("setUsers", data);
    },

    async populateCategories({ commit }) {
      const responseData = await CategoriesApi.getAllCategories();
      const data = await responseData.json();
      commit("setCategories", data);
    },
  },
});

export default store;
