class UsersViews {
  userDetails(user) {
    return {
      name: user.name,
      age: user.age,
      company: user.company,
      email: user.email,
    };
  }
}

export default new UsersViews();
