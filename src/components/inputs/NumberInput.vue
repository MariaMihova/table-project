<template>
  <v-text-field
    @input="emitInput"
    :label="label"
    :value="textValue"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
    },
  },
  data: () => ({
    textValue: "",
  }),
  watch: {
    value(val) {
      this.textValue = Number(val);
    },
  },
  created() {
    this.textValue = Number(this.value);
  },
  methods: {
    emitInput(val) {
      this.textValue = val;
      this.$emit("input", this.textValue);
    },
  },
};
</script>
