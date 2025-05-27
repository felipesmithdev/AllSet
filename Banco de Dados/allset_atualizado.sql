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
('CPU', 95.5, '2024-08-01 10:15:30', 'grave', 0, '00:1A:2B:3C:4D:5E'),
('RAM', 18.2, '2024-08-02 11:20:45', 'medio', 0, '11:2A:3B:4C:5D:6E'),
('Disco', 520.8, '2024-08-03 12:30:15', 'grave', 0, '22:3A:4B:5C:6D:7E'),
('Temperatura', 90.2, '2024-08-04 13:45:20', 'grave',  0, '33:4A:5B:6C:7D:8E'),
('Bateria', 15.5, '2024-08-05 14:50:35', 'medio', 0, '44:5A:6B:7C:8D:9E');

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


select * from alerta