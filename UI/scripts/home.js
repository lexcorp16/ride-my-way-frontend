const nav = document.getElementById('nav');

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const decodedToken = jwt_decode(token);

const html = `
  <li>
      <a href="./views/offers.html">View Rides</a>
  </li>
  <li>
      <a href="./views/dashboard.html">Dashboard</a>
  </li>
  <li>
      <a href="" id="logout">Logout</a>
  </li>
`;

if (token && decodedToken.id === user.id) {
  nav.innerHTML = html;
}
