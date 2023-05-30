<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <div v-if="formData">{{ formData.name }}</div>
      <v-form v-if="formData" ref="form">
        <v-btn class="submit" @click="onSubmit">Close</v-btn>
        <TextInput v-model="formData.name" label="Name" disabled></TextInput>
        <NumberInput
          v-model="formData.age"
          label="Age"
          type="number"
          disabled
        ></NumberInput>
        <TextInput
          v-model="formData.company"
          label="Company"
          disabled
        ></TextInput>
        <TextInput
          v-model="formData.email"
          label="Email"
          type="email"
          disabled
        ></TextInput>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import TextInput from "../inputs/TextInput.vue";
import UsersApi from "../../api/usersService.js";
import UsersViews from "../../viewModels/usersViews.js";
import NumberInput from "../inputs/NumberInput.vue";
export default {
  inheritAttrs: false,
  components: {
    TextInput,
    NumberInput,
  },
  props: ["userId", "close"],
  created() {
    this.populateUsers();
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

    async populateUsers() {
      const responseData = await UsersApi.getUserById(this.userId);
      const data = await responseData.json();
      const user = UsersViews.userDetails(data);
      this.formData = Object.assign({}, user);
    },
  },
};
</script>

<!-- "id": "1",
  "age": 23,
  "name": "Bird Ramsey",
  "company": "NIMON",
  "email": "birdramsey@nimon.com" -->
