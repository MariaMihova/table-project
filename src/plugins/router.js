import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Products from "../components/Products.vue";
import Cart from "../components/Cart.vue";
import EditProduct from "../components/EditProduct.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/products/edit/:id",
    // name: "Edit Product",
    component: EditProduct,
  },
];

const router = new Router({
  mode: "history",
  routes: routes,
});

export default router;
