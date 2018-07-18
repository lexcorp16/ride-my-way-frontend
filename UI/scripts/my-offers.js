/* eslint func-names: 0 */

const collapsible = document.getElementsByClassName('collapsible');
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const decodedToken = jwt_decode(token);

for (let i = 0; i < collapsible.length; i += 1) {
  collapsible[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = `${200 + +content.scrollHeight}px`;
    }
  });
}

const respondToRideRequest = (element, rideId, requestId, status) => {
  const joinUrl = `https://ride-my-way-app.herokuapp.com/api/v1/users/rides/${rideId}/requests/${requestId}`;
  const respondBody = {
    status,
  };

  const respondData = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-access-token': token,
    },
    body: JSON.stringify(respondBody),
  };

  element.childNodes[1].setAttribute('style', 'display: none;');
  element.childNodes[0].nodeValue = '...';

  fetch(joinUrl, respondData)
    .then(response => response.json())
    .then((data) => {
      swal({
        type: data.status === 'success' ? 'success' : 'error',
        title: data.message,
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2500,
      });

      element.childNodes[1].setAttribute('style', 'display: initial;');
      element.childNodes[0].nodeValue = '';
    });
};

const url = 'https://ride-my-way-app.herokuapp.com/api/v1/users/rides/requests';

const fetchData = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': token,
  },
};

const collapsibleMarkup = data => `
  <div class="collapsible">
    <div>
      <p>
        Destination: <b>${data.destination.toUpperCase()}</b></p>
      <p>
        Point Of Departure: <b>${data.point_of_departure.toUpperCase()}</b></p>
      <p>
        Departure Time: <b>${data.departure_time}</b></p>
      <p>
        Date: <b>${data.departure_date.split('T')[0]}</b></p>
    </div>
  </div>`;

const requestMarkup = data => `
  <div class="request">
    <p>
      Request From: <b>${data.name.toUpperCase()}</b></p>
    <div class="actions">
      <a href="javascript:void(0)" class="btn-small" onclick="respondToRideRequest(this, '${data.ride_id}', '${data.id}', 'accepted')">
        <i class="fas fa-check"></i>
      </a>
      <a href="javascript:void(0)" class="btn-small danger" onclick="respondToRideRequest(this, '${data.ride_id}', '${data.id}', 'rejected')">
        <i class="fas fa-times"></i>
      </a>
    </div>
  </div>
`;

const getUserRideRequests = () => {
  spinner.setAttribute('style', 'display: block');

  const textDiv = document.createElement('div');
  textDiv.setAttribute('style', 'text-align: center');

  fetch(url, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinner.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        if (data.data.length === 0) {
          textDiv.innerText = 'There have been no requests for your ride offers';

          return container.appendChild(textDiv);
        }

        const uniqueOffers = _.uniqBy(data.data, 'ride_id');

        const requestss = _.filter(
          data.data,
          request => request.status === 'pending' && request.vehicle_capacity > 0,
        );

        uniqueOffers.forEach((offer) => {
          const div = document.createElement('div');
          div.classList += 'content';

          requestss.forEach((request) => {
            if (request.ride_id === offer.ride_id) {
              container.innerHTML += collapsibleMarkup(offer);
              div.innerHTML += requestMarkup(request);
              container.innerHTML += div.innerHTML;
            }
          });
        });
      } else {
        window.location.href = '../index.html';
      }
    });
};

if (!token || decodedToken.id !== user.id) {
  window.location.href = '../index.html';
} else {
  getUserRideRequests();
}
