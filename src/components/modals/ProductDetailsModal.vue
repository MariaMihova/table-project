<template>
  <BaceDetails
    v-if="products.length > 0"
    :objectData="productData"
    title="Product Details"
  ></BaceDetails>
</template>

<script>
import productsViews from "@/viewModels/productsViews";
import BaceDetails from "../slots/BaceDetails.vue";

export default {
  inheritAttrs: false,
  components: {
    BaceDetails,
  },
  props: ["productId"],
  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
    productData() {
      return productsViews.productDetails(
        this.$store.getters.getProductById(this.productId)
      );
    },
  },

  mounted() {
    if (this.products.length <= 0) {
      this.$store.dispatch("allProducts");
    }
  },
};
</script>
