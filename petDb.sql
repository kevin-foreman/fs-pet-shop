DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id serial primary key,
    name varchar,
    age numeric,
    kind varchar
);