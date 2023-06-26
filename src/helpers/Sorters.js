class Sorters {
  getSorters() {
    return [
      { title: "Property", icon: "mdi-notification-clear-all" },
      { title: "Price ascending", icon: "mdi-arrow-up-bold" },
      { title: "Price descending", icon: "mdi-arrow-down-bold" },
    ];
  }
}

export default new Sorters();
