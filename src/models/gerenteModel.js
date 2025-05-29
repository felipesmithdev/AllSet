var database = require("../database/config");

function lotesMaisOcorrencia(){
    let query = `SELECT l.id_lote as 'lote', COUNT(a.id_alerta) AS 'ocorrencias' 
                    FROM lote AS l
                    JOIN carro AS c ON c.fk_lote = l.id_lote
                    JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
                    WHERE l.fk_agencia_lote = 1
                    GROUP BY l.id_lote
                    ORDER BY ocorrencias DESC
                    LIMIT 5;`

    return database.executar(query);
}

 module.exports = {
    lotesMaisOcorrencia
}