<template>
  <v-app>
    <v-main>
      <v-banner sticky>
        <v-tabs fixed-tabs background-color="#f7e3ab" dark>
          <router-link
            class="navTab"
            :to="route"
            v-for="route in routs"
            :key="route.name"
          >
            <v-tab id="tab">
              {{ route.name }}
            </v-tab>
          </router-link>
        </v-tabs>
      </v-banner>
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
.navTab {
  text-decoration: none;
  color: black;
  margin: 20px;
  font-size: xx-large;
}
#tab {
  color: black;
}
.btn {
  background-color: #f7e3ab;
}
</style>
