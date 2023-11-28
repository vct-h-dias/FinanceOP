var transactions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const dict = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

const setupViz = () => {
  let chartStatus = Chart.getChart("barChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  var barCtx = document.getElementById("barChart").getContext("2d");
  var barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          label: "Transações por Mês",
          data: transactions,
          backgroundColor: ["rgba(153, 102, 255, 0.2)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
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
};

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
        data.transactions.map((transaction) => {
          transactions[parseInt(transaction.month) - 1] += parseFloat(
            transaction.value
          );

          console.log(transactions);
        });
      })
      .then(() => {
        setupViz();
      })
      .catch((error) => {
        console.error("Erro ao obter transações:", error);
      });
  } else {
    console.error("Informações do usuário não encontradas no localStorage");
  }
});

function openModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";

  document.getElementById("numberInput").value = "";
  document.getElementById("months").value = "";

  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.setAttribute("disabled", true);
}

function checkInputs() {
  const month = document.getElementById("months").value;
  const number = document.getElementById("numberInput").value;
  const confirmBtn = document.getElementById("confirmBtn");

  if (month && number !== "") {
    confirmBtn.removeAttribute("disabled");
  } else {
    confirmBtn.setAttribute("disabled", true);
  }
}

// function confirmAction() {
//   const month = document.getElementById("months").value;
//   const number = document.getElementById("numberInput").value;

//   alert(`Mês selecionado: ${month}\nNúmero digitado: ${number}`);
//   closeModal();
// }

// DELETE
function openDeleteModal() {
  document.getElementById("modal-delete").style.display = "block";
  document.getElementById("overlay-delete").style.display = "block";
}

function closeDeleteModal() {
  document.getElementById("modal-delete").style.display = "none";
  document.getElementById("overlay-delete").style.display = "none";

  document.getElementById("months-delete").value = "";

  const confirmBtn = document.getElementById("confirmBtn-delete");
  confirmBtn.setAttribute("disabled", true);
}

function checkDeleteInputs() {
  const month = document.getElementById("months-delete").value;
  const confirmBtn = document.getElementById("confirmBtn-delete");

  if (month) {
    confirmBtn.removeAttribute("disabled");
  } else {
    confirmBtn.setAttribute("disabled", true);
  }
}

// function confirmDeleteAction() {
//   const month = document.getElementById("months-delete").value;

//   alert(`Mês selecionado: ${month}`);
//   closeDeleteModal();
// }

const confirmAction = () => {
  var userData = localStorage.getItem("user");
  var user = JSON.parse(userData);

  const url = "http://localhost:5000/transactions.php";

  const m = document.getElementById("months").value;
  // console.log(dict[m]);

  const transa = document.getElementById("numberInput").value;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.data.id,
      month: dict[m],
      value: transa,
    }),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Transação atualizada com sucesso:", data);
      transactions[dict[m] - 1] = transa;
      setupViz();
      closeModal();

      document.getElementById("numberInput").value = "";
      document.getElementById("months").value = "";
    })
    .catch((error) => {
      console.error("Erro ao atualizar transação:", error);
    });
};

const confirmDeleteAction = () => {
  var userData = localStorage.getItem("user");
  var user = JSON.parse(userData);

  const url = "http://localhost:5000/transactions.php";

  const m = document.getElementById("months-delete").value;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.data.id,
      month: dict[m],
    }),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Transação deletada com sucesso:", data);
      transactions[dict[m] - 1] = 0;
      setupViz();
      closeModal();

      document.getElementById("months-delete").value = "";
      closeDeleteModal();
    })
    .catch((error) => {
      console.error("Erro ao atualizar transação:", error);
    });
};
