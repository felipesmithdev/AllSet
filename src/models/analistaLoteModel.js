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

function plotarGrafico1(categoria, lote, periodo, componente) {
    var instrucaoSql = `
        SELECT ${categoria}, DATE_FORMAT(data, '%d/%m') AS data
        FROM historicoQtdPorCategoria
        WHERE tipo = '${componente}' AND lote = ${parseInt(lote)}
        ORDER BY data DESC LIMIT ${parseInt(periodo)};
    `;
    
    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarGrafico2(categoria2, lote, periodo, componente2) {
    var instrucaoSql = `
        SELECT ${categoria2}, DATE_FORMAT(data, '%d/%m') AS data
        FROM historicoQtdPorCategoria
        WHERE tipo = '${componente2}' AND lote = ${parseInt(lote)}
        ORDER BY data DESC LIMIT ${parseInt(periodo)};
    `;
    
    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarLinha() {
        var instrucaoSql = `
        SELECT ${categoria2}, DATE_FORMAT(data, '%d/%m') AS data
        FROM historicoQtdPorCategoria
        WHERE tipo = '${componente2}' AND lote = ${parseInt(lote)}
        ORDER BY data DESC LIMIT ${parseInt(periodo)};
    `;
    
    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    calcularKpi2,
    calcularKpi3,
    plotarGrafico1,
    plotarGrafico2,
    plotarLinha
};