<template>
  <v-list-item @input="emitInput" v-bind="$attrs" two-line>
    <v-list-item-content>
      <v-list-item-title>{{ label }}</v-list-item-title>
      <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
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

  methods: {
    emitInput() {
      this.$emit("input", this.textValue);
    },
  },
};
</script>
