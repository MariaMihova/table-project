<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <form @submit.prevent="onSubmit">
        <div v-for="(formField, key) in formData" v-bind:key="key">
          <!-- <label>{{ key }}</label>
          <input type="text" v-model="formData[key]" disabled /> -->
          <!-- <BaseInput id="base" :label="key" v-model="formField" /> -->
        </div>
        <!-- insert custom inputs -->
        <BaseInput v-model="formData.id" :label="label"></BaseInput>
        <button class="submit" id="close">Close</button>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import BaseInput from "./inputs/BaseInput.vue";
export default {
  components: {
    BaseInput,
  },
  props: ["toEdit", "isOpen", "close"],
  methods: {
    onSubmit(e) {
      this.$emit("close", e.submitter.id === "save" ? this.formData : {});
      this.formData = {};
    },
    getEditPerson() {
      Object.assign(this.formData, this.toEdit);
    },
  },
  watch: {
    isOpen(newValue) {
      // whenever question changes, this function will run
      if (newValue === true) {
        this.getEditPerson();
      }
    },
  },

  computed: {
    show: {
      get() {
        return this.isOpen;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  data() {
    return {
      formData: {},
      value: "Mary",
      label: "first name",
    };
  },
};
</script>
