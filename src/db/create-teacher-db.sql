-- DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS educa;
USE educa;
DROP TABLE IF EXISTS teacher;
CREATE TABLE IF NOT EXISTS teacher (
   teacher_id INT PRIMARY KEY auto_increment,
   email VARCHAR(100) UNIQUE NOT NULL,
   password CHAR(60) NOT NULL,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   nic VARCHAR(20) UNIQUE NOT NULL,
   avatar VARCHAR(100) NOT NULL,
   mobile VARCHAR(50) UNIQUE NOT NULL
);
DROP TABLE IF EXISTS student;
CREATE TABLE IF NOT EXISTS student (
   student_id INT PRIMARY KEY auto_increment,
   email VARCHAR(100) UNIQUE NOT NULL,
   password CHAR(60) NOT NULL,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   avatar VARCHAR(100) NOT NULL,
   mobile VARCHAR(50) UNIQUE NOT NULL,
   grade_id INT DEFAULT 0,
   is_approved BOOLEAN NOT NULL DEFAULT FALSE,
   registered_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS grade;
CREATE TABLE IF NOT EXISTS grade (
   grade_id INT PRIMARY KEY auto_increment,
   grade_name VARCHAR(50) NOT NULL
);
DROP TABLE IF EXISTS exam_results;
CREATE TABLE IF NOT EXISTS exam_results (
   exam_results_id INT PRIMARY KEY auto_increment,
   exam_id INT NOT NULL,
   student_id INT NOT NULL,
   marks INT NOT NULL
);
DROP TABLE IF EXISTS exams;
CREATE TABLE IF NOT EXISTS exams (
   exam_id INT PRIMARY KEY auto_increment,
   course_id INT NOT NULL,
   exam_date DATETIME NOT NULL,
   exam_duration INT NOT NULL,
   paper_url VARCHAR(100) NOT NULL
);
DROP TABLE IF EXISTS courses;
CREATE TABLE IF NOT EXISTS courses (
   course_id INT PRIMARY KEY auto_increment,
   grade_id INT NOT NULL,
   teacher_id INT NOT NULL,
   amount FLOAT NOT NULL,
   course_name VARCHAR(100) NOT NULL
);
DROP TABLE IF EXISTS enrollments;
CREATE TABLE IF NOT EXISTS enrollments (  
   enrollment_id INT PRIMARY KEY auto_increment,
   course_id INT NOT NULL,
   student_id INT NOT NULL,
   enrolled_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   is_approved BOOLEAN NOT NULL DEFAULT FALSE
);
DROP TABLE IF EXISTS course_materials;
CREATE TABLE IF NOT EXISTS course_materials (
   course_materials_id INT PRIMARY KEY auto_increment,
   course_id INT NOT NULL,
   paper_url VARCHAR(100) NOT NULL
);
DROP TABLE IF EXISTS payments;
CREATE TABLE IF NOT EXISTS payments (
   payment_id INT PRIMARY KEY auto_increment,
   enrollment_id INT NOT NULL,
   paid_date DATETIME NOT NULL,
   paid_month INT NOT NULL,
   paid_year INT NOT NULL
);