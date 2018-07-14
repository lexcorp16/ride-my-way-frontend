const salutation = document.getElementById('salutation');
const ridesOffered = document.getElementById('ridesOffered');
const ridesTaken = document.getElementById('ridesTaken');
const offered = document.getElementById('offered');
const taken = document.getElementById('taken');

const spinnerOffered = document.getElementById('spinnerOffered');
const spinnerTaken = document.getElementById('spinnerTaken');


const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

salutation.innerHTML = `Welcome ${user.fullName}`;

const ridesUrl = 'https://ride-my-way-app.herokuapp.com/api/v1/users/rides';
const requestsUrl = 'https://ride-my-way-app.herokuapp.com/api/v1/users/requests';

const fetchData = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': token,
  },
};

const takenHeader = `
<div style="color: red;">
  <tr>
    <th colspan="5" class="main-header">Rides Taken</th>
  </tr>
  <tr>
    <th>Destination</th>
    <th>Date</th>
    <th>Departure</th>
    <th>Time</th>
    <th>Status</th>
  </tr>
  </div>
`;

const offeredHeader = `
  <tr>
    <th colspan="5" class="main-header">Rides Offered</th>
  </tr>
  <tr>
    <th>Destination</th>
    <th>Date</th>
    <th>Departure</th>
    <th>Time</th>
  </tr>
`;

const tableBody = (data) => {
  if (data.status) {
    return `
      <tr>
        <td>${data.destination.charAt(0).toUpperCase() + data.destination.substr(1)}</td>
        <td>${data.departure_date.split('T')[0]}</td>
        <td>${data.point_of_departure.charAt(0).toUpperCase() + data.point_of_departure.substr(1)}</td>
        <td>${data.departure_time}</td>
        <td>${data.status}</td>
      </tr>
    `;
  }

  return `
      <tr>
        <td>${data.destination.charAt(0).toUpperCase() + data.destination.substr(1)}</td>
        <td>${data.departure_date.split('T')[0]}</td>
        <td>${data.point_of_departure.charAt(0).toUpperCase() + data.point_of_departure.substr(1)}</td>
        <td>${data.departure_time}</td>
      </tr>
    `;
};


const getUserRides = () => {
  spinnerOffered.setAttribute('style', 'display: block');

  fetch(ridesUrl, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinnerOffered.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        if (data.data.length === 0) {
          const div = document.createElement('div');
          div.setAttribute('style', 'text-align: center');
          div.innerText = 'You have not created any ride offers.';

          return ridesOffered.appendChild(div);
        }

        ridesOffered.innerHTML = offeredHeader;
        offered.innerHTML += `${data.data.length}`;

        data.data.forEach((datum) => {
          ridesOffered.innerHTML += tableBody(datum);
        });
      }
    });
};


const getUserRequests = () => {
  spinnerTaken.setAttribute('style', 'display: block');

  fetch(requestsUrl, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinnerTaken.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        if (data.data.length === 0) {
          const div = document.createElement('div');
          div.setAttribute('style', 'text-align: center');
          div.innerText = 'You have not joined any ride offers.';

          return ridesTaken.appendChild(div);
        }

        ridesTaken.innerHTML = takenHeader;
        taken.innerHTML += `${data.data.length}`;

        data.data.forEach((datum) => {
          ridesTaken.innerHTML += tableBody(datum);
        });
      }
    });
};


if (!token) {
  window.location.href = '../index.html';
} else {
  getUserRides();
  getUserRequests();
}
