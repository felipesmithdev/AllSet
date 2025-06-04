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
let ctx = document.getElementById("chartCPU").getContext("2d");
let graficoCPU = new Chart(ctx, {
  type: 'line',
  data: {
    labels: null,
    datasets: [{
      label: 'Média de Uso CPU (%)',
      data: null,
      borderColor: '#61B0FF',
      backgroundColor: '#61B0FF',
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
    },
    maintainAspectRatio: false,
  }
});

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
            borderColor: '#61B0FF',
            backgroundColor: '#61B0FF',
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              title: {
                display: true,
                text: "Uso CPU %",
              },
              beginAtZero: true,
              max: 100
            },
            x: {
              title: {
                display: true,
                text: "Dias"
              }
            }
          },
          maintainAspectRatio: false,
          plugins: {
            annotation: {
              annotations: {
                linha80: {
                  type: 'line',
                  yMin: 70,
                  yMax: 70,
                  borderColor: 'yellow',
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    display: true,
                    content: 'Limite 70%',
                    position: 'start',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white'
                  }
                },
                linha20: {
                  type: 'line',
                  yMin: 85,
                  yMax: 85,
                  borderColor: 'red',
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    display: true,
                    content: 'Limite 85%',
                    position: 'start',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white'
                  }
                }
              }
            }
          }
        }
      });


    })
    .catch(err => console.error("Erro ao buscar médias de CPU:", err));
}

// Função que puxa a média diária de RAM conforme o select acima:
let ctx2 = document.getElementById("chartRAM").getContext("2d");
let graficoRAM = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: null,
    datasets: [{
      label: 'Média de Uso RAM (%)',
      data: null,
      borderColor: '#61B0FF',
      backgroundColor: '#61B0FF',
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
    },
    maintainAspectRatio: false,
  }
});

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

      let ctx2 = document.getElementById("chartRAM").getContext("2d");
      graficoRAM = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: dias,
    datasets: [{
      label: 'Média de Uso RAM (%)',
      data: medias,
      borderColor: '#61B0FF',
      backgroundColor: '#61B0FF',
      borderWidth: 2,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Uso RAM %"
        }
      },
      x: {
        title: {
          display: true,
          text: "Dias"
        }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          linha80: {
            type: 'line',
            yMin: 70,
            yMax: 70,
            borderColor: 'yellow',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: 'Limite 70%',
              position: 'start',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }
          },
          linha20: {
            type: 'line',
            yMin: 85,
            yMax: 85,
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: 'Limite 85%',
              position: 'start',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }
          }
        }
      }
    }
  }
});

    })
    .catch(err => console.error("Erro ao buscar médias de CPU:", err));
}


// Gráficos das bases externas e chamada das funções do S3:
let chuvaGraf = document.getElementById("chartChuva").getContext("2d");
let chuvaBars = new Chart(chuvaGraf, {
  type: 'bar',
  data: {
    labels: null,
    datasets: [
      {
        label: "Chuva",
        data: null,
        backgroundColor: "#61B0FF"
      }
    ]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    maintainAspectRatio: false,
  }
});

let trafegoGraf = document.getElementById("chartTrafego").getContext("2d");
let trafegoBars = new Chart(trafegoGraf, {
  type: 'bar',
  data: {
    labels: null,
    datasets: [
      {
        label: "Tráfego",
        data: null,
        backgroundColor: "#61B0FF"
      }
    ]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    maintainAspectRatio: false,
  }
});

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
          backgroundColor: "#61B0FF"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "mm Chuva"
          }
        },
        x: {
          display: true,
          text: "Dias"
        },
      },
      maintainAspectRatio: false,
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
          backgroundColor: "#61B0FF"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            text: "Quantidade Carros",
            display: true
          }
        }
      },
      maintainAspectRatio: false,
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

function calcularCorrelacao(x, y) {
  const n = x.length;
  const mediaX = x.reduce((a, b) => a + b, 0) / n;
  const mediaY = y.reduce((a, b) => a + b, 0) / n;

  let numerador = 0;
  let somaX2 = 0;
  let somaY2 = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - mediaX;
    const dy = y[i] - mediaY;
    numerador += dx * dy;
    somaX2 += dx * dx;
    somaY2 += dy * dy;
  }

  const denominador = Math.sqrt(somaX2 * somaY2);
  const r = numerador / denominador;
  return r;
}


let regLinear = document.getElementById('chartRegressao').getContext('2d');
let graficoRegressao = new Chart(regLinear, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Dados',
      data: null,
      borderColor: '#61B0FF',
      backgroundColor: '#61B0FF',
      pointRadius: 5
    },],
  },
  options: {
    plugins: {
      title: {
        display: true,
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
    },
    maintainAspectRatio: false,
  }
});

function gerarGrafico() {

  let regressao = calcularRegressaoLinear(dadosX, dadosY);
  let r = calcularCorrelacao(dadosX, dadosY);

  let forcaCorrelacao = document.getElementById("kpiCorrelacao");
  forcaCorrelacao.innerHTML = r.toFixed(2);

  let pico = document.getElementById("kpiPico")
  let kpiMax = Math.max(...dadosY);
  pico.innerHTML = kpiMax

  let media = document.getElementById("kpiMedia")
  let soma = 0;

  for (i = 0; i < dadosY.length; i++) {
    soma += dadosY[i];
  }

  media.innerHTML = (soma / dadosY.length).toFixed(2)

  let vale = document.getElementById("kpiVale")
  let kpiMin = Math.min(...dadosY);
  vale.innerHTML = kpiMin

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
        }
      },
      scales: {
        x: {
          title: {
            text: "Variável",
            display: true
          }
        },
        y: {
          title: {
            display: true,
            text: "Métrica"
          }
        }
      },
      maintainAspectRatio: false,
    }
  });
}

function resetDados() {
  if (graficoRegressao) {
    graficoRegressao.destroy();

    regLinear = document.getElementById('chartRegressao').getContext('2d');
    graficoRegressao = new Chart(regLinear, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Dados',
          data: null,
          borderColor: '#61B0FF',
          backgroundColor: '#61B0FF',
          pointRadius: 5
        },],
      },
      options: {
        plugins: {
          title: {
            display: true,
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
        },
        maintainAspectRatio: false
      }
    });
  }

  let select1 = document.getElementById("selectMetrica")
  let select2 = document.getElementById("selectVariavel")

  select1.value = "padrao"
  select2.value = "padrao"

  dadosX = []
  dadosY = []

  let correlacao = document.getElementById("kpiCorrelacao")
  correlacao.innerHTML = "Valor ?"

  let pico = document.getElementById("kpiPico")
  pico.innerHTML = "Valor ?"

  let media = document.getElementById("kpiMedia")
  media.innerHTML = "Valor ?"

  let vale = document.getElementById("kpiVale")
  vale.innerHTML = "Valor ?"

  const select = document.getElementById("selectMeses");

  let indicadorMes = document.getElementById("indicadorMes")
  indicadorMes.innerHTML = select.value
}
