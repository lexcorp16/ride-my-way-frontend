const button = document.getElementById("submit");
const error = document.getElementById("error");

const email = document.getElementById("email").value;
const fullName = document.getElementById("fullName").value;
const phoneNumber = document.getElementById("phoneNumber").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;



button.onclick = () => {
  console.log("clicked");
  const url = "https://ride-my-way-app.herokuapp.com/api/v1/auth/signup";
  // The data we are going to send in our request
  const data = {
    fullName: "Sara",
    email: "email@yes.com",
    password: "password",
    phoneNumber: "08124774308"
  };
  // The parameters we are gonna pass to the fetch function
  let fetchData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    }
  };
  fetch(url, fetchData)
    .then(response => response.json())
    .then(data => console.log(data));
  // fetch('https://ride-my-way-app.herokuapp.com/api/v1/auth/signup', {
  //   method: 'POST',
  //   body: {fullName: JSON.stringify(fullName.value)},
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  // }).then(data => console.log(data));

  // fetch('https://ride-my-way-app.herokuapp.com/api/v1/rides').then(data => data.json()).then(data => console.log(data));
};

clearError = () => {
  error.innerHTML = "";
};

email.onkeydown = clearError;

password.onkeydown = clearError;

confirmPassword.onkeydown = clearError;
