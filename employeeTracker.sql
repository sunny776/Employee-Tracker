DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL, 
	name_dep VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles(
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,2) NOT NULL,
	department_id INT,
	PRIMARY KEY (id),

    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);
    
    
CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name  VARCHAR(30), 
    last_name  VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),

    CONSTRAINT fk_roles
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_employee
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL

);



 