// let standardError = console.error(new Error('Usage: node pets.js [read | create | update | destroy]'));

let fs = require('fs');

// let { exit, argv } = require('node:process');

let command = process.argv[2];
let choice = process.argv[3];

if (command === 'read' && choice === undefined) {
    fs.readFile('pets.json', function (error, data) {
        if (error) {
            console.error(error);
            process.exit(1);
            // throw new Error('Usage: node pets.js [read | create | update | destroy]')
        } else {
            console.log(data.toString());
        }
    });
};

if (choice === '0') {
    fs.readFile('pets.json', function (error, data) {
        if (error) {
            console.log(error);
            exit(1);
        } else {
            console.log(JSON.parse(data)[0]);
            if (choice >= 1) {
                console.error('Usage: node pets.js [read | create | update | destroy]');
                process.exit(1);
            }
        }
    });
};

if (choice === '1' || !choice) {
    fs.readFile('pets.json', function (error, data) {
        if (error) {
            console.log('Usage: node pets.js read INDEX');
            exit(1);
        } else {
            console.log(JSON.parse(data)[1]);
        }
    });
};