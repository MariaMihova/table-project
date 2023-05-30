<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <div v-if="formData">{{ formData.name }}</div>
      <v-form v-if="formData" ref="form">
        <v-btn class="submit" @click="onSubmit">Close</v-btn>
        <TextInput v-model="formData.id" label="Id" disabled></TextInput>
        <TextInput v-model="formData.name" label="Name" disabled></TextInput>
        <TextInput
          v-model="formData.description"
          label="Description"
          disabled
        ></TextInput>
        <TextInput
          v-model="formData.features"
          label="Features"
          disabled
        ></TextInput>
        <NumberInput
          v-model="formData.price"
          label="Price"
          type="number"
          disabled
        ></NumberInput>
        <TextInput
          v-model="formData.keywords"
          label="Keywords"
          disabled
        ></TextInput>
        <TextInput v-model="formData.url" label="Url" disabled></TextInput>
        <TextInput
          v-model="formData.category"
          label="Category"
          disabled
        ></TextInput>
        <TextInput
          v-model="formData.subcategory"
          label="Subcategory"
          disabled
        ></TextInput>
        <TextInput
          v-model="formData.userId"
          label="UserId"
          disabled
        ></TextInput>
        <TextArea
          label="Comment"
          v-model="formData.comment"
          disabled
        ></TextArea>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import TextInput from "../inputs/TextInput.vue";
import TextArea from "../inputs/TextAreaInput.vue";
import UsersApi from "../../api/usersService.js";
import ProductsApi from "../../api/productsService.js";
import UsersViews from "../../viewModels/usersViews.js";
import ProductsViews from "../../viewModels/productsViews.js";
import NumberInput from "../inputs/NumberInput.vue";

export default {
  inheritAttrs: false,
  components: {
    TextInput,
    TextArea,
    NumberInput,
  },
  props: ["productId", "close"],
  created() {
    this.populateForm();
    this.show = true;
  },
  data() {
    return {
      show: true,
      formData: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("close", this.formData);
      this.show = false;
      this.formData = {};
    },
    async populateForm() {
      const responseData = await ProductsApi.getProductById(this.productId);
      const data = await responseData.json();
      if (data.userId) {
        const userResponseData = await UsersApi.getUserById(data.userId);
        const userData = await userResponseData.json();
        const user = UsersViews.userDetails(userData);
        this.formData = Object.assign(
          {},
          ProductsViews.productDetails(data, user.name)
        );
      } else {
        this.formData = Object.assign({}, data);
      }
    },
  },
};
</script>

<!-- "id": "GGOEAFKA087499",
"name": "Android Small Removable Sticker Sheet",
"description": "Show your Android pride by placing these 8 fun stickers on your technology products or accessories!",
"features": "<p>8 Android stickers</p>\n<p>White colored sticker sheet</p>",
"price": "2.00",
"keywords": "Android Small Removable Sticker Sheet, android stickers, sticker sheets, removable sticker sheets, small sticker sheet, android small sticker sheets, Android Sheet",
"url": "Android+Small+Removable+Sticker+Sheet",
"category": "accessories",
"subcategory": "accessories",
"userId": "No User" -->
