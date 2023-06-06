<template>
  <BaceDetails
    v-if="userData"
    :objectData="userData"
    title="User Details"
  ></BaceDetails>
</template>

<script>
import UsersApi from "../../api/usersService.js";
import UsersViews from "../../viewModels/usersViews.js";
import BaceDetails from "../slots/BaceDetails.vue";

export default {
  inheritAttrs: false,
  components: {
    BaceDetails,
  },
  props: ["userId"],
  created() {
    this.populateUsers();
  },
  data() {
    return {
      userData: null,
    };
  },
  methods: {
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
