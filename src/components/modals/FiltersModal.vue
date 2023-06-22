<template>
  <v-card color="transparent">
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2" color="#f7e3ab">
        <v-list-item-icon>
          <v-icon>mdi-filter-settings-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>Filter by</v-list-item-content>

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
  </v-card>
</template>

<script>
import Filters from "../../helpers/FiltersCategories.js";
import CategoryFilterSlot from "../slots/CategoryFilterSlot.vue";
import PriceRangeFiterSlot from "../slots/PriceRangeFiterSlot.vue";
import UserIdFilterSlot from "../slots/UserIdFilterSlot.vue";
export default {
  components: {
    CategoryFilterSlot,
    PriceRangeFiterSlot,
    UserIdFilterSlot,
  },
  computed: {
    items() {
      return Filters.getFilters();
    },
  },
  data() {
    return {
      drawer: true,
      filterOptions: {
        category: false,
        priceRange: false,
        userId: false,
      },
      popupName: {
        category: "category",
        priceRange: "priceRange",
        userId: "userId",
      },
      openPopup: "",
      mini: true,
    };
  },

  methods: {
    showCategories() {
      this.closecurrentFilter();
      this.openPopup = this.popupName.category;
      this.filtersStateManager(this.openPopup);
    },
    showPriceRange() {
      this.closecurrentFilter();
      this.openPopup = this.popupName.priceRange;
      this.filtersStateManager(this.openPopup);
    },
    showUserId() {
      this.closecurrentFilter();
      this.openPopup = this.popupName.userId;
      this.filtersStateManager(this.openPopup);
    },

    closeFilters() {
      this.filtersStateManager(this.openPopup);
      this.popupName = "";
      this.$emit("close");
    },

    filtersStateManager(popupName) {
      this.filterOptions[popupName] = !this.filterOptions[popupName];
    },

    closecurrentFilter() {
      if (this.popupName) {
        this.filtersStateManager(this.openPopup);
      }
    },
  },
};
</script>
