<template>
  <div>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-row align="center" justify="center"> </v-row>
    </v-card-text>

    <FiltersModal></FiltersModal>
    <v-item-group active-class="primary">
      <v-container>
        <v-card-title>
          <v-row align="center" justify="center">
            <span class="display-4 pa-5 font-weight-bold">Products</span>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col v-for="product in products" :key="product.id" cols="12" md="4">
            <div>
              <ProductCardModal :id="product.id"></ProductCardModal>
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
import FiltersModal from "./modals/FiltersModal.vue";
import categoriesViews from "@/viewModels/categoriesViews";

export default {
  components: {
    ProductCardModal,
    FiltersModal,
  },
  provide() {
    return {
      closeFilters: this.closeFilters,
    };
  },
  data() {
    return {
      headers: [],
      categoryName: null,
      propertyName: null,
    };
  },

  computed: {
    products: {
      get() {
        return productsViews.populateProducts(this.$store.getters.allProducts);
      },
      set({ method, prop }) {
        this.$store.commit(method, prop);
      },
    },
    categories() {
      return categoriesViews.categoriesNames(this.$store.getters.getCategories);
    },
  },

  mounted() {
    if (this.products.length <= 0) {
      this.$store.dispatch("allProducts");
    }

    if (this.categories.length <= 0) {
      this.$store.dispatch("populateCategories");
    }

    this.headers = TableHeaders.getProductHeaders();
  },

  methods: {
    sortBy() {
      this.products = {
        method: "sortProductsByPropertyName",
        prop: this.propertyName,
      };
    },
  },
};
</script>

<style>
.title {
  text-align: center;
  font-size: 150%;
}
</style>
