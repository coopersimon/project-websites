//require('marko/node-require');

const express = require('express');
const app = express();
var path = require('path');

//var sudoku = require('./src/sudoku');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));

app.get('/', (req, res) => {
    //console.log('Rendering and sending');
    //sudoku.render({}, res);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sudoku', (req, res) => {
    res.sendFile(path.join(__dirname + '/files/sudoku.json'));
});

app.listen(8081, () => {
    console.log('Started');
});
