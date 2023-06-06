<template>
  <div id="BatInc">
    <EditProductModal
      v-if="modalManager.editProductPopup"
      v-bind:productId="selectedId"
      @close="closeForm"
    ></EditProductModal>
    <UserDetailsModal
      v-if="modalManager.userPopup"
      v-bind:userId="selectedId"
      @close="closeForm"
    ></UserDetailsModal>
    <ProductDetailsModal
      v-if="modalManager.detailsPopup"
      v-bind:productId="selectedId"
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
        v-if="headers"
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
import TableHeaders from "@/helpers/TableHeaders";

export default {
  components: {
    EditProductModal,
    ProductDetailsModal,
    UserDetailsModal,
  },
  provide() {
    return {
      closeForm: this.closeForm,
    };
  },
  data() {
    return {
      selectedId: null,
      modalManager: {
        editProductPopup: false,
        userPopup: false,
        detailsPopup: false,
      },
      popupName: {
        editProductPopup: "editProductPopup",
        userPopup: "userPopup",
        detailsPopup: "detailsPopup",
      },
      openPopup: "",
      search: "",
      headers: [],
      products: [],
    };
  },

  async mounted() {
    const responseData = await ProductsApi.getAllProducts();
    const data = await responseData.json();
    this.products = ProductsViews.populateProducts(data);
    this.headers = TableHeaders.getProductHeaders();
  },

  methods: {
    showDetails(item) {
      this.selectedId = item.id;
      this.openPopup = this.popupName.detailsPopup;
      this.modalsStateManager(this.openPopup);
    },

    editItem(item) {
      this.selectedId = item.id;
      this.openPopup = this.popupName.editProductPopup;
      this.modalsStateManager(this.openPopup);
    },
    showUser(id) {
      this.selectedId = id;
      this.openPopup = this.popupName.userPopup;
      this.modalsStateManager(this.openPopup);
    },

    async closeForm(element = {}) {
      if (element.id) {
        console.log(await ProductsApi.editProduct(element));
      }
      this.modalsStateManager(this.openPopup);
      this.openPopup = "";
      this.selectedId = null;
    },

    modalsStateManager(popupName) {
      this.modalManager[popupName] = !this.modalManager[popupName];
      console.log(this.modalManager[popupName]);
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
