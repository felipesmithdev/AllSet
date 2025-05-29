var database = require("../database/config");

function buscar_carros(){
    var instrucaoSql = 'SELECT COUNT(id_carro) FROM carro'

    return database.executar(instrucaoSql);
}

function buscar_alertas(){
    var instrucaoSql = 'SELECT COUNT(id_alerta) FROM alerta WHERE status = 1'

    return database.executar(instrucaoSql)
}

function dados_tempo_real(){
    console.log("meia hora fazendo esse select com subquery, se nao funcionar ja sabe onde ta o erro, TO FALANDO SOZINHO")

    var instrucaoSql = `
    SELECT 
    DATE_FORMAT(NOW(), '%H:%i') AS horario,

    (
        SELECT COUNT(DISTINCT a.fk_carro_macadress)
        FROM alerta a
        WHERE a.status = 1 AND a.gravidade = 'Medium'
    ) AS alertas_medios,

    (
        SELECT COUNT(DISTINCT a.fk_carro_macadress)
        FROM alerta a
        WHERE a.status = 1 AND a.gravidade = 'High'
    ) AS alertas_graves,

    (
        SELECT COUNT(*)
        FROM carro c
        WHERE NOT EXISTS (
            SELECT 1
            FROM alerta a
            WHERE a.fk_carro_macadress = c.macadress
              AND a.status = 1
        )
    ) AS carros_sem_alertas;

`;
    return database.executar(instrucaoSql)
}

function buscar_lotes(){
    var instrucaoSql = `
    SELECT
    id_lote as id_lote,
    (
        SELECT COUNT(id_carro)
        FROM carro
        WHERE carro.fk_lote = lote.id_lote
    ) AS total_carro,

    (
        SELECT COUNT(id_alerta)
        FROM alerta 
        JOIN carro
        ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 AND carro.fk_lote = lote.id_lote
    ) AS alertas,

    (
        SELECT COUNT(id_alerta)
        FROM alerta 
        JOIN carro
        ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 AND alerta.gravidade = 'High' AND carro.fk_lote = lote.id_lote
    ) AS alertas_graves

    FROM lote ORDER BY alertas_graves desc;
    `

    return database.executar(instrucaoSql)
}

<<<<<<< Updated upstream
function buscarDadosComponentes(){
    console.log("Estou no model de buscar os dados do grafico de componentes")
        var instrucaoSql = `
    SELECT 
    DATE_FORMAT(NOW(), '%H:%i') AS horario,

    (
        SELECT COUNT(DISTINCT a.fk_carro_macadress)
        FROM alerta a
        WHERE a.status = 1 AND a.gravidade = 'Medium'
    ) AS alertas_medios,

    (
        SELECT COUNT(DISTINCT a.fk_carro_macadress)
        FROM alerta a
        WHERE a.status = 1 AND a.gravidade = 'High'
    ) AS alertas_graves,

    (
        SELECT COUNT(*)
        FROM carro c
        WHERE NOT EXISTS (
            SELECT 1
            FROM alerta a
            WHERE a.fk_carro_macadress = c.macadress
              AND a.status = 1
        )
    ) AS carros_sem_alertas;

`;
    return database.executar(instrucaoSql)
}

function buscar_lotes(){
    var instrucaoSql = `
    SELECT
    id_lote as id_lote,
    (
        SELECT COUNT(id_carro)
        FROM carro
        WHERE carro.fk_lote = lote.id_lote
    ) AS total_carro,

    (
        SELECT COUNT(id_alerta)
        FROM alerta 
        JOIN carro
        ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 AND carro.fk_lote = lote.id_lote
    ) AS alertas,

    (
        SELECT COUNT(id_alerta)
        FROM alerta 
        JOIN carro
        ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 AND alerta.gravidade = 'High' AND carro.fk_lote = lote.id_lote
    ) AS alertas_graves

    FROM lote ORDER BY alertas_graves desc;
    `

    return database.executar(instrucaoSql)
}


=======
>>>>>>> Stashed changes
module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real,
    buscar_lotes,
<<<<<<< Updated upstream
    buscarDadosComponentes
=======
>>>>>>> Stashed changes
};