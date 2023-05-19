<template>
  <div id="BatInc">
    <Popup
      v-bind:isOpen="popup"
      v-bind:toEdit="editProduct"
      @close="closeForm"
    ></Popup>
    <Popup
      v-bind:isOpen="userPopup"
      v-bind:toEdit="user"
      @close="closeForm"
    ></Popup>

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
        <template v-slot:[`item.action`]="{ item }">
          <v-btn small @click="editItem(item)"> Edit </v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import ProductsApi from "../aip/productsService.js";
import ProductsViews from "../viewModels/productsViews.js";
import UsersViwes from "../viewModels/usersViews.js";

export default {
  components: {
    Popup,
  },

  data() {
    return {
      editProduct: null,
      user: null,
      popup: false,
      userPopup: false,
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
    this.products = await ProductsViews.populateProducts(responseData.json());
    for (let prop in this.products[0]) {
      this.headers.push({ text: prop, value: prop });
    }

    this.headers.push({ text: "Edit", value: "action" });
  },

  methods: {
    editItem(item) {
      this.editProduct = item;
      this.popup = true;
    },

    async closeForm(e) {
      this.popup = false;

      if (e.id && !this.userPopup) {
        console.log(await ProductsViews.editProduct(e));
      }
      this.userPopup = false;
      this.user = null;
      this.editProduct = null;
    },

    async showUser(product) {
      if (product.userId) {
        this.user = await UsersViwes.findUserById(product.userId);
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
</style>
