<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="16">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :label="label"
              :value="date"
              v-bind="attrs"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="emitInput" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4"> </v-col>
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
    date: "",
    menu: false,
  }),
  watch: {
    value(val) {
      this.date = val;
    },
  },
  created() {
    this.date = this.value;
  },
  methods: {
    emitInput(val) {
      this.date = val;
      this.$emit("input", this.date);
    },
  },
};
</script>
