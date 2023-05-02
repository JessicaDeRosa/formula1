# Formula1

## Getting started

### Install MySQL



### Create table

´´´mysql
CREATE DATABASE mydb;

USE mydb;

CREATE TABLE drivers (
    code varchar(10) DEFAULT 'N/A',
    givenName varchar(255) NULL,
    familyName varchar(50) NOT NULL DEFAULT 'unknown',
    dateOfBirth date NOT NULL,
    nationality varchar(50) NOT NULL,
    date_of_birth date DEFAULT NULL,
    permanent_number int DEFAULT NULL,
    first_name varchar(255) DEFAULT NULL,
    last_name varchar(255) DEFAULT NULL
);

´´´

