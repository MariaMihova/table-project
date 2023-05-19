import ProductsApi from "../aip/productsService.js";

class ProductsViews {
  populateProducts(responseJson) {
    // console.log(responseJson);
    // todo map viw model from response data
    return responseJson;
  }

  async editProduct(product) {
    const responseData = await ProductsApi.editProduct(product);
    return responseData.status === 200 ? true : false;
  }

  setUser(product, userid) {
    product["userId"] = userid;
    ProductsApi.editProduct(product);
  }
}

export default new ProductsViews();
