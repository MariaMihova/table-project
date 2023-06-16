<template>
  <div>
    <v-banner>
      <v-card-title> Products </v-card-title>
    </v-banner>
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col v-for="product in products" :key="product.id" cols="12" md="4">
            <div>
              <ProductCardModal :product="product"></ProductCardModal>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import productsViews from "@/viewModels/productsViews";
import ProductCardModal from "./modals/ProductCardModal.vue";

export default {
  components: {
    ProductCardModal,
  },
  data() {
    return {
      headers: [],
    };
  },

  computed: {
    products() {
      return productsViews.populateProducts(
        this.$store.getters.getFurstTenProducts
      );
    },
  },

  mounted() {
    this.$store.dispatch("allProducts");
    this.headers = TableHeaders.getProductHeaders();
  },
};
</script>
