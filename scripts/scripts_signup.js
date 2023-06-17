const checkForm = {
  email: false,
  username: false,
  password: false,
};

document.getElementById('email').addEventListener('input', function(e) {
  const email = e.target.value;
  if(email.length < 5 || !((email.includes("@")) && email.includes("."))) {
    document.getElementById('error-email').style.display = 'block';
    checkForm.email = false;
  } else {
    document.getElementById('error-email').style.display = 'none';
    checkForm.email = true;
  }
  checkTrue();
})

document.getElementById('username').addEventListener('input', function(e) {
  const username = e.target.value;
  if(username.length < 5) {
    document.getElementById('error-username').style.display = 'block';
    checkForm.username = false;
  } else {
    document.getElementById('error-username').style.display = 'none';
    checkForm.username = true;
  }
  checkTrue();
})

document.getElementById('password').addEventListener('input', function(e) {
  const confirm = document.getElementById('password_confirm').value;
  const pass = e.target.value;

  if(pass.length < 8) {
    document.getElementById('error-password').style.display = 'block';
    checkForm.password = false;
  } else {
    document.getElementById('error-password').style.display = 'none';
    checkForm.password = true;
  }

  if(pass !== confirm) {
    document.getElementById('error-password-confirm').style.display = 'block';
    checkForm.password = false;
  } else {
    document.getElementById('error-password-confirm').style.display = 'none';
    checkForm.password = true;
  } 
  checkTrue();
})

document.getElementById('password_confirm').addEventListener('input', function(e) {
  const pass = document.getElementById('password').value;
  const confirm = e.target.value;

  if(pass !== confirm) {
    document.getElementById('error-password-confirm').style.display = 'block';
    checkForm.password = false;
  } else {
    document.getElementById('error-password-confirm').style.display = 'none';
    checkForm.password = true;
  } 
  checkTrue();
})

function checkTrue() {
  const btn = document.getElementById('submit');
  if(checkForm.email === true && checkForm.password === true && checkForm.username === true){
    btn.removeAttribute("disabled");
  }else{
    console.log("aq")
    btn.setAttribute("disabled", "disabled");
  }
  
}

const passwordInput = document.getElementById("password");
const showPasswordBtn = document.getElementById("show-password-btn");

showPasswordBtn.addEventListener("click", function() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.innerHTML = '<img src="../assets/eye-slash-solid.svg" class="eye-slash" alt="fa fa-eye-slash">';
  } else {
    passwordInput.type = "password";
    showPasswordBtn.innerHTML = '<img src="../assets/eye-solid.svg" alt="fa fa-eye">';
  }
});

const passwordInput2 = document.getElementById("password_confirm");
const showPasswordBtn2 = document.getElementById("show-password-btn2");

showPasswordBtn2.addEventListener("click", function() {
  if (passwordInput2.type === "password") {
    passwordInput2.type = "text";
    showPasswordBtn2.innerHTML = '<img src="../assets/eye-slash-solid.svg" class="eye-slash" alt="fa fa-eye-slash">';
  } else {
    passwordInput2.type = "password";
    showPasswordBtn2.innerHTML = '<img src="../assets/eye-solid.svg" alt="fa fa-eye">';
  }
});