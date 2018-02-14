const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/files'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sudoku', (req, res) => {
    res.sendFile(path.join(__dirname + '/files/sudoku.json'));
});

app.listen(8081, () => {
    console.log('Started');
});
