<template>
  <div>
    <v-carousel
      cycle
      height="1000"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <!-- <v-carousel-item
        v-for="art in arts"
        :key="art.src"
        :src="art.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item> -->
      <v-carousel-item
        src="../../public/art/1.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
      <v-carousel-item
        src="../../public/art/2.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
      <v-carousel-item
        src="../../public/art/6.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
      <v-carousel-item
        src="../../public/art/4.jpg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>
    <v-col align="center" justify="center" class="mb-10">
      <v-btn right x-large class="primary black--text" to="/products"
        >Explore our artwork</v-btn
      >
    </v-col>

    <template>
      <v-row>
        <v-card max-width="1200" class="ml-10 secondary">
          <v-expansion-panels>
            <v-row align="start" justify="start" class="mt-4 px=5"
              ><span class="display-1 pa-5 font-weight-bold primary--text"
                >How to shop</span
              ></v-row
            >
            <v-expansion-panel v-for="item in info" :key="item.title">
              <v-expansion-panel-header class="subtitle-1">
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content max-width="700">
                {{ item.description }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-row>
    </template>
  </div>
</template>

<script>
import ArtWork from "../helpers/Art.js";
import HowToShop from "@/helpers/HowToShopObjects";
export default {
  computed: {
    arts() {
      console.log(ArtWork.getArt());
      return ArtWork.getArt();
    },
    info() {
      return HowToShop.getInfo();
    },
  },
  data() {
    return {
      model: 0,
    };
  },
  created() {
    console.log("from created", this.arts);
  },
  mounted() {
    console.log("from mounted", this.arts);
  },
};
</script>
