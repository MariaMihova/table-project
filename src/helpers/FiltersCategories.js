class Filters {
  getFilters() {
    return [
      { title: "Category", icon: "mdi-arrange-send-backward" },
      { title: "Price range", icon: "mdi-cash" },
      { title: "UserId", icon: "mdi-account" },
    ];
  }
}

export default new Filters();
