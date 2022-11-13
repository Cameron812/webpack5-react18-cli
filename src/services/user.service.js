const fakeUsers = [
  { id: 'a', name: 'Robin' },
  { id: 'b', name: 'Dennis' }
];

const userService = {
  getFakeUsers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), 1000);
    });
  },
  updateFakeUserName(users, id, name) {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { id, name };
      } else {
        return user;
      }
    });
    return new Promise((resolve) => {
      setTimeout(() => resolve(updatedUsers), 1000);
    });
  }
};

export default userService;
