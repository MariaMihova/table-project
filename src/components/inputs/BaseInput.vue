<template>
  <v-text-field
    :value="textValue"
    @input="emitInput"
    :label="label"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      textValue: "",
    };
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.textValue = newVal;
      }

      console.log("from watch", newVal);
    },
  },

  created() {
    this.textValue = this.value;
  },

  methods: {
    emitInput() {
      console.log("from emit", this.textValue);
      //   console.log("from emit2", val);
      this.$emit("input", this.textValue);
    },
  },
};
</script>
