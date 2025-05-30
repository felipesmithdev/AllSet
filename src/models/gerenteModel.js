var database = require("../database/config");

function lotesMaisOcorrencia(fkAgencia, dias) {
    let filtroData = '';
    if (dias) {
        filtroData = `AND a.dt_registro >= NOW() - INTERVAL ${dias} DAY`;
    }

    let query = `
        SELECT l.id_lote AS lote, COUNT(a.id_alerta) AS ocorrencias
        FROM lote AS l
        JOIN carro AS c ON c.fk_lote = l.id_lote
        JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
        WHERE l.fk_agencia_lote = ${fkAgencia}
        ${filtroData}
        GROUP BY l.id_lote
        ORDER BY ocorrencias DESC
        LIMIT 5;
    `;

    return database.executar(query);
}


function datasRegistroAlertas(idAgencia, dias) {
    const instrucao = `
        SELECT DATE(a.dt_registro) AS dia, COUNT(*) AS ocorrencias
        FROM alerta a
        JOIN carro c ON a.fk_carro_macadress = c.macadress
        JOIN lote l ON c.fk_lote = l.id_lote
        WHERE l.fk_agencia_lote = ${idAgencia}
        AND a.dt_registro >= NOW() - INTERVAL ${dias.replace("d", "")} DAY
        GROUP BY dia
        ORDER BY dia;

    `;
    return database.executar(instrucao);
}

 module.exports = {
    lotesMaisOcorrencia,
    datasRegistroAlertas
}