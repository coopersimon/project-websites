export const changeSquare = (x, y, num) => ({
    type: 'CHANGE_SQUARE',
    x: x,
    y: y,
    num: num
});

export const createSudoku = (data) => ({
    type: 'CREATE_SUDOKU',
    data: data
});
