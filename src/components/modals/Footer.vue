<template>
  <v-footer app v-bind="localAttrs" :padless="padless" dark>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="primary--text">
        <v-row justify="center">
          <v-img
            src="../../../public/OpenMindLogo.png"
            max-height="100"
            max-width="200"
          ></v-img>
          <v-card-text class="primary--text">
            {{ new Date().getFullYear() }}
          </v-card-text>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    padless: false,
    variant: "default",
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>
