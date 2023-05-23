<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <div v-if="formData">{{ formData.name }}</div>
      <v-form v-if="formData" ref="form">
        <v-btn class="submit" @click="onSubmit">Close</v-btn>
        <TextInput v-model="formData.name" label="Name"></TextInput>
        <TextInput v-model="formData.company" label="Company"></TextInput>
        <TextInput v-model="formData.email" label="Email"></TextInput>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import TextInput from "./inputs/TextInput.vue";
export default {
  components: {
    TextInput,
  },
  props: ["toEdit", "close"],
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
    populateForm() {
      this.formData = Object.assign({}, this.toEdit);
      console.log(this.formData);
    },
  },
};
</script>

<!-- "id": "1",
  "age": 23,
  "name": "Bird Ramsey",
  "company": "NIMON",
  "email": "birdramsey@nimon.com" -->
