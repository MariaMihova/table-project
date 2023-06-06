<template>
  <BaceDetails
    v-if="productData"
    :objectData="productData"
    title="Product Details"
  ></BaceDetails>
</template>

<script>
import UsersApi from "../../api/usersService.js";
import ProductsApi from "../../api/productsService.js";
import UsersViews from "../../viewModels/usersViews.js";
import ProductsViews from "../../viewModels/productsViews.js";
import BaceDetails from "../slots/BaceDetails.vue";

export default {
  inheritAttrs: false,
  components: {
    BaceDetails,
  },
  props: ["productId"],
  created() {
    this.populateProducts();
  },
  data() {
    return {
      productData: null,
    };
  },
  methods: {
    async populateProducts() {
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
