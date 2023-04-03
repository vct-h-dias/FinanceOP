const passwordInput = document.getElementById("password");
const showPasswordBtn = document.getElementById("show-password-btn");

showPasswordBtn.addEventListener("click", function() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.innerHTML = '<img src="../assets/eye-slash-solid.svg" style="margin-left: -20;" width="20" alt="fa fa-eye-slash">';
  } else {
    passwordInput.type = "password";
    showPasswordBtn.innerHTML = '<img src="../assets/eye-solid.svg" width="20" alt="fa fa-eye">';
  }
});

const passwordInput2 = document.getElementById("password_confirm");
const showPasswordBtn2 = document.getElementById("show-password-btn2");

showPasswordBtn2.addEventListener("click", function() {
  if (passwordInput2.type === "password") {
    passwordInput2.type = "text";
    showPasswordBtn2.innerHTML = '<img src="../assets/eye-slash-solid.svg" style="margin-left: -20;" width="20" alt="fa fa-eye-slash">';
  } else {
    passwordInput2.type = "password";
    showPasswordBtn2.innerHTML = '<img src="../assets/eye-solid.svg" width="20" alt="fa fa-eye">';
  }
});