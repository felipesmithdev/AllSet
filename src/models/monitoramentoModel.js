var database = require("../database/config");

function buscar_carros(fk_agencia){
    var instrucaoSql = `
        SELECT 
        (
            SELECT COUNT(c.id_carro)
            FROM carro c
            JOIN lote l ON c.fk_lote = l.id_lote
            WHERE l.fk_agencia_lote = ${fk_agencia}
        ) AS total_carro
        `

    return database.executar(instrucaoSql);
}


function buscar_alertas(fk_agencia){
    var instrucaoSql = `
        SELECT 
        (
            SELECT COUNT(a.id_alerta)
            FROM alerta a
            JOIN carro c ON a.fk_carro_macadress = c.macadress
            JOIN lote l ON c.fk_lote = l.id_lote
            WHERE a.status = 1 AND l.fk_agencia_lote = ${fk_agencia}
        ) AS total_alerta
        `
    return database.executar(instrucaoSql)
}

function dados_tempo_real(fk_agencia){
    console.log("meia hora fazendo esse select com subquery, se nao funcionar ja sabe onde ta o erro, TO FALANDO SOZINHO")


    // isso aqui deu um baita de um trabalho, espero que entendam a regra
    // mas basicamente o gráfico em tempo real analisa a quantidade de carros que nao possuem e possuem alertas vinculados ao seu mac adress
    // isso só equivalem em alertas com status 1 (aberto) alertas fechados nao serao validados
    var instrucaoSql = `
    SELECT 
    DATE_FORMAT(NOW(), '%H:%i') AS horario,

    -- Carros com pelo menos 1 alerta GRAVE (prioridade mano, a ideia é que um carro so esteja em uma subquery)
    (
        SELECT COUNT(DISTINCT c.macadress)
        FROM carro c
        JOIN lote l ON c.fk_lote = l.id_lote
        WHERE l.fk_agencia_lote = ${fk_agencia}
        AND EXISTS (
            SELECT 1 FROM alerta a 
            WHERE a.fk_carro_macadress = c.macadress 
            AND a.status = 1 AND a.gravidade = 'High'
        )
    ) AS alertas_graves,

    -- Carros com alertas MÉDIOS mas SEM alertas graves
    (
        SELECT COUNT(DISTINCT c.macadress)
        FROM carro c
        JOIN lote l ON c.fk_lote = l.id_lote
        WHERE l.fk_agencia_lote = ${fk_agencia}
        AND EXISTS (
            SELECT 1 FROM alerta a 
            WHERE a.fk_carro_macadress = c.macadress 
            AND a.status = 1 AND a.gravidade = 'Medium'
        )
        AND NOT EXISTS (
            SELECT 1 FROM alerta a 
            WHERE a.fk_carro_macadress = c.macadress 
            AND a.status = 1 AND a.gravidade = 'High'
        )
    ) AS alertas_medios,

    -- Carros SEM NENHUM alerta ativo
    (
        SELECT COUNT(DISTINCT c.macadress)
        FROM carro c
        JOIN lote l ON c.fk_lote = l.id_lote
        WHERE l.fk_agencia_lote = ${fk_agencia}
        AND NOT EXISTS (
            SELECT 1 FROM alerta a
            WHERE a.fk_carro_macadress = c.macadress AND a.status = 1
        )
    ) AS carros_sem_alertas;
    `;
    
    return database.executar(instrucaoSql)
}

function buscar_lotes(fk_agencia){
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
        SELECT DATE_FORMAT(MAX(alerta.dt_registro), '%d/%m/%Y %H:%i:%s')
        FROM alerta 
        JOIN carro ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 
        AND alerta.gravidade = 'High' 
        AND carro.fk_lote = lote.id_lote
    ) AS ultimo_alerta,

    (
        SELECT COUNT(id_alerta)
        FROM alerta 
        JOIN carro
        ON alerta.fk_carro_macadress = carro.macadress
        WHERE alerta.status = 1 AND alerta.gravidade = 'High' AND carro.fk_lote = lote.id_lote
    ) AS alertas_graves

    FROM lote 
    WHERE lote.fk_agencia_lote = ${fk_agencia}
    ORDER BY alertas_graves desc;
    `

    return database.executar(instrucaoSql)
}

function buscarDadosComponentes(fk_agencia){
    console.log("Estou no model de buscar os dados do grafico de componentes")
        var instrucaoSql = `
    SELECT
    -- Total de alertas nas últimas 24h
    COUNT(*) as total_alertas_24h,

    -- CPU
    COUNT(CASE WHEN a.componente = 'CPU' AND a.gravidade = 'Medium' THEN 1 END) AS cpu_medio,
    COUNT(CASE WHEN a.componente = 'CPU' AND a.gravidade = 'High' THEN 1 END) AS cpu_grave,

    -- RAM  
    COUNT(CASE WHEN a.componente = 'RAM' AND a.gravidade = 'Medium' THEN 1 END) AS ram_medio,
    COUNT(CASE WHEN a.componente = 'RAM' AND a.gravidade = 'High' THEN 1 END) AS ram_grave,

    -- Disco
    COUNT(CASE WHEN a.componente = 'Disco' AND a.gravidade = 'Medium' THEN 1 END) AS disco_medio,
    COUNT(CASE WHEN a.componente = 'Disco' AND a.gravidade = 'High' THEN 1 END) AS disco_grave

    FROM alerta a
    JOIN carro c ON a.fk_carro_macadress = c.macadress
    JOIN lote l ON c.fk_lote = l.id_lote
    WHERE 
    a.status = 1
    AND l.fk_agencia_lote = ${fk_agencia}
    AND a.dt_registro >= NOW() - INTERVAL 1 DAY;

`;
    return database.executar(instrucaoSql)
}


// parte do carro

function trazerCarros(fk_lote){
    console.log(fk_lote)
    var instrucaoSql = `
    SELECT 
    c.macadress,
    c.marca,
    a.componente,
    a.gravidade,
    DATE_FORMAT(MAX(a.dt_registro), '%d/%m/%Y %H:%i:%s') AS ultimo_alerta
    FROM carro c
    JOIN lote l ON c.fk_lote = l.id_lote
    JOIN alerta a ON a.fk_carro_macadress = c.macadress
    WHERE l.id_lote = ${fk_lote}
    AND a.status = 1
    GROUP BY c.macadress, c.marca, a.componente, a.gravidade
    ORDER BY MAX(a.dt_registro) DESC;

    `;

    return database.executar(instrucaoSql)
}

function fecharAlerta(macadress, componente, gravidade) {
    console.log("Fechando alerta do componente:", componente, "com gravidade:", gravidade);

    const instrucaoSql = `
        UPDATE alerta
        SET status = 0
        WHERE fk_carro_macadress = '${macadress}'
        AND componente = '${componente}'
        AND gravidade = '${gravidade}';
    `;
    
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real,
    buscar_lotes,
    buscarDadosComponentes,
    trazerCarros,
    fecharAlerta
};