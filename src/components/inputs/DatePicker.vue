<template>
  <v-row>
    <v-col cols="12" sm="12" md="8">
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
      console.log("date before val from watch", this.date);
      console.log("val from watch", val);
      this.date = val;
      console.log("date after val from watch", this.date);
    },
  },
  created() {
    this.date = this.value;
    console.log("date from create", this.date);
  },
  methods: {
    emitInput(val) {
      this.date = val;
      this.$emit("input", this.date);
    },
  },
};
</script>
