export default function IsLogged() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      console.log(user);
      return true;
    } else {
      return false;
    }
  }