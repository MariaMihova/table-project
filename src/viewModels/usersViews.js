class UsersViwes {
  userDetails(user) {
    return {
      name: user.name,
      company: user.company,
      email: user.email,
    };
  }
}

export default new UsersViwes();
