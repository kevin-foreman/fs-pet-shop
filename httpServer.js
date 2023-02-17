'use strict';

const http = require('http');

const fs = require('fs');

const port = process.env.PORT || 8000;

const server = http.createServer( (request, response) => {

    const URL = request.url;

    const method = request.method;

    console.log(URL);

    if (request.method === 'GET' && request.url == '/pets') {
        fs.readFile("./pets.json", "utf8", function (err, data) {
            const allPets = JSON.parse(data);
            console.log("parsedDataArray", allPets);
            const parsedDataArray = JSON.parse(data);
            console.log("parsedDataArray", parsedDataArray);
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.end(JSON.stringify(allPets));
        });
    } else {
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end('404 Not Found');
    }

   
});

server.listen(port, () => {
    console.log(`Listeneing on port, ${port}`);
});