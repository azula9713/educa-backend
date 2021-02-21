-- DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS educa;   
USE educa; 

DROP TABLE IF EXISTS teacher; 

CREATE TABLE IF NOT EXISTS teacher 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     nic      	VARCHAR(20) UNIQUE NOT NULL, 
     mobile     VARCHAR(50) UNIQUE NOT NULL, 
     role       ENUM('SuperUser', 'Teacher', 'Student') DEFAULT 'SuperUser'
  ); 
DROP TABLE IF EXISTS student;
CREATE TABLE IF NOT EXISTS student 
( 
   id         INT PRIMARY KEY auto_increment, 
   email      VARCHAR(100) UNIQUE NOT NULL, 
   password   CHAR(60) NOT NULL, 
   first_name VARCHAR(50) NOT NULL, 
   last_name  VARCHAR(50) NOT NULL, 
   mobile     VARCHAR(50) UNIQUE NOT NULL, 
   batch      INT DEFAULT 0, 
   role       ENUM('SuperUser', 'Teacher', 'Student') DEFAULT 'SuperUser'
); 