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

function lotesMaisOcorrencia7(){
    let query = `SELECT l.id_lote as 'lote', COUNT(a.id_alerta) AS 'ocorrencias' 
                    FROM lote AS l
                    JOIN carro AS c ON c.fk_lote = l.id_lote
                    JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
                    WHERE l.fk_agencia_lote = 1 AND dt_registro >= NOW() - INTERVAL 7 DAY
                    GROUP BY l.id_lote
                    ORDER BY ocorrencias DESC
                    LIMIT 5;`

    return database.executar(query);
}

function lotesMaisOcorrencia15(){
    let query = `SELECT l.id_lote as 'lote', COUNT(a.id_alerta) AS 'ocorrencias' 
                    FROM lote AS l
                    JOIN carro AS c ON c.fk_lote = l.id_lote
                    JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
                    WHERE l.fk_agencia_lote = 1 AND dt_registro >= NOW() - INTERVAL 15 DAY
                    GROUP BY l.id_lote
                    ORDER BY ocorrencias DESC
                    LIMIT 5;`

    return database.executar(query);
}

function lotesMaisOcorrencia30(){
    let query = `SELECT l.id_lote as 'lote', COUNT(a.id_alerta) AS 'ocorrencias' 
                    FROM lote AS l
                    JOIN carro AS c ON c.fk_lote = l.id_lote
                    JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
                    WHERE l.fk_agencia_lote = 1 AND dt_registro >= NOW() - INTERVAL 30 DAY
                    GROUP BY l.id_lote
                    ORDER BY ocorrencias DESC
                    LIMIT 5;`

    return database.executar(query);
}

 module.exports = {
    lotesMaisOcorrencia
}