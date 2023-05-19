class UsersApi {
  baseUrl = "http://localhost:3000";
  path = "users";
  headers = {
    "Content-Type": "application/json",
  };

  getUsers() {
    return fetch(`${this.baseUrl}/${this.path}`);
  }

  getUserById(id) {
    return fetch(`${this.baseUrl}/${this.path}/${id}`);
  }

  getUserByName(name) {
    return fetch(`${this.baseUrl}/${this.path}?name=${name}`);
  }

  getUserByEmail(email) {
    return fetch(`${this.baseUrl}/${this.path}?email=${email}`);
  }

  editUser(e) {
    return fetch(`${this.baseUrl}/${this.path}/${e.id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(e),
    });
  }

  createUser(e) {
    return fetch(`${this.baseUrl}/${this.path}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(e),
    });
  }

  deleteUser(id) {
    return fetch(`${this.baseUrl}/${this.path}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

export default new UsersApi();
