CREATE DATABASE allSetPython;

USE allSetPython;

CREATE TABLE computador (
    idComputador INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(45),
    dono VARCHAR(45),
    cpu VARCHAR(45),
    ram INT,
    TipoMemoria VARCHAR(45),
    tipoMemoria2 VARCHAR(45),
    qtdMemoria INT,
    qtdMemoria2 INT
);

CREATE TABLE medicao (
    idMedicao INT PRIMARY KEY AUTO_INCREMENT,
    cpuPercentual FLOAT,
    ramPercentual FLOAT,
    ramBytes INT,
    bateriaPercentual FLOAT,
    memoria1Bytes INT,
    memoria2Bytes INT,
    memoria1Percentual FLOAT,
    memoria2Percentual FLOAT,
    dtHora DATETIME,
    fkComputador INT,
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador)
);

CREATE TABLE criticos (
    idCriticos INT PRIMARY KEY AUTO_INCREMENT,
    cpuPercentual FLOAT,
    ramPercentual FLOAT,
    ramBytes INT,
    bateriaPorcentagem FLOAT,
    memoria1Bytes INT,
    memoria2Bytes INT,
    memoria1Percentual FLOAT,
    memoria2Percentual FLOAT,
    dataHora DATETIME,
    fkComputador INT,
    FOREIGN KEY (fkComputador) REFERENCES computador(idComputador)
);

INSERT INTO computador (apelido, dono, cpu, ram, TipoMemoria, tipoMemoria2, qtdMemoria, qtdMemoria2)
VALUES
('Computador1', 'Diniz', 'Intel Core i7', 16, 'DDR4', 'SSD', 512, 256),
('Computador2', 'Amanda', 'AMD Ryzen 5', 8, 'DDR4', 'HDD', 1000, 0),
('Computador3', 'Israel', 'Intel Core i5', 8, 'DDR3', 'SSD', 256, 128),
('Computador4', 'Gui', 'Intel Core i5', 8, 'DDR3', 'SSD', 256, 128),
('Servidor', 'Robert', 'Intel Core i5', 8, 'DDR3', 'SSD', 256, 128);

INSERT INTO medicao (cpuPercentual, ramPercentual, ramBytes, bateriaPorcentagem, memoria1Bytes, memoria2Bytes, memoria1Percentual, memoria2Percentual, dataHora, fkComputador)
VALUES
(45.5, 60.2, 8192, 80.0, 102400, 204800, 25.5, 50.0, '2025-02-28 12:30:00', 1),
(30.0, 50.0, 4096, 75.0, 51200, 0, 15.0, 0.0, '2025-02-28 13:00:00', 2),
(60.0, 70.0, 8192, 90.0, 102400, 51200, 40.0, 20.0, '2025-02-28 14:00:00', 3);

DROP DATABASE allsetPython;