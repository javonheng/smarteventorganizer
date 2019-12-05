const Auth = {
  isAuthenticated: false,

  authenticate() {
    this.isAuthenticated = true;
    localStorage.setItem('isLoggedIn', this.isAuthenticated);
  },

  signout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn')
  },

  getAuth() {
    //return this.isAuthenticated;
    const isAuth = localStorage.getItem('isLoggedIn');
    return isAuth;
  }
};

export default Auth;
