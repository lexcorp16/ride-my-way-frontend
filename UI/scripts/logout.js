const logout = document.getElementById('logout');
const userToken = localStorage.getItem('token');

if (userToken) {
  logout.onclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
}
