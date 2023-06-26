<template>
  <v-app>
    <v-app-bar app height="100" color="#f7e3ab">
      <v-toolbar-title>
        <!-- <span class="font-weith-lighr green--text">Open Mind</span> -->
      </v-toolbar-title>
      <v-tabs fixed-tabs dark class="pa-5">
        <router-link
          class="text-decoration-none pa-6"
          :to="route"
          v-for="route in routs"
          :key="route.name"
        >
          <v-row>
            <v-tab class="display-1 black--text">
              <v-icon left class="display-1 black--text"
                >mdi-emoticon-devil-outline</v-icon
              >
              <span>{{ route.name }}</span>
            </v-tab>
          </v-row>
        </router-link>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",

  computed: {
    routs() {
      return this.$router.options.routes;
    },
  },
};
</script>

<style>
div[data-app="true"] {
  background: url("../public/bg.jpg") center center fixed !important;

  background-size: cover;
}
</style>
