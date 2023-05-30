class CategoriesViews {
  categoriesNames(categories) {
    return categories.map((c) => c.name);
  }

  subcategorysByCategoryName(categoryName, categories) {
    return categories.find((c) => c.name === categoryName).subcategories;
  }
}

export default new CategoriesViews();
