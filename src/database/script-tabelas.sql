CREATE DATABASE allset;
USE allset;


CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(255) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    dtCadastro DATE NOT NULL
);

CREATE TABLE Unidade (
    idUnidade INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45),
    numero VARCHAR(10),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    estado CHAR(2),
    contato CHAR(11),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE
    -- Quando é apagado o pai, é apagado junt0 por conta do delete cascade 
);

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nvl_administrativo TINYINT NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade) ON DELETE CASCADE
);

CREATE TABLE Carro (
    idCarro INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    ano YEAR NOT NULL,
    enderecoMac CHAR(12) NOT NULL UNIQUE,
    sistemaOperacional VARCHAR(10),
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade) ON DELETE CASCADE
);

CREATE TABLE Componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    medida CHAR(2) NOT NULL
);

CREATE TABLE Configuracao (
    idConfiguracao INT AUTO_INCREMENT PRIMARY KEY,
    fkCarro INT NOT NULL,
    fkComponente INT NOT NULL,
    valorLimiteAlerta DOUBLE NOT NULL,
    FOREIGN KEY (fkCarro) REFERENCES Carro(idCarro) ON DELETE CASCADE,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE
);

CREATE TABLE Leitura (
    idLeitura INT AUTO_INCREMENT PRIMARY KEY,
    fkConfiguracao INT NOT NULL,
    dataHora DATETIME NOT NULL,
    valor DOUBLE NOT NULL,
    FOREIGN KEY (fkConfiguracao) REFERENCES Configuracao(idConfiguracao) ON DELETE CASCADE
);



INSERT INTO Empresa (idEmpresa, razaoSocial, cnpj, dtCadastro)
    VALUES (1, 'Veículos Autônomos LTDA', '12345678000199', '2024-04-07');

INSERT INTO Unidade (fkEmpresa, nome, logradouro, numero, bairro, cidade, estado, contato)
VALUES
(1, 'Unidade Centro', 'Rua A', '123', 'Centro', 'São Paulo', 'SP', '11987654321');

	
INSERT INTO Usuario (fkUnidade, nome, cpf, email, senha, nvl_administrativo, ativo)
VALUES
(1, 'João Silva', '12345678901', 'joao.silva@example.com', 'senha123', 1, 1);


INSERT INTO Carro (fkUnidade, modelo, marca, ano, enderecoMac, sistemaOperacional) 
VALUES
(1, 'Autonobus X200', 'Autonoma Motors', 2024, '0C9A3C4D328A', 'SO1'),
(1, 'SelfDrive 3000', 'DriveTech', 2023, 'F854F6084511', 'SO2'),
(1, 'VisionDrive Pro', 'RoboCars', 2025, 'B81EA4FE8B6F', 'SO3');



INSERT INTO Componente (nome, medida) 
VALUES ('RAM', 'GB'),
       ('Armazenamento', 'MB'),
       ('Bateria', '%'),
       ('CPU', '%'),
		('Velocidade da Rede', 'MB');


INSERT INTO Configuracao (fkCarro, fkComponente, valorLimiteAlerta) 
VALUES
(1, 2, 16),  -- Carro 1, RAM, Limite de alerta 16 GB
(1, 3, 512), -- Carro 1, Armazenamento, Limite de alerta 512 MB
(1, 4, 20),  -- Carro 1, Bateria, Limite de alerta 20%
(1, 1, 75),  -- Carro 1, CPU, Limite de alerta 75%

(2, 2, 8),   -- Carro 2, RAM, Limite de alerta 8 GB
(2, 3, 256), -- Carro 2, Armazenamento, Limite de alerta 256 MB
(2, 4, 15),  -- Carro 2, Bateria, Limite de alerta 15%
(2, 1, 85),  -- Carro 2, CPU, Limite de alerta 85%
(2, 5, 50),  -- Carro 2, Velocidade da Rede, Limite de alerta 50 MB

(3, 2, 32),  -- Carro 3, RAM, Limite de alerta 32 GB
(3, 3, 1024),-- Carro 3, Armazenamento, Limite de alerta 1024 MB (1 GB)
(3, 4, 25),  -- Carro 3, Bateria, Limite de alerta 25%
(3, 1, 60);  -- Carro 3, CPU, Limite de alerta 60%



-- Inserir leituras que ultrapassam os limites de alerta
INSERT INTO Leitura (fkConfiguracao, dataHora, valor)
VALUES
(1, '2025-03-17 10:00:00', 18),  -- Carro 1, RAM, Leitura ultrapassa 16 GB
(2, '2025-03-17 11:00:00', 300), -- Carro 1, Armazenamento, Leitura ultrapassa 512 MB
(3, '2025-03-17 12:00:00', 25),  -- Carro 1, Bateria, Leitura ultrapassa 20%
(4, '2025-03-17 13:00:00', 80),  -- Carro 1, CPU, Leitura ultrapassa 75%
(5, '2025-03-17 14:00:00', 150), -- Carro 1, Velocidade da Rede, Leitura ultrapassa 100 MB

(6, '2025-03-17 15:00:00', 10),  -- Carro 2, RAM, Leitura ultrapassa 8 GB
(7, '2025-03-17 16:00:00', 300), -- Carro 2, Armazenamento, Leitura ultrapassa 256 MB
(8, '2025-03-17 17:00:00', 20),  -- Carro 2, Bateria, Leitura ultrapassa 15%
(9, '2025-03-17 18:00:00', 90),  -- Carro 2, CPU, Leitura ultrapassa 85%
(10, '2025-03-17 19:00:00', 60), -- Carro 2, Velocidade da Rede, Leitura ultrapassa 50 MB

(11, '2025-03-17 20:00:00', 40), -- Carro 3, RAM, Leitura ultrapassa 32 GB
(12, '2025-03-17 21:00:00', 1200),-- Carro 3, Armazenamento, Leitura ultrapassa 1024 MB (1 GB)
(13, '2025-03-17 22:00:00', 30);  -- Carro 3, Bateria, Leitura ultrapassa 25%



