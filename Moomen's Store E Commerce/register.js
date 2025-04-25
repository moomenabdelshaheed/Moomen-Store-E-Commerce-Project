usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // يمنع إعادة تحميل الصفحة

    const name = document.getElementById("username").value.trim();
    const uservalid = document.getElementById("uservalid");

    const emailvalid = document.getElementById("emailvalid");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    if (!usernameRegex.test(name)) {
      uservalid.innerHTML = "You Entered invalid name";
    }
    if (!emailRegex.test(email)) {
      emailvalid.innerHTML = "You Entered invalid email";
    }
    if (password !== confirmPassword) {
      var passvalid = document.getElementById("passvalid");
      passvalid.innerHTML = "You Entered Unmatched Password";
      passvalid.style.color = "red";
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isDuplicate = users.some((user) => user.email === email);
    if (isDuplicate) {
      emailvalid.innerHTML = "<h6>This Email is Already Registered</h6>";
      emailvalid.style.color = "red";
      return;
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم التسجيل بنجاح!");
    window.location.href = "home.html";
  });
