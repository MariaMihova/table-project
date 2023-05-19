import UsersApi from "../aip/usersService.js";

class UsersViwes {
  async populateUsers() {
    const responseData = await UsersApi.getUsers();
    return await responseData.json();
  }

  async findUserById(id) {
    const userResponse = await UsersApi.getUserById(id);
    return await userResponse.json();
  }
}

export default new UsersViwes();
