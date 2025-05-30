window.onload = function() {
    selectMeses();
};

function selectMeses() {
    fetch("/regressao/selecionarMeses", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao buscar meses");
        }
        return res.json();
    })
    .then(data => {
        console.log("Meses recebidos:", data);
        let select = document.getElementById("selectMeses");


        select.innerHTML = '<option value="" selected disabled>Mês</option>';

        data.forEach(item => {
            let mes = item["month(dt_captura)"];
            let option = document.createElement("option");
            option.value = mes;
            option.textContent = mes;
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