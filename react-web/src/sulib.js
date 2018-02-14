// Checks array has numbers 1-9 in it
function CheckComplete(arr) {
    arr.sort();
    for (var i = 0; i < 9; i++) {
        if (arr[i] != i + 1) {
            return false;
        }
    }
    return true;
}

function CheckSet(sudoku, access) {
    for (var i = 0; i < 9; i++) {
        var row = new Array(9);
        for (var j = 0; j < 9; j++) {
            row[j] = access(sudoku, i, j);
        }
        if (!CheckComplete(row)) {
            return false;
        }
    }
    return true;
}

function CheckSudoku(sudoku) {
    return CheckSet(sudoku, (s, i, j) => {
            return sudoku[i][j];
        }) &&
        // col
        CheckSet(sudoku, (s, i, j) => {
            return sudoku[j][i];
        }) &&
        // box
        // i 00, 30, 60, 03, 33, 63, 06, 36, 66
        // j 00, 10, 20, 01, 11, 21, 02, 12, 22
        CheckSet(sudoku, (s, i, j) => {
            var x = ((i * 3) % 9) + (j % 3);
            var y = ((i / 3) * 3) + (j / 3);
            return sudoku[x][y];
        });
}

export default CheckSudoku
