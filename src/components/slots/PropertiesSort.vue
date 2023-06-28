<template>
  <v-card class="secondary">
    <v-card-text>
      <SelectInput
        label="Select Property"
        :items="properties"
        v-model="selected"
      ></SelectInput>
      <v-btn @click="sortByPropertyName">Sort</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import SelectInput from "../inputs/SelectInput.vue";
import Properties from "../../helpers/PorpertiesNames.js";
export default {
  components: {
    SelectInput,
  },
  computed: {
    properties() {
      return Properties.getNames();
    },
  },
  data() {
    return {
      selected: null,
    };
  },

  methods: {
    sortByPropertyName() {
      this.$store.commit("setSort", this.selected);
      this.$emit("close");
    },
  },
};
</script>
