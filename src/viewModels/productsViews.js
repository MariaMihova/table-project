import { use } from "chai";

class ProductsViews {
  populateProducts(products) {
    return products.map((product) =>
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
      category: product.category,
    };
  }

  productDetails(product, userName = "No User") {
    if (userName !== "No User") {
      product.userId = userName;
    }
    return product;
  }

  editProductView(product) {
    return {
      id: product.id,
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
}

export default new ProductsViews();
