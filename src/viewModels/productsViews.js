class ProductsViews {
  populateProducts(responseJson) {
    return responseJson.map((product) =>
      this.productIdNameDectpitionPrice(product)
    );
  }

  productIdNameDectpitionPrice(product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  productDetails(product, userName = "No User") {
    product.userId = userName;
    return product;
  }

  editProductView(product) {
    return {
      name: product.name,
      description: product.description,
      features: product.features,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
    };
  }

  //   setUser(product, userid) {
  //     product["userId"] = userid;
  //     ProductsApi.editProduct(product);
  //   }
}

export default new ProductsViews();
