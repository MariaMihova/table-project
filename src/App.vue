<template>
  <v-app class="grey lighten-5">
    <v-app-bar app height="70" color="black">
      <v-toolbar-title>
        <v-img
          max-height="100"
          max-width="200"
          src="../public/OpenMindLogo.png"
          alt="logo"
        ></v-img>
      </v-toolbar-title>
      <v-tabs fixed-tabs dark class="pa-5" color="#a97f29">
        <router-link
          class="text-decoration-none pa-6 primary--text"
          :to="route"
          v-for="route in routs"
          :key="route.name"
        >
          <v-row>
            <v-tab class="headline font-weight-bold">
              <span>{{ route.name }}</span>
            </v-tab>
          </v-row>
        </router-link>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>
<script>
import Footer from "./components/modals/Footer.vue";
export default {
  name: "App",

  components: {
    Footer,
  },
  computed: {
    routs() {
      return this.$router.options.routes;
    },
  },
};
</script>

<style></style>
