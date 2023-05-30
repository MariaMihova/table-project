<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="16">
        <v-select
          @input="emitInput"
          :label="label"
          :value="textValue"
          :items="items"
          v-bind="$attrs"
        ></v-select>
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
    items: {
      type: Array,
      required: true,
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
