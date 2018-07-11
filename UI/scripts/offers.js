const spinner = document.getElementById('spinner');
const rideOffers = document.getElementById('rideOffers');

const starting = document.getElementById('starting');
const ending = document.getElementById('ending');

const searchButton = document.getElementById('searchButton');

const html = data => `<div class="offer">
  <div class="offer-main-content">
    <p>
      <i class="fas fa-map-marker-alt fa-lg"></i>
      <b>${data.destination.toUpperCase()}</b>
    </p>
    <p>
      <i class="fas fa-calendar-alt fa-lg"></i>
      <b>${data.departure_date.split('T')[0]}</b>
    </p>
    <p>
      <i class="fas fa-clock fa-lg"></i>
      <b>${data.departure_time}</b>
    </p>
    <p>
      <i class="fas fa-arrow-left fa-lg"></i>
      <b>${data.point_of_departure.toUpperCase()}</b>
    </p>
    <p>
      <i class="fas fa-users fa-lg"></i>
      <b>${data.vehicle_capacity}</b>
    </p>
  </div>
  <a href="#" class="btn">
    <i class="fas fa-plus"></i>Join Ride</a>
</div>`;

const token = localStorage.getItem('token');
const fetchUrl = 'https://ride-my-way-app.herokuapp.com/api/v1/rides';
const fetchData = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': token,
  },
};

const getRideOffers = (url, hasParams) => {
  spinner.setAttribute('style', 'display: initial');

  fetch(url, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinner.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        if (data.data.length === 0) {
          const div = document.createElement('div');
          div.setAttribute('style', 'text-align: center');
          div.innerText = !hasParams
            ? 'There are no ride offers at this time. Please try again later.'
            : 'There are no ride offers matching the search criteria. Refresh to see all ride offers.';

          return rideOffers.appendChild(div);
        }

        data.data.forEach((datum) => {
          rideOffers.innerHTML += html(datum);
        });
      }
    });
};

if (!token) {
  window.location.replace(
    `${window.location.protocol}//${window.location.host}/UI/index.html`,
  );
} else {
  getRideOffers(fetchUrl, false);
}

searchButton.onclick = () => {
  const fetchUrlWithParams = `https://ride-my-way-app.herokuapp.com/api/v1/rides?destination=${ending.value}&startingPoint=${starting.value}`;

  rideOffers.innerHTML = '';
  spinner.setAttribute('style', 'display: initial');

  getRideOffers(fetchUrlWithParams, true);
};
