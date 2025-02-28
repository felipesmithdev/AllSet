CREATE DATABASE allsetPython;

USE allsetPython;

CREATE TABLE registrosCriticos (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
	valor DOUBLE,
    componente VARCHAR(30),
    dataHora DATETIME
);

CREATE TABLE mediasRegistros (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    mediaVelRede DOUBLE, 
    mediaArmPercentLivre DOUBLE, 
    mediaRAMusadoPercent DOUBLE, 
    mediaCPUpercent DOUBLE,
    dataHora DATETIME
);
select * from registrosCriticos;
select * from mediasRegistros;