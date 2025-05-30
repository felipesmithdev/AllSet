let database = require("../database/config")

function selecionarMeses() {
    console.log("Model 'selecionarMeses' \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `
    select distinct month(dt_captura) from captura;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaDiariaCPU(mes) {
    console.log("Model 'mediaDiariaCPU' \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `SELECT DAY(dt_captura) as dia, round(AVG(valor), 2) as media FROM captura WHERE componente = 'CPU'
	AND MONTH(dt_captura) = ${mes}
	GROUP BY DAY(dt_captura)
	ORDER BY dia;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaDiariaRAM(mes) {
    console.log("Model 'mediaDiariaCPU' \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `SELECT DAY(dt_captura) as dia, round(AVG(valor), 2) as media FROM captura WHERE componente = 'RAM'
	AND MONTH(dt_captura) = ${mes}
	GROUP BY DAY(dt_captura)
	ORDER BY dia;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    selecionarMeses,
    mediaDiariaCPU,
    mediaDiariaRAM
}