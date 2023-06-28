<template>
  <v-card class="secondary">
    <TextInput
      label="Enter user id"
      v-model="userId"
      style="width: 800px"
    ></TextInput>
    <v-btn color="#fac8e8" @click="filterByUserId"> Filter </v-btn>
  </v-card>
</template>

<script>
import TextInput from "../inputs/TextInput.vue";
export default {
  components: {
    TextInput,
  },
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    filterByUserId() {
      this.$store.commit("setFilterUserId", this.userId);
      this.$emit("close");
    },
  },
};
</script>
