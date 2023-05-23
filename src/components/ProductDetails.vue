<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <div v-if="formData">{{ formData.name }}</div>
      <v-form v-if="formData" ref="form">
        <v-btn class="submit" @click="onSubmit">Close</v-btn>
        <TextInput v-model="formData.id" label="Id"></TextInput>
        <TextInput v-model="formData.name" label="Name"></TextInput>
        <TextInput
          v-model="formData.description"
          label="Description"
        ></TextInput>
        <TextInput v-model="formData.features" label="Features"></TextInput>
        <TextInput v-model="formData.price" label="Price"></TextInput>
        <TextInput v-model="formData.keywords" label="Keywords"></TextInput>
        <TextInput v-model="formData.url" label="Url"></TextInput>
        <TextInput v-model="formData.category" label="Category"></TextInput>
        <TextInput
          v-model="formData.subcategory"
          label="Subcategory"
        ></TextInput>
        <TextInput v-model="formData.userId" label="UserId"></TextInput>
        <TextArea label="Add comment" v-model="formData.comment"></TextArea>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import TextInput from "./inputs/TextInput.vue";
import TextArea from "./inputs/TextArea.vue";
export default {
  components: {
    TextInput,
    TextArea,
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
