const salutation = document.getElementById('salutation');
const ridesOffered = document.getElementById('ridesOffered');
const ridesTaken = document.getElementById('ridesTaken');
const offered = document.getElementById('offered');
const taken = document.getElementById('taken');

const spinnerOffered = document.getElementById('spinnerOffered'); 
const spinnerTaken = document.getElementById('spinnerTaken');


const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const decodedToken = jwt_decode(token);

salutation.innerHTML = `Welcome, ${user.fullName}`;

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
  <tr>
    <th>Destination</th>
    <th>Date</th>
    <th>Departure</th>
    <th>Time</th>
    <th>Status</th>
    <th>Driver Name</th>
    <th>Driver Phone Number</th>
  </tr>
`;

const offeredHeader = `
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
        <td>${data.driver_name}</td>
        <td>${data.driver_phone}</td>
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
  spinnerOffered.setAttribute('style', 'display: inline-block');

  fetch(ridesUrl, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinnerOffered.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        offered.innerHTML += `${data.data.length}`;

        if (data.data.length === 0) {
          const div = document.createElement('div');
          div.setAttribute('style', 'text-align: center');
          div.innerText = 'You have not created any ride offers.';

          ridesOffered.appendChild(div);
        } else {
          ridesOffered.innerHTML += offeredHeader;

          data.data.forEach((datum) => {
            ridesOffered.innerHTML += tableBody(datum);
          });
        }
      }
    });
};


const getUserRequests = () => {
  spinnerTaken.setAttribute('style', 'display: inline-block');

  fetch(requestsUrl, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinnerTaken.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        taken.innerHTML += `${data.data.length}`;

        if (data.data.length === 0) {
          const div = document.createElement('div');
          div.setAttribute('style', 'text-align: center');
          div.innerText = 'You have not joined any ride offers.';

          return ridesTaken.appendChild(div);
        }

        ridesTaken.innerHTML += takenHeader;

        data.data.forEach((datum) => {
          ridesTaken.innerHTML += tableBody(datum);
        });
      }
    });
};


if (!token || decodedToken.id !== user.id) {
  window.location.href = '../index.html';
} else {
  getUserRides();
  getUserRequests();
}
