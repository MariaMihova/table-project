<template>
    <v-text-field @input="emitInput" :label="label" :value="textValue" />
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
      },
    },
    data: () => ({
      textValue: "",
    }),
    watch: {
      value(val) {
        this.textValue = val;
      },
    },
    created() {
      this.textValue = this.value;
    },
    methods: {
      emitInput(val) {
        this.textValue = val;
        this.$emit("input", this.textValue);
      },
    },
  };
  </script>
  