<template>
  <v-app>
    <v-main>
      <v-tabs fixed-tabs background-color="#04aa6d" dark>
        <router-link
          class="navTab"
          :to="route"
          v-for="route in routs"
          :key="route.name"
        >
          <v-tab>
            {{ route.name }}
          </v-tab>
        </router-link>
      </v-tabs>
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
.navTab {
  text-decoration: none;
  margin: 20px;
  font-size: xx-large;
}
</style>
