let database = require("../database/config")

function selecionarMeses() {
  var instrucaoSql = `
    SELECT DISTINCT 
      MONTH(dt_captura) AS num_mes, 
      YEAR(dt_captura) AS ano,
      LOWER(DATE_FORMAT(dt_captura, '%b-%Y')) AS mes 
    FROM captura
    ORDER BY ano, num_mes;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function mediaDiariaCPU(mes, ano) {
    console.log("Model 'mediaDiariaCPU' \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `
    SELECT DAY(dt_captura) as dia, round(AVG(valor), 2) as media 
    FROM captura 
    WHERE componente = 'CPU'
      AND MONTH(dt_captura) = ${mes}
      AND YEAR(dt_captura) = ${ano}
    GROUP BY DAY(dt_captura)
    ORDER BY dia;
  `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaDiariaRAM(mes, ano) {
    console.log("Model 'mediaDiariaCPU' \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `
    SELECT DAY(dt_captura) as dia, round(AVG(valor), 2) as media 
    FROM captura 
    WHERE componente = 'RAM'
      AND MONTH(dt_captura) = ${mes}
      AND YEAR(dt_captura) = ${ano}
    GROUP BY DAY(dt_captura)
    ORDER BY dia;
  `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    selecionarMeses,
    mediaDiariaCPU,
    mediaDiariaRAM
}