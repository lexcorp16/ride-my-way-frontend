const salutation = document.getElementById('salutation');

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
  window.location.href = '../index.html';
}

salutation.innerHTML = `Welcome ${user.fullName}`;
