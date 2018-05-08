import Sudoku from './containers/sudoku.js';

//var sudoku = require('./sudoku.marko');
var prov = require('./app.marko');

var el = prov.renderSync({}).appendTo(document.body);
Sudoku.renderSync({}).appendTo(el);
