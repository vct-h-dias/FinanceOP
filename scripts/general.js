document.getElementById("signup").addEventListener("click", function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    email: email,
    username: username,
    password: password
  };

  console.log(data);
  document.getElementById("formulario").reset();
  cadastrar(data);
});

async function cadastrar(data) {
  const url = "http://localhost:5000/user.php"
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  
  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Erro:', error);
  }
} 
  