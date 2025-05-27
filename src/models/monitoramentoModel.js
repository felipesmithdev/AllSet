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

module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real
};