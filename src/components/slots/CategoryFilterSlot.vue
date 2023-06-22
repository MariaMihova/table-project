<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="4"
            v-for="(category, index) in categories"
            :key="index"
          >
            <v-checkbox
              v-model="selected"
              :label="category"
              color="#fac8e8"
              :value="category"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-btn color="#fac8e8" @click="filterByCategory"> Filter </v-btn>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import categoriesViews from "@/viewModels/categoriesViews";
export default {
  computed: {
    categories() {
      return categoriesViews.categoriesNames(this.$store.getters.getCategories);
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    if (this.categories.length <= 0) {
      this.$store.dispatch("populateCategories");
    }
  },
  methods: {
    filterByCategory() {
      this.$store.commit("setFilterCategory", this.selected);
      this.$emit("close");
    },
  },
};
</script>
