<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="16">
        <v-text-field
          class="d-flex"
          cols="12"
          sm="16"
          @input="emitInput"
          :label="label"
          :value="textValue"
          v-bind="$attrs"
        />
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
