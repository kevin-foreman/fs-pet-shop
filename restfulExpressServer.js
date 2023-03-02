// set up dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const next = require('process');
// const colors = require('colors/safe');
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'petshop',
    password: 'password',
    port: 5432
});

// handle requests with routes
app.get('/pets', (req, res, next) => {
    const result = pool.query('SELECT * FROM pets', (err, result) => {
        if (err) {
            return next(err);
        };

        const rows = result.rows;
        console.log(rows);
        res.send(rows);
    });
});

// Get pet by id (index where it sits in the array)
app.get('/pets/:id/', (req, res, next) => {
    
    const id = Number.parseInt(req.params.id);
    const result = pool.query('SELECT name, kind, age FROM pets WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        };
        const pet = result.rows[0];
        console.log(pet);
        res.send(pet);
    }); 
});

// Add a pet to array
app.post('/pets', (req, res, next) => {

    const age = parseInt(req.body.age);
    const { kind, name } = req.body;

    if (!age || !kind || !name || Number.isNaN(age)) {
        return res.status(400).send('Error: missing values')
    } else {

    pool.query('INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *;', [name, kind, age], (err, result) => {
        if (err) {
            return next(err);
        };
        let petInfo = result.rows[0];
        console.log('Added: ' + petInfo);
        res.status(200).send(petInfo);
    });
    };

});

// Update a pet by id number
app.delete("/pets/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const result = pool.query('DELETE FROM pets WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        };
        console.log(result);
        res.send(result);
    });
});

app.patch("/pets/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const age = Number.parseInt(req.params.age);
    const { name, kind } = req.body;

    if (name && kind && age && !Number.isNaN(age)) {
        res.status(400).send("No pet found with those details");
    } 
        pool.query('UPDATE pets SET name=$1, age=$2, kind=$3 WHERE id = $4', [name, kind, age, id], (err, result));
        const pet = result.rows[0];
        console.log("Single Pet ID", id, "values", pet);
        res.status(200).send("Pet updated");
        res.send(pet);
});

app.use((error, req, res, next) => {
    console.error(error);
    // res.render('errorPage'); // renders an error page
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Not found, my guy!",
        }
    });
});




// listen on a port
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});