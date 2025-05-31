var database = require("../database/config");

function calcularKpi2() {
    var instrucaoSql = `
        SELECT * FROM kpi2;
        SELECT * FROM totalECriticos;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function calcularKpi3() {
    var instrucaoSql = `SELECT * FROM kpi3`;
    
    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    calcularKpi2,
    calcularKpi3
};