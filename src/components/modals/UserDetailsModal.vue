<template>
  <BaceDetails
    v-if="users.length > 0"
    :objectData="userData"
    title="User Details"
  ></BaceDetails>
</template>

<script>
import usersViews from "@/viewModels/usersViews";
import BaceDetails from "../slots/BaceDetails.vue";

export default {
  inheritAttrs: false,
  components: {
    BaceDetails,
  },
  props: ["userId"],
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    userData() {
      return usersViews.userDetails(
        this.$store.getters.getUserById(this.userId)
      );
    },
  },
  mounted() {
    if (this.users.length <= 0) {
      this.$store.dispatch("populateUsers");
    }
  },
};
</script>
