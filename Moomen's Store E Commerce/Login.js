document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const passvalid = document.getElementById("passvalid");

  if (!email || !password) {
    passvalid.innerHTML = "Please fill in both fields.";
    passvalid.style.color = "red";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    passvalid.innerHTML = "Invalid Email or Password";
    passvalid.style.color = "red";
    return;
  }
  window.location.href = "home.html"; 
});
