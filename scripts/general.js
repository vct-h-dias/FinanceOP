//verifica se o usuário esta logado ou nao
var isLoggedIn = false;

//recebe os dados dos formulários
document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();

  if (this.getAttribute("form-type") === "login") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email: email,
      password: password,
    };

    await logar(data);
  } else if (this.getAttribute("form-type") === "signup") {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      email: email,
      username: username,
      password: password,
    };

    await cadastrar(data);
    const btn = document.getElementById("submit");
    btn.setAttribute("disabled", "disabled");
  }
  
  document.getElementById("formulario").reset();
});

//recebe os dados e cadastra o usuário
async function cadastrar(data) {
  const url = "http://localhost:5000/user.php";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    const login = {
      email: data.email,
      password: data.password,
    };

    if (response.status === 409) {
      document.getElementById("error-login").style.display = "block";
    } else if (response.status === 200) {
      logar(login);
    } else {
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

//recebe os dados e efetua o login
async function logar(data) {
  const url = "http://localhost:5000/auth.php";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (responseData.sucess !== false) {
      document.getElementById("error-login").style.display = "none";

      console.log(responseData);
      isLoggedIn = true;
      isLogged(responseData);
    } else {
      document.getElementById("error-login").style.display = "block";
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

//realiza as alterações na página conforme o usuário esteja logado ou não, falta adicionar
// a verificação de cookie ao inves de variavel
function isLogged(data) {
  const signUpButton = document.getElementById("signup-button");
  const loginButton = document.getElementById("login-button");
  const homeButton = document.getElementById("home-button");
  const loggedInDiv = document.getElementById("logged-in-div");

  if (isLoggedIn) {
    signUpButton.style.display = "none";
    loginButton.style.display = "none";
    homeButton.href = "http://localhost:5500/pages/home.html"; // Defina o link para a outra página desejada
    loggedInDiv.style.display = "flex";

    const image = document.createElement("img");
    image.alt = "";

    if (data.data.url_image !== null) {
      image.src = data.data.url_image;
    } else {
      image.src = "../assets/noImg.png";
    }
    image.style.width = "45px"; // Definindo largura da imagem
    image.style.height = "45px";

    const divContainer = document.createElement("div");

    const greetingParagraph = document.createElement("p");
    greetingParagraph.textContent = "Olá " + data.data.username + "!";

    const heading1 = document.createElement("h6");
    heading1.textContent = "Clique aqui para Sair";

    divContainer.appendChild(greetingParagraph);
    divContainer.appendChild(heading1);

    loggedInDiv.appendChild(image);
    loggedInDiv.appendChild(divContainer);

    //window.location.href = "../pages/home.html";
  } else {
    signUpButton.style.display = "block";
    loginButton.style.display = "block";
    homeButton.href = "http://localhost:5500/"; // Defina o link de volta para a página inicial
    loggedInDiv.style.display = "none";
  }
}

/*function checkLoginAndRedirect() {
  const currentRoute = window.location.pathname;

  if (isLoggedIn && (currentRoute === '/pages/signin.html' || currentRoute === '/pages/signup.html')) {
    window.location.href = '/pages/home.html';
  }

  if (!isLoggedIn && currentRoute === '/pages/home.html') {
    window.location.href = '/';
  }
}

// Verificar o estado de login e redirecionar na carga da página
window.addEventListener('DOMContentLoaded', checkLoginAndRedirect);
*/
