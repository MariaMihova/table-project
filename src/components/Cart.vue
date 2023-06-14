<template>
  <v-col cols="12" sm="6" offset-sm="3">
    <v-card width="100%">
      <v-list two-line>
        <template>
          <v-subheader> Products in cart </v-subheader>
          <v-divider></v-divider>
          <div v-if="products.length > 0">
            <v-list-item
              v-for="item in products"
              :key="item.id + Math.random()"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item>No products in cart</v-list-item>
          </div>

          <v-divider></v-divider>
          <v-subheader> Total: <v-spacer></v-spacer> {{ total }} </v-subheader>
        </template>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
export default {
  computed: {
    total() {
      return this.products.reduce((a, b) => a + Number(b.price), 0).toFixed(2);
    },
    products() {
      return this.$store.getters.getCartProducts;
    },
  },
};
</script>
