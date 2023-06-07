import decode from 'jwt-decode';

// create a new class to for a user
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // saves user token to local storage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();