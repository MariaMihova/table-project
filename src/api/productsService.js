class ProductsApi {
  baseUrl = "http://localhost:3000";
  path = "products";
  headers = {
    "Content-Type": "application/json",
  };

  getAllProducts() {
    return fetch(`${this.baseUrl}/${this.path}`);
  }

  getProductById(id) {
    return fetch(`${this.baseUrl}/${this.path}/${id}`);
  }

  getProductByName(name) {
    return fetch(`${this.baseUrl}/${this.path}?name=${name}`);
  }

  editProduct(e) {
    return fetch(`${this.baseUrl}/${this.path}/${e.id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(e),
    });
  }

  createProduct(e) {
    return fetch(`${this.baseUrl}/${this.path}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(e),
    });
  }

  deleteProduct(id) {
    return fetch(`${this.baseUrl}/${this.path}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  getProductsByUserId(id) {
    return fetch(`${this.baseUrl}/${this.path}?userId=${id}`);
  }
}
export default new ProductsApi();
