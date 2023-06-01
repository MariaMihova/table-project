class TableHeaders {
  getProductHeaders() {
    return [
      {
        align: "start",
        sortable: false,
        value: "index",
      },
      { text: "Id", value: "id" },
      { text: "Name", value: "name" },
      { text: "Desciption", value: "description" },
      { text: "Price", value: "price" },
      { text: "Uder Id", value: "userId" },
      { text: "Details", value: "details" },
      { text: "Edit", value: "action" },
    ];
  }
}

export default new TableHeaders();
