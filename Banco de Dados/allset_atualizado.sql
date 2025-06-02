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

CREATE TABLE historicoQtdPorCategoria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(5),
	critico INT,
	moderado INT,
    normal INT,
    data DATE,
    lote INT
);

INSERT INTO historicoQtdPorCategoria (tipo, critico, moderado, normal, data, lote) VALUES
('cpu', 43, 1, 4, '2025-05-31', 1),
('ram', 17, 18, 13, '2025-05-31', 1),
('disco', 20, 5, 23, '2025-05-31', 1),
('cpu', 44, 2, 2, '2025-05-30', 1),
('ram', 44, 2, 2, '2025-05-30', 1),
('disco', 17, 17, 14, '2025-05-30', 1),
('cpu', 42, 1, 5, '2025-05-29', 1),
('ram', 10, 12, 26, '2025-05-29', 1),
('disco', 34, 6, 8, '2025-05-29', 1),
('cpu', 7, 10, 31, '2025-05-28', 1),
('ram', 29, 9, 10, '2025-05-28', 1),
('disco', 5, 5, 38, '2025-05-28', 1),
('cpu', 7, 15, 26, '2025-05-27', 1),
('ram', 17, 16, 15, '2025-05-27', 1),
('disco', 14, 28, 6, '2025-05-27', 1),
('cpu', 4, 30, 14, '2025-05-26', 1),
('ram', 44, 1, 3, '2025-05-26', 1),
('disco', 35, 5, 8, '2025-05-26', 1),
('cpu', 3, 1, 44, '2025-05-25', 1),
('ram', 11, 28, 9, '2025-05-25', 1),
('disco', 38, 3, 7, '2025-05-25', 1),
('cpu', 43, 1, 4, '2025-05-24', 1),
('ram', 39, 0, 9, '2025-05-24', 1),
('disco', 15, 7, 26, '2025-05-24', 1),
('cpu', 4, 27, 17, '2025-05-23', 1),
('ram', 14, 8, 26, '2025-05-23', 1),
('disco', 39, 1, 8, '2025-05-23', 1),
('cpu', 40, 1, 7, '2025-05-22', 1),
('ram', 35, 10, 3, '2025-05-22', 1),
('disco', 27, 21, 0, '2025-05-22', 1),
('cpu', 47, 0, 1, '2025-05-21', 1),
('ram', 21, 9, 18, '2025-05-21', 1),
('disco', 45, 0, 3, '2025-05-21', 1),
('cpu', 4, 37, 7, '2025-05-20', 1),
('ram', 45, 3, 0, '2025-05-20', 1),
('disco', 34, 2, 12, '2025-05-20', 1),
('cpu', 8, 29, 11, '2025-05-19', 1),
('ram', 26, 3, 19, '2025-05-19', 1),
('disco', 47, 1, 0, '2025-05-19', 1),
('cpu', 15, 30, 3, '2025-05-18', 1),
('ram', 45, 0, 3, '2025-05-18', 1),
('disco', 30, 9, 9, '2025-05-18', 1),
('cpu', 22, 4, 22, '2025-05-17', 1),
('ram', 1, 31, 16, '2025-05-17', 1),
('disco', 31, 9, 8, '2025-05-17', 1),
('cpu', 9, 7, 32, '2025-05-16', 1),
('ram', 17, 22, 9, '2025-05-16', 1),
('disco', 20, 21, 7, '2025-05-16', 1),
('cpu', 40, 2, 6, '2025-05-15', 1),
('ram', 35, 2, 11, '2025-05-15', 1),
('disco', 41, 7, 0, '2025-05-15', 1),
('cpu', 37, 4, 7, '2025-05-14', 1),
('ram', 22, 21, 5, '2025-05-14', 1),
('disco', 23, 7, 18, '2025-05-14', 1),
('cpu', 38, 4, 6, '2025-05-13', 1),
('ram', 45, 0, 3, '2025-05-13', 1),
('disco', 8, 11, 29, '2025-05-13', 1),
('cpu', 31, 17, 0, '2025-05-12', 1),
('ram', 2, 5, 41, '2025-05-12', 1),
('disco', 23, 22, 3, '2025-05-12', 1),
('cpu', 35, 3, 10, '2025-05-11', 1),
('ram', 37, 6, 5, '2025-05-11', 1),
('disco', 28, 3, 17, '2025-05-11', 1),
('cpu', 20, 13, 15, '2025-05-10', 1),
('ram', 40, 7, 1, '2025-05-10', 1),
('disco', 22, 6, 20, '2025-05-10', 1),
('cpu', 26, 17, 5, '2025-05-09', 1),
('ram', 47, 0, 1, '2025-05-09', 1),
('disco', 43, 3, 2, '2025-05-09', 1),
('cpu', 3, 36, 9, '2025-05-08', 1),
('ram', 26, 11, 11, '2025-05-08', 1),
('disco', 48, 0, 0, '2025-05-08', 1),
('cpu', 31, 3, 14, '2025-05-07', 1),
('ram', 6, 3, 39, '2025-05-07', 1),
('disco', 25, 15, 8, '2025-05-07', 1),
('cpu', 43, 5, 0, '2025-05-06', 1),
('ram', 41, 3, 4, '2025-05-06', 1),
('disco', 1, 34, 13, '2025-05-06', 1),
('cpu', 28, 3, 17, '2025-05-05', 1),
('ram', 30, 4, 14, '2025-05-05', 1),
('disco', 15, 18, 15, '2025-05-05', 1),
('cpu', 30, 11, 7, '2025-05-04', 1),
('ram', 15, 10, 23, '2025-05-04', 1),
('disco', 29, 8, 11, '2025-05-04', 1),
('cpu', 13, 34, 1, '2025-05-03', 1),
('ram', 25, 22, 1, '2025-05-03', 1),
('disco', 30, 6, 12, '2025-05-03', 1),
('cpu', 30, 3, 15, '2025-05-02', 1),
('ram', 47, 0, 1, '2025-05-02', 1),
('disco', 31, 8, 9, '2025-05-02', 1);

-- LOTE 2 - Predominância MODERADA de crítico
INSERT INTO historicoQtdPorCategoria (tipo, critico, moderado, normal, data, lote) VALUES
('cpu', 25, 12, 11, '2025-05-31', 2),
('ram', 20, 15, 13, '2025-05-31', 2),
('disco', 22, 14, 12, '2025-05-31', 2),
('cpu', 26, 11, 11, '2025-05-30', 2),
('ram', 24, 13, 11, '2025-05-30', 2),
('disco', 21, 16, 11, '2025-05-30', 2),
('cpu', 23, 13, 12, '2025-05-29', 2),
('ram', 19, 17, 12, '2025-05-29', 2),
('disco', 25, 11, 12, '2025-05-29', 2),
('cpu', 22, 14, 12, '2025-05-28', 2),
('ram', 26, 10, 12, '2025-05-28', 2),
('disco', 20, 15, 13, '2025-05-28', 2),
('cpu', 24, 12, 12, '2025-05-27', 2),
('ram', 21, 15, 12, '2025-05-27', 2),
('disco', 23, 13, 12, '2025-05-27', 2),
('cpu', 25, 11, 12, '2025-05-26', 2),
('ram', 22, 14, 12, '2025-05-26', 2),
('disco', 24, 12, 12, '2025-05-26', 2),
('cpu', 23, 13, 12, '2025-05-25', 2),
('ram', 25, 11, 12, '2025-05-25', 2),
('disco', 21, 15, 12, '2025-05-25', 2),
('cpu', 26, 10, 12, '2025-05-24', 2),
('ram', 20, 16, 12, '2025-05-24', 2),
('disco', 22, 14, 12, '2025-05-24', 2),
('cpu', 24, 12, 12, '2025-05-23', 2),
('ram', 23, 13, 12, '2025-05-23', 2),
('disco', 25, 11, 12, '2025-05-23', 2),
('cpu', 21, 15, 12, '2025-05-22', 2),
('ram', 24, 12, 12, '2025-05-22', 2),
('disco', 23, 13, 12, '2025-05-22', 2),
('cpu', 25, 11, 12, '2025-05-21', 2),
('ram', 22, 14, 12, '2025-05-21', 2),
('disco', 26, 10, 12, '2025-05-21', 2),
('cpu', 24, 12, 12, '2025-05-20', 2),
('ram', 21, 15, 12, '2025-05-20', 2),
('disco', 23, 13, 12, '2025-05-20', 2),
('cpu', 22, 14, 12, '2025-05-19', 2),
('ram', 25, 11, 12, '2025-05-19', 2),
('disco', 24, 12, 12, '2025-05-19', 2),
('cpu', 26, 10, 12, '2025-05-18', 2),
('ram', 23, 13, 12, '2025-05-18', 2),
('disco', 21, 15, 12, '2025-05-18', 2),
('cpu', 25, 11, 12, '2025-05-17', 2),
('ram', 24, 12, 12, '2025-05-17', 2),
('disco', 22, 14, 12, '2025-05-17', 2),
('cpu', 23, 13, 12, '2025-05-16', 2),
('ram', 26, 10, 12, '2025-05-16', 2),
('disco', 25, 11, 12, '2025-05-16', 2),
('cpu', 24, 12, 12, '2025-05-15', 2),
('ram', 21, 15, 12, '2025-05-15', 2),
('disco', 23, 13, 12, '2025-05-15', 2),
('cpu', 22, 14, 12, '2025-05-14', 2),
('ram', 25, 11, 12, '2025-05-14', 2),
('disco', 24, 12, 12, '2025-05-14', 2),
('cpu', 26, 10, 12, '2025-05-13', 2),
('ram', 23, 13, 12, '2025-05-13', 2),
('disco', 21, 15, 12, '2025-05-13', 2),
('cpu', 25, 11, 12, '2025-05-12', 2),
('ram', 22, 14, 12, '2025-05-12', 2),
('disco', 24, 12, 12, '2025-05-12', 2),
('cpu', 23, 13, 12, '2025-05-11', 2),
('ram', 26, 10, 12, '2025-05-11', 2),
('disco', 25, 11, 12, '2025-05-11', 2),
('cpu', 24, 12, 12, '2025-05-10', 2),
('ram', 21, 15, 12, '2025-05-10', 2),
('disco', 22, 14, 12, '2025-05-10', 2),
('cpu', 25, 11, 12, '2025-05-09', 2),
('ram', 23, 13, 12, '2025-05-09', 2),
('disco', 24, 12, 12, '2025-05-09', 2),
('cpu', 26, 10, 12, '2025-05-08', 2),
('ram', 22, 14, 12, '2025-05-08', 2),
('disco', 21, 15, 12, '2025-05-08', 2),
('cpu', 24, 12, 12, '2025-05-07', 2),
('ram', 25, 11, 12, '2025-05-07', 2),
('disco', 23, 13, 12, '2025-05-07', 2),
('cpu', 22, 14, 12, '2025-05-06', 2),
('ram', 24, 12, 12, '2025-05-06', 2),
('disco', 26, 10, 12, '2025-05-06', 2),
('cpu', 25, 11, 12, '2025-05-05', 2),
('ram', 21, 15, 12, '2025-05-05', 2),
('disco', 23, 13, 12, '2025-05-05', 2),
('cpu', 24, 12, 12, '2025-05-04', 2),
('ram', 22, 14, 12, '2025-05-04', 2),
('disco', 25, 11, 12, '2025-05-04', 2),
('cpu', 23, 13, 12, '2025-05-03', 2),
('ram', 26, 10, 12, '2025-05-03', 2),
('disco', 24, 12, 12, '2025-05-03', 2),
('cpu', 21, 15, 12, '2025-05-02', 2),
('ram', 25, 11, 12, '2025-05-02', 2),
('disco', 22, 14, 12, '2025-05-02', 2);

-- LOTE 3 - Predominância MODERADA de moderado
INSERT INTO historicoQtdPorCategoria (tipo, critico, moderado, normal, data, lote) VALUES
('cpu', 12, 24, 12, '2025-05-31', 3),
('ram', 14, 22, 12, '2025-05-31', 3),
('disco', 11, 25, 12, '2025-05-31', 3),
('cpu', 13, 23, 12, '2025-05-30', 3),
('ram', 15, 21, 12, '2025-05-30', 3),
('disco', 12, 24, 12, '2025-05-30', 3),
('cpu', 14, 22, 12, '2025-05-29', 3),
('ram', 11, 25, 12, '2025-05-29', 3),
('disco', 13, 23, 12, '2025-05-29', 3),
('cpu', 12, 24, 12, '2025-05-28', 3),
('ram', 16, 20, 12, '2025-05-28', 3),
('disco', 15, 21, 12, '2025-05-28', 3),
('cpu', 11, 25, 12, '2025-05-27', 3),
('ram', 13, 23, 12, '2025-05-27', 3),
('disco', 14, 22, 12, '2025-05-27', 3),
('cpu', 12, 24, 12, '2025-05-26', 3),
('ram', 15, 21, 12, '2025-05-26', 3),
('disco', 11, 25, 12, '2025-05-26', 3),
('cpu', 14, 22, 12, '2025-05-25', 3),
('ram', 12, 24, 12, '2025-05-25', 3),
('disco', 13, 23, 12, '2025-05-25', 3),
('cpu', 16, 20, 12, '2025-05-24', 3),
('ram', 11, 25, 12, '2025-05-24', 3),
('disco', 15, 21, 12, '2025-05-24', 3),
('cpu', 13, 23, 12, '2025-05-23', 3),
('ram', 14, 22, 12, '2025-05-23', 3),
('disco', 12, 24, 12, '2025-05-23', 3),
('cpu', 11, 25, 12, '2025-05-22', 3),
('ram', 15, 21, 12, '2025-05-22', 3),
('disco', 14, 22, 12, '2025-05-22', 3),
('cpu', 12, 24, 12, '2025-05-21', 3),
('ram', 13, 23, 12, '2025-05-21', 3),
('disco', 16, 20, 12, '2025-05-21', 3),
('cpu', 15, 21, 12, '2025-05-20', 3),
('ram', 12, 24, 12, '2025-05-20', 3),
('disco', 11, 25, 12, '2025-05-20', 3),
('cpu', 14, 22, 12, '2025-05-19', 3),
('ram', 16, 20, 12, '2025-05-19', 3),
('disco', 13, 23, 12, '2025-05-19', 3),
('cpu', 12, 24, 12, '2025-05-18', 3),
('ram', 15, 21, 12, '2025-05-18', 3),
('disco', 14, 22, 12, '2025-05-18', 3),
('cpu', 11, 25, 12, '2025-05-17', 3),
('ram', 13, 23, 12, '2025-05-17', 3),
('disco', 12, 24, 12, '2025-05-17', 3),
('cpu', 16, 20, 12, '2025-05-16', 3),
('ram', 14, 22, 12, '2025-05-16', 3),
('disco', 15, 21, 12, '2025-05-16', 3),
('cpu', 13, 23, 12, '2025-05-15', 3),
('ram', 11, 25, 12, '2025-05-15', 3),
('disco', 12, 24, 12, '2025-05-15', 3),
('cpu', 14, 22, 12, '2025-05-14', 3),
('ram', 15, 21, 12, '2025-05-14', 3),
('disco', 16, 20, 12, '2025-05-14', 3),
('cpu', 12, 24, 12, '2025-05-13', 3),
('ram', 13, 23, 12, '2025-05-13', 3),
('disco', 11, 25, 12, '2025-05-13', 3),
('cpu', 15, 21, 12, '2025-05-12', 3),
('ram', 14, 22, 12, '2025-05-12', 3),
('disco', 12, 24, 12, '2025-05-12', 3),
('cpu', 11, 25, 12, '2025-05-11', 3),
('ram', 16, 20, 12, '2025-05-11', 3),
('disco', 13, 23, 12, '2025-05-11', 3),
('cpu', 14, 22, 12, '2025-05-10', 3),
('ram', 12, 24, 12, '2025-05-10', 3),
('disco', 15, 21, 12, '2025-05-10', 3),
('cpu', 13, 23, 12, '2025-05-09', 3),
('ram', 11, 25, 12, '2025-05-09', 3),
('disco', 14, 22, 12, '2025-05-09', 3),
('cpu', 16, 20, 12, '2025-05-08', 3),
('ram', 15, 21, 12, '2025-05-08', 3),
('disco', 12, 24, 12, '2025-05-08', 3),
('cpu', 12, 24, 12, '2025-05-07', 3),
('ram', 13, 23, 12, '2025-05-07', 3),
('disco', 11, 25, 12, '2025-05-07', 3),
('cpu', 14, 22, 12, '2025-05-06', 3),
('ram', 16, 20, 12, '2025-05-06', 3),
('disco', 15, 21, 12, '2025-05-06', 3),
('cpu', 13, 23, 12, '2025-05-05', 3),
('ram', 12, 24, 12, '2025-05-05', 3),
('disco', 14, 22, 12, '2025-05-05', 3),
('cpu', 11, 25, 12, '2025-05-04', 3),
('ram', 15, 21, 12, '2025-05-04', 3),
('disco', 16, 20, 12, '2025-05-04', 3),
('cpu', 14, 22, 12, '2025-05-03', 3),
('ram', 13, 23, 12, '2025-05-03', 3),
('disco', 12, 24, 12, '2025-05-03', 3),
('cpu', 15, 21, 12, '2025-05-02', 3),
('ram', 11, 25, 12, '2025-05-02', 3),
('disco', 13, 23, 12, '2025-05-02', 3);

-- LOTE 4 - Predominância MODERADA de normal
INSERT INTO historicoQtdPorCategoria (tipo, critico, moderado, normal, data, lote) VALUES
('cpu', 12, 12, 24, '2025-05-31', 4),
('ram', 11, 14, 23, '2025-05-31', 4),
('disco', 13, 11, 24, '2025-05-31', 4),
('cpu', 10, 15, 23, '2025-05-30', 4),
('ram', 12, 13, 23, '2025-05-30', 4),
('disco', 14, 10, 24, '2025-05-30', 4),
('cpu', 11, 12, 25, '2025-05-29', 4),
('ram', 13, 11, 24, '2025-05-29', 4),
('disco', 12, 14, 22, '2025-05-29', 4),
('cpu', 15, 10, 23, '2025-05-28', 4),
('ram', 10, 16, 22, '2025-05-28', 4),
('disco', 11, 13, 24, '2025-05-28', 4),
('cpu', 12, 11, 25, '2025-05-27', 4),
('ram', 14, 12, 22, '2025-05-27', 4),
('disco', 13, 15, 20, '2025-05-27', 4),
('cpu', 11, 14, 23, '2025-05-26', 4),
('ram', 12, 10, 26, '2025-05-26', 4),
('disco', 15, 11, 22, '2025-05-26', 4),
('cpu', 10, 13, 25, '2025-05-25', 4),
('ram', 14, 12, 22, '2025-05-25', 4),
('disco', 11, 16, 21, '2025-05-25', 4),
('cpu', 13, 11, 24, '2025-05-24', 4),
('ram', 12, 15, 21, '2025-05-24', 4),
('disco', 10, 12, 26, '2025-05-24', 4),
('cpu', 14, 10, 24, '2025-05-23', 4),
('ram', 11, 13, 24, '2025-05-23', 4),
('disco', 12, 14, 22, '2025-05-23', 4),
('cpu', 12, 12, 24, '2025-05-22', 4),
('ram', 15, 11, 22, '2025-05-22', 4),
('disco', 13, 10, 25, '2025-05-22', 4),
('cpu', 11, 16, 21, '2025-05-21', 4),
('ram', 10, 14, 24, '2025-05-21', 4),
('disco', 14, 12, 22, '2025-05-21', 4),
('cpu', 13, 11, 24, '2025-05-20', 4),
('ram', 12, 13, 23, '2025-05-20', 4),
('disco', 11, 15, 22, '2025-05-20', 4),
('cpu', 15, 10, 23, '2025-05-19', 4),
('ram', 14, 12, 22, '2025-05-19', 4),
('disco', 10, 16, 22, '2025-05-19', 4),
('cpu', 12, 14, 22, '2025-05-18', 4),
('ram', 11, 11, 26, '2025-05-18', 4),
('disco', 13, 13, 22, '2025-05-18', 4),
('cpu', 10, 15, 23, '2025-05-17', 4),
('ram', 14, 10, 24, '2025-05-17', 4),
('disco', 12, 12, 24, '2025-05-17', 4),
('cpu', 16, 11, 21, '2025-05-16', 4),
('ram', 13, 14, 21, '2025-05-16', 4),
('disco', 11, 13, 24, '2025-05-16', 4),
('cpu', 12, 10, 26, '2025-05-15', 4),
('ram', 15, 12, 21, '2025-05-15', 4),
('disco', 10, 15, 23, '2025-05-15', 4),
('cpu', 14, 13, 21, '2025-05-14', 4),
('ram', 11, 16, 21, '2025-05-14', 4),
('disco', 13, 11, 24, '2025-05-14', 4),
('cpu', 12, 14, 22, '2025-05-13', 4),
('ram', 10, 12, 26, '2025-05-13', 4),
('disco', 15, 10, 23, '2025-05-13', 4),
('cpu', 11, 13, 24, '2025-05-12', 4),
('ram', 14, 11, 23, '2025-05-12', 4),
('disco', 12, 15, 21, '2025-05-12', 4),
('cpu', 13, 12, 23, '2025-05-11', 4),
('ram', 16, 10, 22, '2025-05-11', 4),
('disco', 11, 14, 23, '2025-05-11', 4),
('cpu', 10, 16, 22, '2025-05-10', 4),
('ram', 12, 13, 23, '2025-05-10', 4),
('disco', 14, 11, 23, '2025-05-10', 4),
('cpu', 15, 12, 21, '2025-05-09', 4),
('ram', 11, 15, 22, '2025-05-09', 4),
('disco', 13, 10, 25, '2025-05-09', 4),
('cpu', 12, 14, 22, '2025-05-08', 4),
('ram', 10, 11, 27, '2025-05-08', 4),
('disco', 16, 12, 20, '2025-05-08', 4),
('cpu', 14, 13, 21, '2025-05-07', 4),
('ram', 13, 10, 25, '2025-05-07', 4),
('disco', 11, 16, 21, '2025-05-07', 4),
('cpu', 12, 15, 21, '2025-05-06', 4),
('ram', 15, 11, 22, '2025-05-06', 4),
('disco', 10, 14, 24, '2025-05-06', 4),
('cpu', 11, 12, 25, '2025-05-05', 4),
('ram', 14, 13, 21, '2025-05-05', 4),
('disco', 13, 15, 20, '2025-05-05', 4),
('cpu', 16, 10, 22, '2025-05-04', 4),
('ram', 12, 16, 20, '2025-05-04', 4),
('disco', 11, 12, 25, '2025-05-04', 4),
('cpu', 13, 14, 21, '2025-05-03', 4),
('ram', 10, 13, 25, '2025-05-03', 4),
('disco', 15, 11, 22, '2025-05-03', 4),
('cpu', 12, 11, 25, '2025-05-02', 4),
('ram', 14, 15, 19, '2025-05-02', 4),
('disco', 11, 13, 24, '2025-05-02', 4);

SELECT
    TRUNCATE(SUM(critico) / (SUM(critico) + SUM(moderado) + SUM(normal)) * 100, 0) AS porcentagem
FROM (
    SELECT
        data,
        SUM(critico) AS critico,
        SUM(moderado) AS moderado,
        SUM(normal) AS normal
    FROM historicoQtdPorCategoria
    WHERE lote = 1
    GROUP BY data
    ORDER BY data DESC
    LIMIT 7
) AS sub_ultimas_datas;

SELECT
    SUM(critico) AS criticos,
    (SUM(critico) + SUM(moderado) + SUM(normal)) AS total
FROM (
    SELECT
        data,
        SUM(critico) AS critico,
        SUM(moderado) AS moderado,
        SUM(normal) AS normal
    FROM historicoQtdPorCategoria
    WHERE lote = 1
    GROUP BY data
    ORDER BY data DESC
    LIMIT 7
) AS sub_ultimas_datas;

SELECT
    sub.tipo,
    SUM(sub.critico) AS totalCritico
FROM (
    SELECT
        h.tipo,
        h.data,
        h.critico
    FROM historicoQtdPorCategoria h
    JOIN (
        SELECT DISTINCT data
        FROM historicoQtdPorCategoria
        WHERE lote = 1
        ORDER BY data DESC
        LIMIT 7
    ) ultimas_datas ON h.data = ultimas_datas.data
    WHERE h.lote = 1
) AS sub
GROUP BY sub.tipo
ORDER BY totalCritico DESC;

SELECT '${categoria}', DATE_FORMAT(data, '%d/%m') AS data_formatada
FROM historicoQtdPorCategoria
WHERE tipo = '${componente}' AND lote = 1
ORDER BY data DESC
LIMIT 7;

SELECT '${categoria2}', DATE_FORMAT(data, '%d/%m') AS data_formatada
FROM historicoQtdPorCategoria
WHERE tipo = '${componente2}' AND lote = 1
ORDER BY data DESC
LIMIT 7;

SELECT
    SUM(h.critico) AS critico,
    SUM(h.moderado) AS moderado,
    SUM(h.normal) AS normal
FROM historicoQtdPorCategoria h
JOIN (
    SELECT DISTINCT data
    FROM historicoQtdPorCategoria
    WHERE lote = 1
    ORDER BY data DESC
    LIMIT 7
) ultimas_datas ON h.data = ultimas_datas.data
WHERE h.lote = 1;

SELECT
    SUM(h.critico) AS critico,
    SUM(h.moderado) AS moderado,
    SUM(h.normal) AS normal
FROM historicoQtdPorCategoria h
JOIN (
    SELECT DISTINCT data
    FROM historicoQtdPorCategoria
    WHERE lote = 1
    ORDER BY data DESC
    LIMIT 7
) ultimas_datas ON h.data = ultimas_datas.data
WHERE h.lote = 1 AND h.tipo = '${tipo}';


SELECT * FROM historicoQtdPorCategoria;

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




