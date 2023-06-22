<template>
  <div>
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
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear height="10" indeterminate></v-progress-linear>
      </template>

      <v-img height="250" src="../../../public/pic.jpg"></v-img>

      <v-card-title>{{ product.name }}</v-card-title>

      <v-card-text>
        <v-row>
          <div class="grey--text ms-4">Category</div>

          <div class="grey--text ms-4">$ {{ product.category }}</div>
        </v-row>
        <v-row>
          <div class="grey--text ms-4">Price</div>

          <div class="grey--text ms-4">$ {{ product.price }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">{{ product.id }}</div>

        <div>
          {{ product.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <v-row align="center" justify="center">
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn
              color="#fac8e8"
              v-if="product.userId"
              small
              @click="showUser(product.userId)"
            >
              User
            </v-btn>
            <v-btn color="#fac8e8" small @click="showDetails(product)">
              Details
            </v-btn>
            <v-btn color="#fac8e8" small @click="editItem(product)">
              Edit
            </v-btn>
            <v-btn color="#fac8e8" small @click="addToCart(product)">
              Add to cart
            </v-btn>
          </v-btn-toggle>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProductDetailsModal from "../modals/ProductDetailsModal.vue";
import UserDetailsModal from "../modals/UserDetailsModal.vue";

export default {
  props: ["id"], // id
  components: {
    ProductDetailsModal,
    UserDetailsModal,
  },
  provide() {
    return {
      closeForm: this.closeForm,
    };
  },
  computed: {
    product() {
      return Object.assign({}, this.$store.getters.getProductById(this.id));
    },
  },

  data() {
    return {
      loading: false,
      selection: 1,
      toggle_exclusive: undefined,
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
    };
  },

  methods: {
    showDetails(item) {
      this.selectedId = item.id;
      this.openPopup = this.popupName.detailsPopup;
      this.modalsStateManager(this.openPopup);
    },

    showUser(id) {
      this.selectedId = id;
      this.openPopup = this.popupName.userPopup;
      this.modalsStateManager(this.openPopup);
    },
    editItem(item) {
      this.$router.push({ path: `products/edit/${item.id}` });
    },
    addToCart(item) {
      this.$store.commit("addProductToCart", item);
    },

    closeForm(element = {}) {
      if (element.id) {
        this.$store.dispatch("editProduct", element);
      }
      this.modalsStateManager(this.openPopup);
      this.openPopup = "";
      this.selectedId = null;
    },

    modalsStateManager(popupName) {
      this.modalManager[popupName] = !this.modalManager[popupName];
    },
  },
};
</script>

<style></style>
