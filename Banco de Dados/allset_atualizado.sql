CREATE DATABASE IF NOT EXISTS allset ;
USE allset ;

CREATE TABLE IF NOT EXISTS empresa (
  id_empresa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cnpj CHAR(14) not NULL,
  dt_cadastro DATE not NULL
  );
  
CREATE TABLE IF NOT EXISTS endereco (
	id_endereco int primary key auto_increment,
    logradouro varchar(100) not null,
    bairro varchar(50) not null,
    uf char(2) not null
	);

CREATE TABLE IF NOT EXISTS agencia(
  id_agencia INT primary key auto_increment ,
  cep CHAR(8) NOT NULL,
  numero CHAR(10) NOT NULL,
  complemento varchar(45),
  fk_empresa INT NOT NULL,
  constraint fkEmpresaAgencia foreign key (fk_empresa) references empresa(id_empresa),
  fk_endereco int not null,
  constraint fk_endereco_agencia foreign key (fk_endereco) references endereco(id_endereco)
  );
  
CREATE TABLE IF NOT EXISTS pessoa (
  id_pessoa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cpf CHAR(11) not NULL,
  email VARCHAR(45) not NULL,
  senha VARCHAR(45) not NULL,
  nivel_permissao TINYINT not NULL,
  ativo TINYINT not NULL,
  fk_agencia INT NOT NULL,
  constraint chkNivel check(nivel_permissao in(0,1,2,3)),
  constraint chkAtivo check(ativo in(0 or 1)),
  constraint fkAgenciaPessoa foreign key (fk_agencia) references agencia(id_agencia)
  );
  
  
  
  CREATE TABLE IF NOT EXISTS lote(
	id_lote int primary key auto_increment,
    modelo varchar(45) not null,
    dt_registro date not null,
    fk_agencia_lote int not null,
    constraint fk_agencia_lote foreign key (fk_agencia_lote) references agencia(id_agencia)
    );
  

CREATE TABLE IF NOT EXISTS carro (
  id_carro INT primary key auto_increment,
  marca VARCHAR(45) not NULL,
  ano CHAR(4) not NULL,
  sistema_operacional VARCHAR(45) not NULL,
  macadress varCHAR(45) not NULL unique,
  fk_lote INT NOT NULL,
  constraint foreign key fk_lote_carro (fk_lote) references lote(id_lote)
  );


CREATE TABLE IF NOT EXISTS componente (
  id_componente INT primary key auto_increment ,
  tipo VARCHAR(45) not NULL,
  metrica CHAR(2) not NULL
);

CREATE TABLE IF NOT EXISTS configuracao (
  pk_componente INT NOT NULL,
  pk_carro int NOT NULL,
  dt_pedido DATE not NULL,
  limite DOUBLE not NULL,
  PRIMARY KEY (pk_componente, pk_carro),
  CONSTRAINT fkComponentePK FOREIGN KEY (`pk_componente`) REFERENCES componente (id_componente),
  CONSTRAINT fkCarroPK FOREIGN KEY (pk_carro) REFERENCES carro (id_carro)
);


CREATE TABLE alerta (
  id_alerta INT primary key auto_increment,
  componente varchar(45) not null,
  valor float not null,
  dt_registro datetime,
  gravidade varchar(30),
  status TINYINT,
  constraint chk_status check(status in(0,1)),
  fk_carro_macadress varchar(45),
  constraint fk_carro_mac foreign key (fk_carro_macadress) references carro(macadress)
);

-- 0 -> fechado
-- 1 -> fechado

create table captura(
	id int primary key auto_increment,
    lote int,
    componente varchar(45),
    valor float,
    dt_captura datetime
);


-- Inserting data into the empresa table
INSERT INTO empresa (nome, cnpj, dt_cadastro) VALUES 
('TechDrive Solutions', '12345678901234', '2024-01-15'),
('AutoTech Mobility', '23456789012345', '2024-02-20'),
('SmartCar Industries', '34567890123456', '2024-03-10'),
('FutureRide Corp', '45678901234567', '2024-04-05'),
('ConnectWheels Inc', '56789012345678', '2024-05-01');

-- Inserting data into the endereco table
INSERT INTO endereco (logradouro, bairro, uf) VALUES 
('Avenida Paulista, 1000', 'Bela Vista', 'SP'),
('Rua das Flores, 500', 'Centro', 'RJ'),
('Avenida Brasil, 2500', 'Boa Viagem', 'PE'),
('Rua dos Andradas, 100', 'Centro', 'RS'),
('Avenida Contorno, 750', 'Savassi', 'MG');

-- Inserting data into the agencia table
INSERT INTO agencia (cep, numero, complemento, fk_empresa, fk_endereco) VALUES 
('01310100', '1000', 'Andar 10', 1, 1),
('20050000', '500', 'Sala 201', 2, 2),
('51020000', '2500', 'Bloco B', 3, 3),
('90020000', '100', 'Térreo', 4, 4),
('30110010', '750', 'Conjunto 505', 5, 5);

-- Inserting data into the pessoa table
INSERT INTO pessoa (nome, cpf, email, senha, nivel_permissao, ativo, fk_agencia) VALUES 
('João Silva', '12345678901', 'joao.silva@email.com', 'senha123', 3, 1, 1),
('Maria Oliveira', '23456789012', 'maria.oliveira@email.com', 'senha456', 2, 1, 2),
('Pedro Santos', '34567890123', 'pedro.santos@email.com', 'senha789', 1, 1, 3),
('Ana Costa', '45678901234', 'ana.costa@email.com', 'senha012', 3, 1, 4),
('Carlos Souza', '56789012345', 'carlos.souza@email.com', 'senha345', 0, 1, 5);

-- Inserting data into the lote table
INSERT INTO lote (modelo, dt_registro, fk_agencia_lote) VALUES 
('Sedan Autônomo X1', '2024-06-10', 1),
('SUV Conectado Y2', '2024-06-15', 2),
('Hatchback Smart Z3', '2024-06-20', 3),
('Pickup Inteligente W4', '2024-06-25', 4),
('Minivan Conectada V5', '2024-06-30', 5);

-- Inserting data into the carro table
INSERT INTO carro (marca, ano, sistema_operacional, macadress, fk_lote) VALUES 
('Tesla', '2024', 'AutoOS 5.0', '00:1A:2B:3C:4D:5E', 1),
('BMW', '2024', 'ConnectDrive 3.0', '11:2A:3B:4C:5D:6E', 2),
('Mercedes', '2024', 'MBUX AI 2.5', '22:3A:4B:5C:6D:7E', 3),
('Audi', '2024', 'AudiConnect 4.0', '33:4A:5B:6C:7D:8E', 4),
('Volvo', '2024', 'SenseOS 3.5', '44:5A:6B:7C:8D:9E', 5);

INSERT INTO carro (marca, ano, sistema_operacional, macadress, fk_lote) VALUES 
('Tesla', '2024', 'AutoOS 5.0', '001A2B3C4D5E', 1),
('BMW', '2024', 'ConnectDrive 3.0', '112A3B4C5D6E', 2),
('Mercedes', '2024', 'MBUX AI 2.5', '223A4B5C6D7E', 3),
('Audi', '2024', 'AudiConnect 4.0', '334A5B6C7D8E', 4),
('Volvo', '2024', 'SenseOS 3.5', '000000000000', 5);

-- Inserting data into the componente table
INSERT INTO componente (tipo, metrica) VALUES 
('CPU', '%'),
('RAM', 'GB'),
('Disco', 'GB'),
('Temperatura', 'C°'),
('Bateria', '%');

-- Inserting data into the configuracao table
INSERT INTO configuracao (pk_componente, pk_carro, dt_pedido, limite) VALUES 
(1, 1, '2024-07-01', 90.0),
(2, 2, '2024-07-02', 16.0),
(3, 3, '2024-07-03', 500.0),
(4, 4, '2024-07-04', 85.0),
(5, 5, '2024-07-05', 20.0);

-- Inserting data into the alerta table
INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES 
('CPU', 95.5, '2024-08-01 10:15:30', 'High', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 18.2, '2024-08-02 11:20:45', 'Medium', 1, '11:2A:3B:4C:5D:6E'),
('Disco', 520.8, '2024-08-03 12:30:15', 'High', 1, '22:3A:4B:5C:6D:7E'),
('Temperatura', 90.2, '2024-08-04 13:45:20', 'High',  1, '33:4A:5B:6C:7D:8E'),
('Bateria', 15.5, '2024-08-05 14:50:35', 'Medium', 1, '44:5A:6B:7C:8D:9E');

-- Inserting data into the captura table (10 records as requested)
INSERT INTO captura (lote, componente, valor, dt_captura) VALUES 
(1, 'CPU', 75.2, '2024-08-10 08:15:30'),
(1, 'RAM', 12.5, '2024-08-10 08:15:30'),
(2, 'Disco', 320.5, '2024-08-10 09:20:45'),
(2, 'Temperatura', 65.8, '2024-08-10 09:20:45'),
(3, 'Bateria', 85.3, '2024-08-10 10:30:15'),
(3, 'CPU', 45.6, '2024-08-10 10:30:15'),
(4, 'RAM', 8.7, '2024-08-10 11:45:20'),
(4, 'Disco', 420.1, '2024-08-10 11:45:20'),
(5, 'Temperatura', 72.4, '2024-08-10 12:50:35'),
(5, 'Bateria', 90.8, '2024-08-10 12:50:35');


select * from alerta;


-- Supondo que hoje seja 2025-05-29, 30 dias atrás seria 2025-04-29
INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES 
('CPU', 91.2, '2025-04-29 08:00:00', 'High', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 78.5, '2025-04-29 08:05:00', 'Medium', 1, '11:2A:3B:4C:5D:6E'),
('Disco', 450.1, '2025-04-29 08:10:00', 'High', 1, '22:3A:4B:5C:6D:7E'),
('Temperatura', 88.3, '2025-04-29 08:15:00', 'Medium', 1, '33:4A:5B:6C:7D:8E'),
('Bateria', 18.9, '2025-04-29 08:20:00', 'High', 1, '44:5A:6B:7C:8D:9E'),

('CPU', 89.4, '2025-04-29 08:25:00', 'Medium', 1, '001A2B3C4D5E'),
('RAM', 83.7, '2025-04-29 08:30:00', 'High', 1, '112A3B4C5D6E'),
('Disco', 412.5, '2025-04-29 08:35:00', 'Medium', 1, '223A4B5C6D7E'),
('Temperatura', 90.6, '2025-04-29 08:40:00', 'High', 1, '334A5B6C7D8E'),
('Bateria', 17.2, '2025-04-29 08:45:00', 'Medium', 1, '000000000000'),

('CPU', 92.3, '2025-04-29 08:50:00', 'High', 1, '0000000003E8'),
('RAM', 86.4, '2025-04-29 08:55:00', 'Medium', 1, '0000000003E8'),
('Disco', 430.2, '2025-04-29 09:00:00', 'High', 1, '0000000003E8'),
('Temperatura', 87.1, '2025-04-29 09:05:00', 'Medium', 1, '0000000003E9'),
('Bateria', 19.3, '2025-04-29 09:10:00', 'High', 1, '0000000003E9'),

('CPU', 88.0, '2025-04-29 09:15:00', 'Medium', 1, '0000000003E9'),
('RAM', 80.6, '2025-04-29 09:20:00', 'High', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 499.9, '2025-04-29 09:25:00', 'Medium', 1, '11:2A:3B:4C:5D:6E'),
('Temperatura', 91.4, '2025-04-29 09:30:00', 'High', 1, '22:3A:4B:5C:6D:7E'),
('Bateria', 16.8, '2025-04-29 09:35:00', 'Medium', 1, '33:4A:5B:6C:7D:8E'),

('CPU', 93.2, '2025-04-29 09:40:00', 'High', 1, '44:5A:6B:7C:8D:9E'),
('RAM', 84.1, '2025-04-29 09:45:00', 'Medium', 1, '001A2B3C4D5E'),
('Disco', 405.3, '2025-04-29 09:50:00', 'High', 1, '112A3B4C5D6E'),
('Temperatura', 89.5, '2025-04-29 09:55:00', 'Medium', 1, '223A4B5C6D7E'),
('Bateria', 15.1, '2025-04-29 10:00:00', 'High', 1, '334A5B6C7D8E'),

('CPU', 90.0, '2025-04-29 10:05:00', 'Medium', 1, '000000000000'),
('RAM', 85.9, '2025-04-29 10:10:00', 'High', 1, '0000000003E8'),
('Disco', 410.0, '2025-04-29 10:15:00', 'Medium', 1, '0000000003E9'),
('Temperatura', 88.2, '2025-04-29 10:20:00', 'High', 1, '0000000003E8'),
('Bateria', 14.9, '2025-04-29 10:25:00', 'Medium', 1, '0000000003E9');

SELECT * FROM alerta WHERE dt_registro >= NOW() - INTERVAL 30 DAY;


SELECT l.id_lote AS 'lote', COUNT(a.id_alerta) AS 'ocorrencias'
FROM lote AS l
JOIN carro AS c ON c.fk_lote = l.id_lote
JOIN alerta AS a ON a.fk_carro_macadress = c.macadress
WHERE l.fk_agencia_lote = 1 
  AND a.dt_registro >= NOW() - INTERVAL 7 DAY
GROUP BY l.id_lote
ORDER BY ocorrencias DESC
LIMIT 5;  	

INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 95.0, NOW() - INTERVAL 12 HOUR, 'High', 1, '00:1A:2B:3C:4D:5E');




-- Últimos 7 dias
INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 91.0, NOW() - INTERVAL 1 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 82.5, NOW() - INTERVAL 1 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Disco', 405.1, NOW() - INTERVAL 2 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 85.3, NOW() - INTERVAL 2 DAY, 'High', 1, '001A2B3C4D5E'),
('Bateria', 20.2, NOW() - INTERVAL 3 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 89.7, NOW() - INTERVAL 3 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 84.1, NOW() - INTERVAL 4 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 395.0, NOW() - INTERVAL 4 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Temperatura', 88.9, NOW() - INTERVAL 5 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Bateria', 19.4, NOW() - INTERVAL 5 DAY, 'High', 1, '001A2B3C4D5E'),
('CPU', 90.3, NOW() - INTERVAL 6 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 86.2, NOW() - INTERVAL 6 DAY, 'High', 1, '001A2B3C4D5E'),
('Disco', 410.0, NOW() - INTERVAL 1 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 87.1, NOW() - INTERVAL 2 DAY, 'High', 1, '001A2B3C4D5E'),
('Bateria', 21.0, NOW() - INTERVAL 3 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 88.2, NOW() - INTERVAL 4 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 83.7, NOW() - INTERVAL 5 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 400.5, NOW() - INTERVAL 6 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Temperatura', 89.0, NOW() - INTERVAL 1 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Bateria', 22.1, NOW() - INTERVAL 2 DAY, 'Medium', 1, '001A2B3C4D5E');

-- Próximos 20 alertas (últimos 15 dias, fora dos 7 últimos)
INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 87.3, NOW() - INTERVAL 8 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 81.9, NOW() - INTERVAL 8 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Disco', 390.4, NOW() - INTERVAL 9 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 84.0, NOW() - INTERVAL 9 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Bateria', 23.0, NOW() - INTERVAL 10 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 86.0, NOW() - INTERVAL 10 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 85.4, NOW() - INTERVAL 11 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 402.3, NOW() - INTERVAL 11 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Temperatura', 86.9, NOW() - INTERVAL 12 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E')
;


INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 84.0, NOW() - INTERVAL 16 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 79.2, NOW() - INTERVAL 16 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Disco', 377.3, NOW() - INTERVAL 17 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 80.0, NOW() - INTERVAL 17 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Bateria', 26.0, NOW() - INTERVAL 18 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 83.3, NOW() - INTERVAL 18 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 78.4, NOW() - INTERVAL 19 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 370.1, NOW() - INTERVAL 19 DAY, 'High', 1, '001A2B3C4D5E'),
('Temperatura', 81.0, NOW() - INTERVAL 20 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Bateria', 27.5, NOW() - INTERVAL 20 DAY, 'High', 1, '001A2B3C4D5E'),
('CPU', 85.6, NOW() - INTERVAL 21 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 80.8, NOW() - INTERVAL 21 DAY, 'High', 1, '001A2B3C4D5E'),
('Disco', 360.0, NOW() - INTERVAL 22 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 79.0, NOW() - INTERVAL 22 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Bateria', 28.4, NOW() - INTERVAL 23 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 86.9, NOW() - INTERVAL 24 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 77.7, NOW() - INTERVAL 25 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 350.1, NOW() - INTERVAL 26 DAY, 'High', 1, '001A2B3C4D5E'),
('Temperatura', 78.2, NOW() - INTERVAL 27 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Bateria', 29.9, NOW() - INTERVAL 28 DAY, 'Medium', 1, '001A2B3C4D5E'),
('CPU', 84.4, NOW() - INTERVAL 29 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('RAM', 82.2, NOW() - INTERVAL 29 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Disco', 340.4, NOW() - INTERVAL 30 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Temperatura', 77.0, NOW() - INTERVAL 30 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Bateria', 30.1, NOW() - INTERVAL 30 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('CPU', 85.8, NOW() - INTERVAL 16 DAY, 'Medium', 1, '001A2B3C4D5E'),
('RAM', 81.1, NOW() - INTERVAL 17 DAY, 'High', 1, '00:1A:2B:3C:4D:5E'),
('Disco', 366.3, NOW() - INTERVAL 18 DAY, 'Medium', 1, '001A2B3C4D5E'),
('Temperatura', 76.5, NOW() - INTERVAL 19 DAY, 'Medium', 1, '00:1A:2B:3C:4D:5E'),
('Bateria', 31.2, NOW() - INTERVAL 20 DAY, 'High', 1, '001A2B3C4D5E');

INSERT INTO carro (marca, ano, sistema_operacional, macadress, fk_lote) VALUES 
('Hyundai', '2024', 'SmartDrive 1.0', 'AA:BB:CC:DD:EE:01', 6),
('Kia', '2024', 'KiaConnect 2.0', 'AA:BB:CC:DD:EE:02', 6);

SELECT id_lote FROM lote where fk_agencia_lote = 1
;


INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 91.5, NOW() - INTERVAL 1 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 82.0, NOW() - INTERVAL 1 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 410.3, NOW() - INTERVAL 2 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 87.2, NOW() - INTERVAL 2 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 21.1, NOW() - INTERVAL 3 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 89.9, NOW() - INTERVAL 3 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 84.4, NOW() - INTERVAL 4 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 398.7, NOW() - INTERVAL 4 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 88.1, NOW() - INTERVAL 5 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 19.6, NOW() - INTERVAL 5 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('CPU', 90.8, NOW() - INTERVAL 6 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 85.0, NOW() - INTERVAL 6 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 405.2, NOW() - INTERVAL 1 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 89.0, NOW() - INTERVAL 2 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 22.2, NOW() - INTERVAL 3 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 88.3, NOW() - INTERVAL 4 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 83.9, NOW() - INTERVAL 5 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 400.4, NOW() - INTERVAL 6 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 90.1, NOW() - INTERVAL 1 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 20.4, NOW() - INTERVAL 2 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02');

INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 87.2, NOW() - INTERVAL 8 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 80.1, NOW() - INTERVAL 8 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 390.0, NOW() - INTERVAL 9 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 85.0, NOW() - INTERVAL 9 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 24.1, NOW() - INTERVAL 10 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 85.7, NOW() - INTERVAL 10 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 83.0, NOW() - INTERVAL 11 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 395.4, NOW() - INTERVAL 11 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 86.6, NOW() - INTERVAL 12 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 23.4, NOW() - INTERVAL 12 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('CPU', 84.3, NOW() - INTERVAL 13 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 82.2, NOW() - INTERVAL 13 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 389.5, NOW() - INTERVAL 14 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 84.7, NOW() - INTERVAL 14 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 22.8, NOW() - INTERVAL 15 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 86.1, NOW() - INTERVAL 8 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 81.3, NOW() - INTERVAL 9 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 393.0, NOW() - INTERVAL 10 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 82.4, NOW() - INTERVAL 11 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 26.0, NOW() - INTERVAL 12 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02');


INSERT INTO alerta (componente, valor, dt_registro, gravidade, status, fk_carro_macadress) VALUES
('CPU', 83.0, NOW() - INTERVAL 16 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 78.8, NOW() - INTERVAL 17 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 370.5, NOW() - INTERVAL 18 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 80.3, NOW() - INTERVAL 19 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 27.2, NOW() - INTERVAL 20 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 82.4, NOW() - INTERVAL 21 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 79.9, NOW() - INTERVAL 22 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 360.1, NOW() - INTERVAL 23 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 78.7, NOW() - INTERVAL 24 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 29.5, NOW() - INTERVAL 25 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('CPU', 81.7, NOW() - INTERVAL 26 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 80.5, NOW() - INTERVAL 27 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 355.0, NOW() - INTERVAL 28 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 77.8, NOW() - INTERVAL 29 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 30.2, NOW() - INTERVAL 30 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 84.6, NOW() - INTERVAL 16 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 82.7, NOW() - INTERVAL 17 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 365.3, NOW() - INTERVAL 18 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 76.5, NOW() - INTERVAL 19 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 31.1, NOW() - INTERVAL 20 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('CPU', 83.4, NOW() - INTERVAL 21 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('RAM', 80.0, NOW() - INTERVAL 22 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('Disco', 358.2, NOW() - INTERVAL 23 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Temperatura', 75.3, NOW() - INTERVAL 24 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('Bateria', 29.1, NOW() - INTERVAL 25 DAY, 'High', 1, 'AA:BB:CC:DD:EE:01'),
('CPU', 82.2, NOW() - INTERVAL 26 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:02'),
('RAM', 78.5, NOW() - INTERVAL 27 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Disco', 350.0, NOW() - INTERVAL 28 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02'),
('Temperatura', 74.8, NOW() - INTERVAL 29 DAY, 'Medium', 1, 'AA:BB:CC:DD:EE:01'),
('Bateria', 32.0, NOW() - INTERVAL 30 DAY, 'High', 1, 'AA:BB:CC:DD:EE:02');




