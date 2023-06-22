<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="16">
  <v-textarea
    @input="emitInput"
    :label="label"
    :value="textValue"
    filled
    outlined
    v-bind="$attrs"
  ></v-textarea>
  </v-col>
  </v-row>
  </v-container>
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
