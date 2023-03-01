// set up dependencies
const express = require('express');
const app = express();
// express.static(root); // root, or source of the static files can also be chained with [options]
// app.use(express.static('assets'));
const fs = require('fs');
const next = require('process');
// const colors = require('colors/safe');

app.use(express.json()); 

// handle requests with routes
app.get('/pets', (req, res, next) => {
    fs.readFile('./assets/pets.json', (err, data) => {
        if (err) {
            next(err);
        };
        const allPets = JSON.parse(data);
        res.send(allPets);
    });
});

// Get pet by id (index where it sits in the array)
app.get('/pets/:id/', (req, res, next) => {
    if (err) {
        throw new Error(err);
    };
    const id = req.params.id;
    fs.readFile('./assets/pets.json', (err, data) => {
        if (err) {
            throw new Error(err);
        };
        const requestedPet = JSON.parse(data);
        res.json(requestedPet[id]);
    }); 
});

// Add a pet to array
app.post('/pets', (req, res, next) => {
    fs.readFile('./assets/pets.json', (err, data, next) => {
        console.log(req.body);
        const jsonData = JSON.parse(data);
        jsonData.push(req.body);
        fs.writeFile('./assets/pets.json', JSON.stringify(jsonData), (err) => {
            res.status(200).json(jsonData);
        });
    });
});

// Update a pet by id number
app.delete("/pets/:id", (req, res, next) => {
    // Update pet with that ID (after the colon)
});

app.patch("/pets/:id", (req, res, next) => {
    const petId = req.params.id;
    const updatedPet = req.body;
    fs.readFile('./assets/pets.json', (err, data) => {
        if (err) {
            return next(err);
        };
        const pets = JSON.parse(data);
        if (petId === -1) {
            return res.status(404).json({ message: `Pet with ID ${petId} does not exist`});
        };
        const updatedPetInfo = { ...pets[petId], ...updatedPet };
        pets[petId] = updatedPetInfo;

        fs.writeFile('./assets/pets.json', JSON.stringify(pets), (err) => {
            if (err) {
                return next(err);
            };
            res.status(200).json(updatedPetInfo);
        });

    });
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