<template>
  <div>
    <v-row>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        class="drawer pt-20 secondary"
      >
        <v-list-item class="primary">
          <v-list-item-icon>
            <v-icon>mdi-filter-settings</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="font-weight-bold"
            >Filter by</v-list-item-content
          >

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item link @click="showCategories">
            <v-list-item-icon>
              <v-icon>{{ items[0].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[0].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="showPriceRange">
            <v-list-item-icon>
              <v-icon>{{ items[1].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[1].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="showUserId">
            <v-list-item-icon>
              <v-icon>{{ items[2].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[2].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
          class="drawer secondary"
        >
          <v-list-item class="primary">
            <v-list-item-icon>
              <v-icon>mdi-swap-vertical-bold </v-icon>
            </v-list-item-icon>

            <v-list-item-content class="font-weight-bold"
              >Sort by</v-list-item-content
            >
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item link @click="sortByPropertyName">
              <v-list-item-icon>
                <v-icon>{{ sorters[0].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ sorters[0].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="sortByPriceAsc">
              <v-list-item-icon>
                <v-icon>{{ sorters[1].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ sorters[1].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="sortByPriceDes">
              <v-list-item-icon>
                <v-icon>{{ sorters[2].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ sorters[2].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-navigation-drawer>

      <div v-if="filterOptions.category">
        <CategoryFilterSlot @close="closeFilters"></CategoryFilterSlot>
      </div>

      <div v-if="filterOptions.priceRange">
        <PriceRangeFiterSlot @close="closeFilters"></PriceRangeFiterSlot>
      </div>
      <div v-if="filterOptions.userId">
        <UserIdFilterSlot @close="closeFilters"></UserIdFilterSlot>
      </div>

      <div v-if="filterOptions.propName">
        <PropertiesSort @close="closeFilters"></PropertiesSort>
      </div>
    </v-row>
  </div>
</template>

<script>
import Filters from "../../helpers/FiltersCategories.js";
import Sorters from "../../helpers/Sorters.js";
import CategoryFilterSlot from "../slots/CategoryFilterSlot.vue";
import PriceRangeFiterSlot from "../slots/PriceRangeFiterSlot.vue";
import UserIdFilterSlot from "../slots/UserIdFilterSlot.vue";
import PropertiesSort from "../slots/PropertiesSort.vue";
export default {
  components: {
    CategoryFilterSlot,
    PriceRangeFiterSlot,
    UserIdFilterSlot,
    PropertiesSort,
  },
  computed: {
    items() {
      return Filters.getFilters();
    },
    sorters() {
      return Sorters.getSorters();
    },
  },
  data() {
    return {
      drawer: false,
      filterOptions: {
        category: false,
        priceRange: false,
        userId: false,
        propName: false,
        priceAsc: false,
        priceDes: false,
      },

      popupName: {
        category: "category",
        priceRange: "priceRange",
        userId: "userId",
        propName: "propName",
        priceAsc: "priceAsc",
        priceDes: "priceDes",
      },
      openPopup: "",
      mini: true,
    };
  },

  methods: {
    showCategories() {
      this.closeCurrentFilter();
      this.openPopup = this.popupName.category;
      this.filtersStateManager(this.openPopup);
    },
    showPriceRange() {
      this.closeCurrentFilter();
      this.openPopup = this.popupName.priceRange;
      this.filtersStateManager(this.openPopup);
    },
    showUserId() {
      this.closeCurrentFilter();
      this.openPopup = this.popupName.userId;
      this.filtersStateManager(this.openPopup);
    },

    sortByPropertyName() {
      this.closeCurrentFilter();
      this.openPopup = this.popupName.propName;
      this.filtersStateManager(this.openPopup);
    },
    sortByPriceAsc() {
      this.$store.commit("setSort", "asc");
    },
    sortByPriceDes() {
      this.$store.commit("setSort", "des");
    },

    closeFilters() {
      this.filtersStateManager(this.openPopup);
      this.openPopup = "";
    },

    filtersStateManager(popupName) {
      this.filterOptions[popupName] = !this.filterOptions[popupName];
    },

    closeCurrentFilter() {
      if (this.popupName) {
        this.filtersStateManager(this.openPopup);
      }
    },
  },
};
</script>

<style>
.drawer {
  margin-left: 1%;
  margin-right: 1%;
}
</style>
