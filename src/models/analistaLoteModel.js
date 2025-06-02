var database = require("../database/config");

function calcularKpi2(lote, periodo) {
    var instrucaoSql = `
        SELECT
            TRUNCATE(SUM(critico) / (SUM(critico) + SUM(moderado) + SUM(normal)) * 100, 0) AS porcentagem
        FROM (
            SELECT data,
                   SUM(critico) AS critico,
                   SUM(moderado) AS moderado,
                   SUM(normal) AS normal
            FROM historicoQtdPorCategoria
            WHERE lote = ${lote}
            GROUP BY data
            ORDER BY data DESC
            LIMIT ${periodo}
        ) AS ultimos_30_dias;
        SELECT 
            SUM(critico) AS criticos, 
            (SUM(critico) + SUM(moderado) + SUM(normal)) AS total
        FROM (
            SELECT data,
                   SUM(critico) AS critico,
                   SUM(moderado) AS moderado,
                   SUM(normal) AS normal
            FROM historicoQtdPorCategoria
            WHERE lote = ${lote}
            GROUP BY data
            ORDER BY data DESC
            LIMIT ${periodo}
        ) AS ultimos_dias;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function calcularKpi3(lote, periodo) {
    var instrucaoSql = `
        SELECT tipo, SUM(critico) AS totalCritico
        FROM (
            SELECT h.tipo, h.data, h.critico
            FROM historicoQtdPorCategoria h
            JOIN (
                SELECT DISTINCT data
                FROM historicoQtdPorCategoria
                WHERE lote = ${lote}
                ORDER BY data DESC
                LIMIT ${periodo}
            ) ultimos_dias ON h.data = ultimos_dias.data
            WHERE h.lote = ${lote}
        ) AS sub
        GROUP BY tipo
        ORDER BY totalCritico DESC;
        `;

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

function plotarGrafico3(lote, periodo, tipo) {

    var instrucaoSql = '';

    if (tipo == 'todos') {
        instrucaoSql = `
        SELECT 
            SUM(h.critico) AS critico, 
            SUM(h.moderado) AS moderado, 
            SUM(h.normal) AS normal
                FROM historicoQtdPorCategoria h
                JOIN (
                    SELECT DISTINCT data
                    FROM historicoQtdPorCategoria
                    WHERE lote = ${lote}
                    ORDER BY data DESC
                    LIMIT ${periodo}
                    ) ultimos_dias ON h.data = ultimos_dias.data
                    WHERE h.lote = ${lote};`
    } else {
        instrucaoSql = `
        SELECT 
            SUM(h.critico) AS critico, 
            SUM(h.moderado) AS moderado, 
            SUM(h.normal) AS normal
                FROM historicoQtdPorCategoria h
                JOIN (
                    SELECT DISTINCT data
                    FROM historicoQtdPorCategoria
                    WHERE lote = ${lote}
                    ORDER BY data DESC
                    LIMIT ${periodo}
                    ) ultimos_dias ON h.data = ultimos_dias.data
                    WHERE h.lote = ${lote} AND h.tipo = '${tipo}';`
    }

    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarLinha() {
    var instrucaoSql = ` SELECT * FROM listagemLote;`;

    console.log("Ta dando certo caralho")
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    calcularKpi2,
    calcularKpi3,
    plotarGrafico1,
    plotarGrafico2,
    plotarGrafico3,
    plotarLinha
};