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
  <a href="javascript:void(0);" class="btn" id="join" onclick="joinRide(this, '${data.id}')">
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

const joinData = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': token,
  },
};

const joinRide = (element, id) => {
  const joinUrl = `https://ride-my-way-app.herokuapp.com/api/v1/rides/${id}/requests`;

  element.childNodes[2].nodeValue = 'Joining...';
  element.childNodes[1].setAttribute('style', 'display: none;');

  fetch(joinUrl, joinData)
    .then(response => response.json())
    .then((data) => {
      swal({
        type: data.status === 'success' ? 'success' : 'error',
        title: data.message,
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2500,
      });

      element.childNodes[2].nodeValue = 'Join Ride';
      element.childNodes[1].setAttribute('style', 'display: initial;');
    });
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
          if (datum.vehicle_capacity > 0) {
            rideOffers.innerHTML += html(datum);
          }
        });
      }
    });
};

if (!token) {
  window.location.href = '../index.html';
} else {
  getRideOffers(fetchUrl, false);
}

searchButton.onclick = () => {
  const fetchUrlWithParams = `https://ride-my-way-app.herokuapp.com/api/v1/rides?destination=${ending.value}&startingPoint=${starting.value}`;

  rideOffers.innerHTML = '';
  spinner.setAttribute('style', 'display: initial');

  getRideOffers(fetchUrlWithParams, true);
};
