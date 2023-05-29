<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <v-form v-if="formData" ref="form">
        <TextInput v-model="formData.name" label="Name"></TextInput>
        <TextInput
          v-model="formData.description"
          label="Description"
        ></TextInput>
        <TextInput v-model="formData.features" label="Features"></TextInput>
        <TextInput v-model="formData.price" label="Price"></TextInput>
        <SelectInput v-model="formData.category" label="Category"></SelectInput>
        <TextInput
          v-model="formData.subcategory"
          label="Subcategory"
        ></TextInput>
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
import TextInput from "../inputs/TextInput.vue";
import ProductsApi from "../../api/productsService.js";
import SelectInput from "../inputs/SelectInput.vue";
import DatePicker from "../inputs/DatePicker.vue";
export default {
  components: {
    TextAreaInput,
    TextInput,
    SelectInput,
    DatePicker,
  },
  props: ["id", "close"],
  created() {
    this.populateForm();
    this.show = true;
  },
  data() {
    return {
      formData: null,
      show: true,
    };
  },
  methods: {
    onClose() {
      this.$emit("close", {});
      this.show = false;
      this.formData = {};
    },
    onSave() {
      this.formData.id = this.id;
      this.$emit("close", this.formData);
      this.show = false;
      this.formData = {};
    },
    async populateForm() {
      const responseData = await ProductsApi.getProductById(this.id);
      const data = await responseData.json();
      this.formData = Object.assign({}, ProductsViews.editProductView(data));
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
