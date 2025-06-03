var database = require("../database/config");

function lotesMaisOcorrencia(idAgencia, dias) {
    // let filtroData = '';
    // if (dias) {
    //     filtroData = `AND a.dt_registro >= NOW() - INTERVAL ${dias} DAY`;
    // }

    let query = `
        SELECT
            lote, sum(critico) AS ocorrencias
            FROM historicoQtdPorCategoria
            WHERE data IN (
                SELECT data FROM (
                SELECT DISTINCT data
                FROM historicoQtdPorCategoria
                ORDER BY data DESC
                LIMIT ${dias}
            ) AS ultimosDias
        )
        GROUP BY lote
        ORDER BY ocorrencias DESC
        LIMIT 5;
        `;

    return database.executar(query);
}


function datasRegistroAlertas(idAgencia, dias) {
    const instrucao = `
        SELECT 
            DATE_FORMAT(data, '%d/%m') AS dia,
            SUM(critico) AS ocorrencias
        FROM historicoQtdPorCategoria
        GROUP BY dia
        ORDER BY STR_TO_DATE(dia, '%d/%m') DESC
        LIMIT ${dias};

    `;
    return database.executar(instrucao);
}

 module.exports = {
    lotesMaisOcorrencia,
    datasRegistroAlertas
}