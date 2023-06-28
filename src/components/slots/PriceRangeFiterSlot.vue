<template>
  <v-card flat class="secondary">
    <v-subheader>Select price range</v-subheader>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-range-slider
              v-model="priceRangeSlider.range"
              :max="priceRangeSlider.max"
              :min="priceRangeSlider.min"
              hide-details
              class="align-center"
              style="width: 800px"
            >
              <template v-slot:prepend>
                <v-text-field
                  :value="priceRangeSlider.range[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(priceRangeSlider.range, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="priceRangeSlider.range[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(priceRangeSlider.range, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-col>
        </v-row>
      </v-container>
      <v-btn color="#fac8e8" @click="filterByPriceRange"> Filter </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      priceRangeSlider: {
        min: 0,
        max: 300,
        range: [0, 500],
      },
    };
  },
  methods: {
    filterByPriceRange() {
      this.$store.commit("setFilterPriceRange", this.priceRangeSlider.range);
      this.$emit("close");
    },
  },
};
</script>
