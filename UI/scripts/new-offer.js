const button = document.getElementById('submit');
const spinner = document.getElementById('spinner');

const destination = document.getElementById('destination');
const pointOfDeparture = document.getElementById('pointOfDeparture');
const departureTime = document.getElementById('departureTime');
const departureDate = document.getElementById('departureDate');
const vehicleCapacity = document.getElementById('vehicleCapacity');

const destinationError = document.getElementById('destinationError');
const departureTimeError = document.getElementById('departureTimeError');
const departureDateError = document.getElementById('departureDateError');
const vehicleCapacityError = document.getElementById('vehicleCapacityError');
const pointOfDepartureError = document.getElementById('pointOfDepartureError');
const apiError = document.getElementById('apiError');

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../index.html';
}


const validateNotEmpty = () => {
  if (!destination.value) {
    destinationError.setAttribute('style', 'display: initial;');
    destination.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    destinationError.innerHTML = 'Please enter the ride destination.';
  }

  if (!pointOfDeparture.value) {
    pointOfDepartureError.setAttribute('style', 'display: initial;');
    pointOfDeparture.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    pointOfDepartureError.innerHTML = 'Please enter a starting location.';
  }

  if (!vehicleCapacity.value) {
    vehicleCapacityError.setAttribute('style', 'display: initial;');
    vehicleCapacity.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    vehicleCapacityError.innerHTML = 'Please enter the number of available seats.';
  }

  if (!departureDate.value) {
    departureDateError.setAttribute('style', 'display: initial;');
    departureDate.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    departureDateError.innerHTML = 'Please enter a valid date.';
  }

  if (!departureTime.value) {
    departureTimeError.setAttribute('style', 'display: initial;');
    departureTime.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    departureTimeError.innerHTML = 'Please enter a valid time.';
  }
};

const formatDate = (date) => {
  const splitDate = date.split('-');
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
};


const createRideOffer = () => {
  const url = 'https://ride-my-way-app.herokuapp.com/api/v1/users/rides';

  const body = {
    destination: destination.value,
    pointOfDeparture: pointOfDeparture.value,
    vehicleCapacity: vehicleCapacity.value,
    departureTime: departureTime.value,
    departureDate: formatDate(departureDate.value),
  };

  const fetchData = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-access-token': token,
    },
  };

  spinner.setAttribute('style', 'display: initial');

  fetch(url, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinner.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        swal({
          type: 'success',
          title: data.message,
          showCloseButton: true,
          confirmButtonColor: '#8cc449',
          confirmButtonText: 'See all Rides',
        }).then((result) => {
          if (result.value) {
            window.location.href = '../views/offers.html';
          }
        });
      } else {
        apiError.setAttribute('style', 'display: initial');
        apiError.innerHTML = data.message;
      }
    });
};


const clearError = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};

// Clear Errors

destination.onkeydown = () => {
  clearError(destination, destinationError);
};

departureDate.onchange = () => {
  clearError(departureDate, departureDateError);
};

departureTime.onchange = () => {
  clearError(departureTime, departureTimeError);
};

vehicleCapacity.onkeydown = () => {
  clearError(vehicleCapacity, vehicleCapacityError);
};

pointOfDeparture.onkeydown = () => {
  clearError(pointOfDeparture, pointOfDepartureError);
};

button.onclick = () => {
  validateNotEmpty();

  if (destination.value
      && departureDate.value
      && vehicleCapacity.value
      && departureTime.value
      && pointOfDeparture.value
  ) {
    createRideOffer();
  }
};

document.body.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    button.click();
  }
});
