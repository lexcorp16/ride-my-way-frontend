const logout = document.getElementById('logout');

logout.onclick = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
