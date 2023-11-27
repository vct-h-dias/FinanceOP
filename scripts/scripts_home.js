//OBTENDO DADOS DO USUÁRIO
document.addEventListener("DOMContentLoaded", function () {
  var userData = localStorage.getItem("user");

  if (userData) {
    var user = JSON.parse(userData);

    const url = `http://localhost:5000/transactions.php?user_id=${user.data.id}`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Transações do usuário:", data.transactions);
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  } else {
    console.error("Informações do usuário não encontradas no localStorage");
  }
});

//GRÁFICOS
document.addEventListener("DOMContentLoaded", function () {
  // Dados de exemplo (substitua pelos seus dados reais)
  var transactionData = [10, 20, 30, 15, 25];

  // Gráfico de Barra
  var barCtx = document.getElementById("barChart").getContext("2d");
  var barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: [
        "Categoria 1",
        "Categoria 2",
        "Categoria 3",
        "Categoria 4",
        "Categoria 5",
      ],
      datasets: [
        {
          label: "Transações por Categoria",
          data: transactionData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  var pieCtx = document.getElementById("pieChart").getContext("2d");
  var pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: [
        "Categoria 1",
        "Categoria 2",
        "Categoria 3",
        "Categoria 4",
        "Categoria 5",
      ],
      datasets: [
        {
          data: transactionData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
});
