const dias30 = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

const capturasCriticasCPU = dias30.map(() => Math.floor(Math.random() * 6) + 5);
const capturasCriticasRAM = dias30.map(() => Math.floor(Math.random() * 6) + 5);

const ctxCPU = document.getElementById('graficoLinha1');
let chartCPU;
if (ctxCPU) {
  chartCPU = new Chart(ctxCPU, {
    type: 'line',
    data: {
      labels: dias30,
      datasets: [{
        label: 'CPU',
        data: capturasCriticasCPU,
        borderColor: '#FF3B3B',
        backgroundColor: 'rgba(255, 59, 59, 0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 9,
        pointBackgroundColor: '#FF3B3B',
        pointStyle: 'circle',
        borderWidth: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2c2c2c',
          titleColor: '#fff',
          bodyColor: '#ddd',
          cornerRadius: 4,
          padding: 10,
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Dias', font: { size: 14, weight: 'bold' }, color: '#333' },
          ticks: { color: '#333', autoSkip: false, font: { size: 15, weight: '500' } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...capturasCriticasCPU) + 2,
          title: { display: true, text: 'Quantidade', font: { size: 14, weight: 'bold' }, color: '#333' },
          ticks: { color: '#333', font: { size: 12 } },
          grid: { color: '#eee', borderDash: [5, 5] }
        }
      }
    }
  });
}

const ctxRAM = document.getElementById('graficoLinha2');
let chartRAM;
if (ctxRAM) {
  chartRAM = new Chart(ctxRAM, {
    type: 'line',
    data: {
      labels: dias30,
      datasets: [{
        label: 'RAM',
        data: capturasCriticasRAM,
        borderColor: '#0040FF',
        backgroundColor: 'rgba(0, 64, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 9,
        pointBackgroundColor: '#0040FF',
        pointStyle: 'circle',
        borderWidth: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2c2c2c',
          titleColor: '#fff',
          bodyColor: '#ddd',
          cornerRadius: 4,
          padding: 10,
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Dias', font: { size: 14, weight: 'bold' }, color: '#333' },
          ticks: { color: '#333', autoSkip: false, font: { size: 15, weight: '500' } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...capturasCriticasRAM) + 2,
          title: { display: true, text: 'Quantidade', font: { size: 16, weight: 'bold' }, color: '#333' },
          ticks: { color: '#333', font: { size: 12 } },
          grid: { color: '#eee', borderDash: [5, 5] }
        }
      }
    }
  });
}

const somaCPU = capturasCriticasCPU.reduce((a, b) => a + b, 0);
const somaRAM = capturasCriticasRAM.reduce((a, b) => a + b, 0);
const somaDISCO = Math.floor(Math.random() * 60) + 60;

const ctxBarras = document.getElementById('graficoBarrasGeral');
if (ctxBarras) {
  new Chart(ctxBarras, {
    type: 'bar',
    data: {
      labels: ['Crítico', 'Moderado', 'Normal'],
      datasets: [{
        label: 'Total de Capturas Críticas',
        data: [somaCPU, somaRAM, somaDISCO],
        backgroundColor: ['#FF3B3B', '#0040FF', '#0A944B'],
        borderRadius: 15,
        borderSkipped: false,
        barThickness: 100,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Total de Capturas Críticas por Componente',
          font: { size: 22, weight: 'bold' },
          color: '#222'
        },
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2c2c2c',
          titleColor: '#fff',
          bodyColor: '#ddd',
          cornerRadius: 4,
          padding: 10,
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 }
        }
      },
      scales: {
        x: {
          ticks: { color: '#333', font: { size: 18, weight: '500' } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(somaCPU, somaRAM, somaDISCO) + 20,
          ticks: { color: '#333', font: { size: 12 } },
          title: {
            display: true,
            text: 'Capturas',
            font: { size: 14, weight: 'bold' },
            color: '#333'
          },
          grid: { color: '#eee', borderDash: [4, 4] }
        }
      }
    }
  });
}