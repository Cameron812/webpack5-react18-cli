const authService = {
  getFakeToken() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('123afdf8908eqdafajbna');
      }, 1000);
    });
  }
};
export default authService;
