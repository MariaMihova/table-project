<template>
  <div id="BatInc">
    <Popup
      v-bind:isOpen="popup"
      v-bind:toEdit="editProduct"
      @close="closeForm"
    ></Popup>
    <Details
      v-bind:isOpen="userPopup"
      v-bind:toEdit="user"
      @close="closeForm"
    ></Details>
    <Details
      v-bind:isOpen="detailsPopup"
      v-bind:toEdit="product"
      @close="closeForm"
    ></Details>

    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <template>
      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:[`item.userId`]="{ item }">
          <v-btn v-if="item.userId" small @click="showUser(item)">
            {{ item.userId }}
          </v-btn>
        </template>
        <template v-slot:[`item.details`]="{ item }">
          <v-btn small @click="showDetails(item)"> Details </v-btn>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn small @click="editItem(item)"> Edit </v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import Details from "./Details.vue";
import ProductsApi from "../aip/productsService.js";
import UsersApi from "../aip/usersService.js";
import ProductsViews from "../viewModels/productsViews.js";
import UsersViews from "../viewModels/usersViews.js";

export default {
  components: {
    Popup,
    Details,
  },

  data() {
    return {
      editProduct: null,
      user: null,
      product: null,
      popup: false,
      userPopup: false,
      detailsPopup: false,
      search: "",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
      ],
      products: [],
    };
  },

  async mounted() {
    const responseData = await ProductsApi.getAllProducts();
    const data = await responseData.json();
    this.products = ProductsViews.populateProducts(data);
    for (let prop in this.products[0]) {
      this.headers.push({ text: prop, value: prop });
    }

    this.headers.push({ text: "Details", value: "details" });
    this.headers.push({ text: "Edit", value: "action" });
  },

  methods: {
    async showDetails(item) {
      const responseData = await ProductsApi.getProductById(item.id);
      const data = await responseData.json();
      if (data.userId) {
        const userResponseData = await UsersApi.getUserById(data.userId);
        const userData = await userResponseData.json();
        this.user = UsersViews.userDetails(userData);
        this.product = ProductsViews.productDetails(data, this.user.name);
      } else {
        this.product = ProductsViews.productDetails(data);
      }

      this.detailsPopup = true;
    },

    async editItem(item) {
      const responseData = await ProductsApi.getProductById(item.id);
      const data = await responseData.json();
      this.editProduct = data;
      this.popup = true;
    },

    async closeForm(e) {
      this.popup = false;

      if (e.id && !this.userPopup) {
        console.log(await ProductsApi.editProduct(e));
      }
      this.userPopup = false;
      this.detailsPopup = false;
      this.user = null;
      this.editProduct = null;
      this.product = null;
    },

    async showUser(product) {
      if (product.userId) {
        const responseData = await UsersApi.getUserById(product.userId);
        const data = await responseData.json();
        this.user = UsersViews.userDetails(data);
        this.userPopup = true;
      }
    },
  },
};
</script>

<style>
#BatInc {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#BatInc td,
#BatInc th {
  border: 1px solid #ddd;
  padding: 8px;
}

#BatInc tr:nth-child(even) {
  background-color: #f2f2f2;
}

#BatInc tr:hover {
  background-color: #ddd;
}

#BatInc th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

button {
  background-color: #04aa6d;
}

form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
#base {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  color: #555;
  font-size: 1em;
}
</style>
