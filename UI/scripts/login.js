const button = document.getElementById('submit');
const spinner = document.getElementById('spinner');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const apiError = document.getElementById('apiError');

const email = document.getElementById('email');
const password = document.getElementById('password');

const validateNotEmpty = () => {
  if (!email.value) {
    emailError.setAttribute('style', 'display: initial;');
    email.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    emailError.innerHTML = 'Please enter a valid email address.';
  }

  if (!password.value) {
    passwordError.setAttribute('style', 'display: initial;');
    password.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    passwordError.innerHTML = 'Please enter your password.';
  }
};

const clearError = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};


const login = () => {
  const url = 'https://ride-my-way-app.herokuapp.com/api/v1/auth/login';

  const body = {
    email: email.value,
    password: password.value,
  };

  const fetchData = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  spinner.setAttribute('style', 'display: initial');

  fetch(url, fetchData)
    .then(response => response.json())
    .then((data) => {
      spinner.setAttribute('style', 'display: none');

      if (data.status === 'success') {
        window.location.href = '../views/offers.html';
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        apiError.setAttribute('style', 'display: initial');
        apiError.innerHTML = data.message;
      }
    });
};


button.onclick = () => {
  validateNotEmpty();
  if (password.value && email.value) {
    login();
  }
};

document.body.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    button.click();
  }
});


// Clear Errors
email.onkeydown = () => {
  clearError(email, emailError);
};

password.onkeydown = () => {
  clearError(password, passwordError);
};
