class CategoriesApi {
  baseUrl = "http://localhost:3000";
  path = "categories";
  headers = {
    "Content-Type": "application/json",
  };

  getAllCategories() {
    return fetch(`${this.baseUrl}/${this.path}`);
  }

  getCategoryByName(name) {
    return fetch(`${this.baseUrl}/${this.path}?name=${name}`);
  }
}

export default new CategoriesApi();
