// Puxando os meses do banco de dados:

window.onload = function () {
  selectMeses();
};

function selectMeses() {
  fetch("/regressao/selecionarMeses")
    .then(res => res.json())
    .then(meses => {
      const select = document.getElementById("selectMeses");
      select.innerHTML += ""

      meses.forEach(m => {
        const option = document.createElement("option");
        option.value = `${m.num_mes}-${m.ano}`;
        option.textContent = m.mes.toUpperCase();
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
    });
}


// Função que puxa a média diária de CPU conforme o select acima:
let graficoCPU = null;

function mediaDiariaCPU() {
  let select = document.getElementById("selectMeses");
  let mesSelecionado = select.value;

  if (mesSelecionado === "") {
    alert("Selecione um mês antes.");
    return;
  }

  fetch(`/regressao/mediaDiariaCPU/${mesSelecionado}`)
    .then(res => res.json())
    .then(data => {

      let dias = data.map(item => item.dia);
      let medias = data.map(item => item.media);

      if (graficoCPU) {
        graficoCPU.destroy();
      }

      let ctx = document.getElementById("chartCPU").getContext("2d");
      graficoCPU = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dias,
          datasets: [{
            label: 'Média de Uso CPU (%)',
            data: medias,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    })
    .catch(err => console.error("Erro ao buscar médias de CPU:", err));
}

// Função que puxa a média diária de RAM conforme o select acima:
let graficoRAM = null;

function mediaDiariaRAM() {
  let select = document.getElementById("selectMeses");
  let mesSelecionado = select.value;

  if (mesSelecionado === "") {
    alert("Selecione um mês antes.");
    return;
  }

  fetch(`/regressao/mediaDiariaRAM/${mesSelecionado}`)
    .then(res => res.json())
    .then(data => {

      let dias = data.map(item => item.dia);
      let medias = data.map(item => item.media);

      if (graficoRAM) {
        graficoRAM.destroy();
      }

      let ctx = document.getElementById("chartRAM").getContext("2d");
      graficoRAM = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dias,
          datasets: [{
            label: 'Média de Uso RAM (%)',
            data: medias,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    })
    .catch(err => console.error("Erro ao buscar médias de CPU:", err));
}


// Gráficos das bases externas e chamada das funções do S3:
let chuvaBars = null;
let trafegoBars = null;

document.getElementById("selectMeses").addEventListener("change", (e) => {
  const mesSelecionado = e.target.value;
  carregarDadosPorMes(mesSelecionado);
});

async function carregarDadosPorMes(mesSelecionado) {
  const response = await fetch(`/s3/dados/${mesSelecionado}`);
  const dados = await response.json();

  const dadosChuva = dados.chuva;
  const dadosTrafego = dados.trafego;

  atualizarGrafico(dadosChuva, dadosTrafego);
}

function atualizarGrafico(dadosChuva, dadosTrafego) {
  const labels = Object.keys(dadosChuva);
  const valoresChuva = Object.values(dadosChuva);
  const valoresTrafego = Object.values(dadosTrafego);

  if (chuvaBars) {
    chuvaBars.destroy();
  }

  let chuvaGraf = document.getElementById("chartChuva").getContext("2d");
  chuvaBars = new Chart(chuvaGraf, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Chuva",
          data: valoresChuva,
          backgroundColor: "rgb(74, 45, 245)"
        }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  if (trafegoBars) {
    trafegoBars.destroy();
  }

  let trafegoGraf = document.getElementById("chartTrafego").getContext("2d");
  trafegoBars = new Chart(trafegoGraf, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Tráfego",
          data: valoresTrafego,
          backgroundColor: "rgb(254, 73, 78)"
        }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  console.log(trafegoBars.data.datasets[0].data)
}




// Regressão Linear:

let dadosX = [];
let dadosY = [];

function selecionarMetrica() {
  let metrica = document.getElementById("selectMetrica");

  if (metrica.value == "1") {
    dadosY = graficoCPU.data.datasets[0].data
    console.log(graficoCPU.data.datasets[0].data)
  }

  if (metrica.value == "2") {
    dadosY = graficoRAM.data.datasets[0].data
    console.log([graficoRAM.data.datasets[0].data])
  }
}

function selecionarVariavel() {
  let variavel = document.getElementById("selectVariavel");

  if (variavel.value == "1") {
    dadosX = chuvaBars.data.datasets[0].data;
    console.log(chuvaBars.data.datasets[0].data)
  }

  if (variavel.value == "2") {
    dadosX = trafegoBars.data.datasets[0].data;
    console.log(trafegoBars.data.datasets[0].data);
  }

}

function calcularRegressaoLinear(x, y) {
  const n = x.length;
  const mediaX = x.reduce((a, b) => a + b, 0) / n;
  const mediaY = y.reduce((a, b) => a + b, 0) / n;

  let somaXY = 0;
  let somaX2 = 0;
  for (let i = 0; i < n; i++) {
    somaXY += x[i] * y[i];
    somaX2 += x[i] * x[i];
  }

  const m = (somaXY - n * mediaX * mediaY) / (somaX2 - n * mediaX * mediaX);
  const b = mediaY - m * mediaX;

  return { m, b };
}

let graficoRegressao = null;

function gerarGrafico() {

  let regressao = calcularRegressaoLinear(dadosX, dadosY);

  let minX = Math.min(...dadosX);
  let maxX = Math.max(...dadosX);

  let dadosLinha = {
    label: 'Regressão Linear',
    data: [
      { x: minX, y: regressao.m * minX + regressao.b },
      { x: maxX, y: regressao.m * maxX + regressao.b }
    ],
    type: 'line',
    borderColor: '#34495e',
    backgroundColor: '#34495e',
    fill: false,
    showLine: true
  };

  let regLinear = document.getElementById('chartRegressao').getContext('2d');

  if (graficoRegressao) {
    graficoRegressao.destroy();
  }

  graficoRegressao = new Chart(regLinear, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Dados',
        data: dadosX.map((x, i) => ({ x: x, y: dadosY[i] })),
        borderColor: '#61B0FF',
        backgroundColor: '#61B0FF',
        pointRadius: 5
      }, dadosLinha],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Correlação de variáveis",
          align: 'start'
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: 'X'
        },
        y: {
          type: 'linear',
          title: 'Y'
        }
      }
    }
  });
}


