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
      userId: product.userId,
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
      date: product.date
        ? product.date
        : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substring(0, 10),
    };
  }

  //   setUser(product, userid) {
  //     product["userId"] = userid;
  //     ProductsApi.editProduct(product);
  //   }
}

export default new ProductsViews();
