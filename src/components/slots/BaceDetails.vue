<template>
  <Details>
    <v-dialog v-model="show" width="30%" class="popup" persistent>
      <v-card v-if="displayObject">
        <v-card-title class="primary black--text"> {{ title }} </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text v-for="(prop, key) in displayObject" v-bind:key="key">
          <ListItem :value="prop" :label="capitalLeter(key)"></ListItem>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-btn class="submit primary black--text" @click="onSubmit"
            >Close</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </Details>
</template>

<script>
import ListItem from "../inputs/ListItem.vue";
import capitalFirsLetter from "../../helpers/CapitalFirsLetter.js";

export default {
  inheritAttrs: false,
  components: {
    ListItem,
  },
  props: ["objectData", "title", "close"],
  inject: ["closeForm"],
  created() {
    this.displayObject = this.objectData;
    this.show = true;
  },
  data() {
    return {
      show: true,
      displayObject: null,
    };
  },

  methods: {
    onSubmit() {
      this.closeForm();
      this.show = false;
      this.displayObject = {};
    },
    capitalLeter(str) {
      return capitalFirsLetter(str);
    },
  },
};
</script>
