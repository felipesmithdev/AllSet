window.onload = function() {
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

// Chamada S3:

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
  const labels = dadosChuva.map(item => item.componente);
  const valoresChuva = dadosChuva.map(item => item.valor);
  const valoresTrafego = dadosTrafego.map(item => item.valor);

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
}
