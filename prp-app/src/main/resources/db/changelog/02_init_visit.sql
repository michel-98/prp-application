DROP TABLE IF EXISTS visit cascade;
CREATE TABLE visit
(
    id             SERIAL PRIMARY KEY,
    date_time      VARCHAR(255) NOT NULL,
    type           VARCHAR(50),
    reason         VARCHAR(50),
    family_history VARCHAR(5000)
);