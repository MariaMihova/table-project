<template>
  <v-list-item v-bind="$attrs" two-line>
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
};
</script>
