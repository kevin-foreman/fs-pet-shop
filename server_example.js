// set up dependencies
const express = require('express');
const app = express();
// express.static(root); // root, or source of the static files can also be chained with [options]
// app.use(express.static('assets'));
const fs = require('fs');
const { nextTick } = require('process');

app.use(express.json());



// handle requests with routes
app.get('/pets', (req, res, next) => {
    fs.readFile('./assets/pets.json', (err, data) => {
        if (err) {
            next(err);
        }
        const allPets = JSON.parse(data);
        res.send(allPets);
    });
});

app.get('/pets/0', (req, res, next) => {
    fs.readFile('./assets/pets.json', (err, data, next) => {
        const firstPet = JSON.parse(data)[0];
        res.send(firstPet);
    })
});

app.get('/pets/1', (req, res, next) => {
    fs.readFile('./assets/pets.json', (err, data, next) => {
        const firstPet = JSON.parse(data)[1];
        res.send(firstPet);
    })
});

app.get('/pets/:id/', (req, res, next) => {
    const id = parseInt(req.params.id);
    if (`!/pets/:id/`) {
        res.status(404);
        throw new Error("Not fucking found");
    };

    fs.readFile('./assets.pets.json', (err, data, next) => {
        const allPets = JSON.parse(data);
        res.json(allPets[id]);
    });

});

app.post('/pets', (req, res, next) => {

    fs.appendFile('./assets/pets.json', URL.push(req.body), (err, next) => {
        // parsedEntry = JSON.parse(req.body);
        console.log(req.body);
        // response = {
        //     name:req.body.name,
        //     age:req.body.age,
        //     kind:req.body.kind
        // };
        res.send(req.body);
    });
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(404).send("Not found, my guy!");
});




// listen on a port
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});