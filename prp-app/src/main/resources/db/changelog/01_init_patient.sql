DROP TABLE IF EXISTS patient cascade;
CREATE TABLE patient
(
    id                     SERIAL PRIMARY KEY,
    name                   VARCHAR(30),
    surname                varchar(30),
    birth_date             DATE,
    social_security_number BIGINT UNIQUE
);

INSERT INTO patient(name, surname, birth_date, social_security_number)
VALUES ('michele', 'antonacci', '1998-12-10', 123),
       ('giovanni', 'verga', '1988-12-10', 113),
       ('leonardo', 'sciascia', '1978-10-15', 122)