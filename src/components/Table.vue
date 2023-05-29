<template>
  <div id="BatInc">
    <EditProductModal
      v-if="modalManager.editProductPopup"
      v-bind:id="id"
      @close="closeForm"
    ></EditProductModal>
    <UserDetailsModal
      v-if="modalManager.userPopup"
      v-bind:id="id"
      @close="closeForm"
    ></UserDetailsModal>
    <ProductDetailsModal
      v-if="modalManager.detailsPopup"
      v-bind:id="id"
      @close="closeForm"
    ></ProductDetailsModal>

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
          <v-btn v-if="item.userId" small @click="showUser(item.userId)">
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
import EditProductModal from "./modals/EditProductModal.vue";
import ProductDetailsModal from "./modals/ProductDetailsModal.vue";
import UserDetailsModal from "./modals/UserDetailsModal.vue";
import ProductsApi from "../api/productsService.js";
import ProductsViews from "../viewModels/productsViews.js";

export default {
  components: {
    EditProductModal,
    ProductDetailsModal,
    UserDetailsModal,
  },

  data() {
    return {
      id: null,
      modalManager: {
        editProductPopup: false,
        userPopup: false,
        detailsPopup: false,
      },

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
    showDetails(item) {
      this.id = item.id;
      this.modalsStateManager("detailsPopup");
    },

    editItem(item) {
      this.id = item.id;
      this.modalsStateManager("editProductPopup");
    },
    showUser(id) {
      this.id = id;
      this.modalsStateManager("userPopup");
    },

    async closeForm(e) {
      if (this.modalManager.editProductPopup) {
        if (e.id) {
          console.log(await ProductsApi.editProduct(e));
        }
        this.modalsStateManager("editProductPopup");
      }

      if (this.modalManager.userPopup) {
        this.modalsStateManager("userPopup");
      }

      if (this.modalManager.detailsPopup) {
        this.modalsStateManager("detailsPopup");
      }
      this.id = null;
    },

    modalsStateManager(popupName) {
      this.modalManager[popupName] = !this.modalManager[popupName];
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
</style>
