<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card v-if="productData">
      <v-card-title>
        Product details
        <v-spacer></v-spacer>
      </v-card-title>
      <ListItem :value="productData.id" label="Id"></ListItem>
      <ListItem :value="productData.name" label="Name"></ListItem>
      <ListItem :value="productData.description" label="Description"></ListItem>
      <ListItem :value="productData.features" label="Features"></ListItem>
      <ListItem :value="productData.price" label="Price"></ListItem>
      <ListItem :value="productData.keywords" label="Keywords"></ListItem>
      <ListItem :value="productData.url" label="Url"></ListItem>
      <ListItem :value="productData.category" label="Category"></ListItem>
      <ListItem :value="productData.subcategory" label="Subcategory"></ListItem>
      <ListItem :value="productData.date" label="Date"></ListItem>
      <ListItem :value="productData.userId" label="User id"></ListItem>
      <ListItem :value="productData.comment" label="Comment"></ListItem>
      <v-spacer></v-spacer>
      <v-btn class="submit" @click="onSubmit">Close</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import UsersApi from "../../api/usersService.js";
import ProductsApi from "../../api/productsService.js";
import UsersViews from "../../viewModels/usersViews.js";
import ProductsViews from "../../viewModels/productsViews.js";
import ListItem from "../inputs/ListItem.vue";

export default {
  inheritAttrs: false,
  components: {
    ListItem,
  },
  props: ["productId", "close"],
  created() {
    this.populateForm();
    this.show = true;
  },
  data() {
    return {
      show: true,
      productData: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("close", this.productData);
      this.show = false;
      this.productData = {};
    },
    async populateForm() {
      const responseData = await ProductsApi.getProductById(this.productId);
      const data = await responseData.json();
      if (data.userId) {
        const userResponseData = await UsersApi.getUserById(data.userId);
        const userData = await userResponseData.json();
        const user = UsersViews.userDetails(userData);
        this.productData = Object.assign(
          {},
          ProductsViews.productDetails(data, user.name)
        );
      } else {
        this.productData = Object.assign({}, data);
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
