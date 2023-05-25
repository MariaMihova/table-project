<template>
  <v-textarea
    @input="emitInput"
    :label="label"
    :value="textValue"
    filled
    outlined
  ></v-textarea>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
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
