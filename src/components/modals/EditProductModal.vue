<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <v-form v-if="formData" ref="form">
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
        <v-btn class="submit" id="save" @click="onSave">Save</v-btn>
        <v-btn class="submit" id="close" @click="onClose">Close</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ProductsViews from "@/viewModels/productsViews";
import TextAreaInput from "../inputs/TextAreaInput.vue";
import CategoriesViews from "@/viewModels/categoriesViews";
import TextInput from "../inputs/TextInput.vue";
import ProductsApi from "../../api/productsService.js";
import CategoriesApi from "../../api/categoriesService.js";
import SelectInput from "../inputs/SelectInput.vue";
import DatePicker from "../inputs/DatePicker.vue";
import NumberInput from "../inputs/NumberInput.vue";
export default {
  inheritAttrs: false,
  components: {
    TextAreaInput,
    TextInput,
    SelectInput,
    DatePicker,
    NumberInput,
  },
  props: ["productId", "close"],
  created() {
    this.populateForm();
    this.show = true;
  },
  data() {
    return {
      formData: null,
      show: true,
      categoriesNames: [],
      subcategories: [],
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
      this.show = false;
      this.formData = {};
    },
    onSave() {
      this.$emit("close", this.formData);
      this.show = false;
      this.formData = {};
    },
    async populateForm() {
      const responseData = await ProductsApi.getProductById(this.productId);
      const data = await responseData.json();
      this.formData = Object.assign({}, ProductsViews.editProductView(data));

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
<!-- name: product.name,
      description: product.description,
      features: product.features,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory, -->
