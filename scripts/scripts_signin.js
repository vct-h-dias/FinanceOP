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