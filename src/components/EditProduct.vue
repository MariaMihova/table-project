<template>
  <v-card>
    <v-card-title>Edit product {{ formData.id }} </v-card-title>
    <v-form v-if="formData" ref="form">
      <TextInput v-model="formData.id" label="Id" disabled></TextInput>
      <TextInput v-model="formData.name" label="Name"></TextInput>
      <TextInput v-model="formData.description" label="Description"></TextInput>
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
      <v-btn class="submit" id="save" @click="onSave">Save</v-btn>
      <v-btn class="submit" id="close" @click="onClose">Close</v-btn>
    </v-form>
  </v-card>
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
      categoriesNames: [],
      subcategories: [],
    };
  },
  //    computed: {
  //     message: {
  //     get () {
  //       return this.$store.state.obj.message
  //     },
  //     set (value) {
  //       this.$store.commit('updateMessage', value)
  //     }
  //   }
  // }
  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
    productData() {
      return this.$store.getters.getProductById(this.$route.params.id);
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
    onSave() {
      this.$store.dispatch("editProduct", this.formData);
      this.formData = {};
      this.onClose();
    },
    async populateForm() {
      this.formData = Object.assign(
        {},
        ProductsViews.editProductView(this.productData)
      );

      const categoriesResponse = await CategoriesApi.getAllCategories();
      const categories = await categoriesResponse.json();
      this.categoriesNames = CategoriesViews.categoriesNames(categories);

      this.subcategories = CategoriesViews.subcategorysByCategoryName(
        this.formData.category,
        categories
      );
    },
  },
};
</script>
