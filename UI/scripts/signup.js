const button = document.getElementById('submit');
const spinner = document.getElementById('spinner');

const fullNameError = document.getElementById('fullNameError');
const phoneNumberError = document.getElementById('phoneNumberError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const apiError = document.getElementById('apiError');

const email = document.getElementById('email');
const fullName = document.getElementById('fullName');
const phoneNumber = document.getElementById('phoneNumber');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const validateNotEmpty = () => {
  if (!email.value) {
    emailError.setAttribute('style', 'display: initial;');
    email.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    emailError.innerHTML = 'Please enter a valid email address.';
  }

  if (!password.value) {
    passwordError.setAttribute('style', 'display: initial;');
    password.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    passwordError.innerHTML = 'Please enter a password.';
  }

  if (!phoneNumber.value) {
    phoneNumberError.setAttribute('style', 'display: initial;');
    phoneNumber.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    phoneNumberError.innerHTML = 'Please enter a valid Nigerian phone number.';
  }

  if (!fullName.value) {
    fullNameError.setAttribute('style', 'display: initial;');
    fullName.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
    fullNameError.innerHTML = 'Please enter your full name.';
  }
};

const passwordCheck = () => {
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.setAttribute('style', 'display: initial');
    confirmPasswordError.innerHTML = 'Passwords do not match';
    confirmPassword.setAttribute('style', 'border: 1px solid red; box-shadow: 0 0 10px red');
  } else {
    return true;
  }
};

const clearError = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};


const signup = () => {
  const url = 'https://ride-my-way-app.herokuapp.com/api/v1/auth/signup';

  const body = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
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
  passwordCheck();
  if (password.value && email.value && phoneNumber.value && fullName.value && passwordCheck()) {
    signup();
  }
};


// Clear Errors

email.onkeydown = () => {
  clearError(email, emailError);
};

password.onkeydown = () => {
  clearError(password, passwordError);
};

phoneNumber.onkeydown = () => {
  clearError(phoneNumber, phoneNumberError);
};

fullName.onkeydown = () => {
  clearError(fullName, fullNameError);
};

confirmPassword.onkeydown = () => {
  clearError(confirmPassword, confirmPasswordError);
};
