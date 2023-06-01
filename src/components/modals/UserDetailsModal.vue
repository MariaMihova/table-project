<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card v-if="userData">
      <v-card-title>
        User details
        <v-spacer></v-spacer>
      </v-card-title>
      <ListItem :value="userData.name" label="Name"></ListItem>
      <ListItem :value="userData.age" label="Age"></ListItem>
      <ListItem :value="userData.company" label="Company"></ListItem>
      <ListItem :value="userData.email" label="Email"></ListItem>
      <v-spacer></v-spacer>
      <v-btn class="submit" @click="onSubmit">Close</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import UsersApi from "../../api/usersService.js";
import UsersViews from "../../viewModels/usersViews.js";
import ListItem from "../inputs/ListItem.vue";

export default {
  inheritAttrs: false,
  components: {
    ListItem,
  },
  props: ["userId", "close"],
  created() {
    this.populateUsers();
    this.show = true;
  },
  data() {
    return {
      show: true,
      userData: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("close", this.userData);
      this.show = false;
      this.userData = {};
    },

    async populateUsers() {
      const responseData = await UsersApi.getUserById(this.userId);
      const data = await responseData.json();
      const user = UsersViews.userDetails(data);
      this.userData = Object.assign({}, user);
    },
  },
};
</script>

<!-- "id": "1",
  "age": 23,
  "name": "Bird Ramsey",
  "company": "NIMON",
  "email": "birdramsey@nimon.com" -->
