<template>
  <v-col cols="12" sm="6" offset-sm="3">
    <v-card width="100%" class="secondary">
      <v-card-title class="primary black--text"
        >Edit product {{ formData.id }}
      </v-card-title>
      <v-form v-if="formData" ref="form" class="form">
        <TextInput v-model="formData.id" label="Id" disabled></TextInput>
        <TextInput v-model="formData.name" label="Name"></TextInput>
        <TextInput
          v-model="formData.description"
          label="Description"
        ></TextInput>
        <TextInput v-model="formData.features" label="Features"></TextInput>
        <NumberInput v-model="formData.price" label="Price"></NumberInput>
        <SelectInput
          v-model="formData.category"
          label="Category"
          :items="categoriesNames"
        ></SelectInput>
        <SelectInput
          v-model="formData.subcategory"
          label="Subcategory"
          :items="subcategories"
        ></SelectInput>
        <TextAreaInput
          label="Add comment"
          v-model="formData.comment"
        ></TextAreaInput>
        <DatePicker v-model="formData.date" label="Date"></DatePicker>

        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="16">
              <v-btn
                class="submit mx-3 primary black--text"
                id="save"
                @click="onSave"
                :loading="loading"
                >Save</v-btn
              >
              <v-btn
                class="submit mx-3 primary black--text"
                id="close"
                @click="onClose"
                >Close</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import ProductsViews from "../viewModels/productsViews.js";
import TextAreaInput from "./inputs/TextAreaInput.vue";
import CategoriesViews from "@/viewModels/categoriesViews";
import TextInput from "./inputs/TextInput.vue";
import CategoriesApi from "../api/categoriesService.js";
import SelectInput from "./inputs/SelectInput.vue";
import DatePicker from "./inputs/DatePicker.vue";
import NumberInput from "./inputs/NumberInput.vue";
export default {
  inheritAttrs: false,
  components: {
    TextAreaInput,
    TextInput,
    SelectInput,
    DatePicker,
    NumberInput,
  },

  created() {
    this.populateForm();
  },
  data() {
    return {
      formData: null,
      show: true,
      subcategories: [],
      loading: false,
    };
  },

  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
    productData() {
      return this.$store.getters.getProductById(this.$route.params.id);
    },
    categories() {
      return this.$store.getters.getCategories;
    },
  },

  mounted() {
    if (this.products.length <= 0) {
      this.$store.dispatch("allProducts");
    }
  },
  methods: {
    onClose() {
      this.$router.push({ path: "/products" });
    },
    async onSave() {
      this.loading = true;
      await this.$store.dispatch("editProduct", this.formData);

      this.formData = {};
      this.loading = false;
      this.onClose();
    },
    async populateForm() {
      this.formData = Object.assign(
        {},
        ProductsViews.editProductView(this.productData)
      );

      this.categoriesNames = CategoriesViews.categoriesNames(this.categories);

      this.subcategories = CategoriesViews.subcategorysByCategoryName(
        this.formData.category,
        this.categories
      );
    },
  },
};
</script>
