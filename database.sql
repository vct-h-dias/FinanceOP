CREATE DATABASE IF NOT EXISTS FINOP;

USE FINOP;

CREATE TABLE IF NOT EXISTS USERS (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email VARCHAR(70) NOT NULL UNIQUE,
	username VARCHAR(30) NOT NULL,
	senha VARCHAR(70) NOT NULL,
	url_image VARCHAR(70)
);

CREATE TABLE IF NOT EXISTS COMENTS (
	id_coment INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	id_user INT NOT NULL,
	comentario TEXT,
	data_coment TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY (id_user) REFERENCES USERS(id)
);

CREATE TABLE IF NOT EXISTS CONSULTAS (
	id_consulta INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	id_user INT NOT NULL,
	consulta TEXT,
	data_consulta TIMESTAMP DEFAULT current_timestamp,
	FOREIGN KEY (id_user) REFERENCES USERS(id)
);

select * from USERS;