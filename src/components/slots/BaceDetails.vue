<template>
  <Details>
    <v-dialog v-model="show" width="70%" class="popup" persistent>
      <v-card v-if="displayObject">
        <v-card-title> {{ title }} </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text v-for="(prop, key) in displayObject" v-bind:key="key">
          <ListItem :value="prop" :label="capitalFirsLetter(key)"></ListItem>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-btn class="submit" @click="onSubmit">Close</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </Details>
</template>

<script>
import ListItem from "../inputs/ListItem.vue";

export default {
  inheritAttrs: false,
  components: {
    ListItem,
  },
  props: ["objectData", "title", "close"],
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
      this.$emit("close");
      this.show = false;
      this.displayObject = {};
    },

    capitalFirsLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>
