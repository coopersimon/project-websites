import {NewSquareArray} from '../sulib';

const sudoku = (state = NewSquareArray(9), action) => {
    switch (action.type) {
        case 'CHANGE_SQUARE':
            if (action.num.length <= 1 && !isNaN(action.num)) {
                const squares = state.slice();
                squares[action.y][action.x] = {num: action.num, variable: true};
                return squares;
            } else {
                return state;
            }
        case 'CREATE_SUDOKU':
            return action.data.map((row) => {
                return row.map((val) => {
                    if (val == 0) {
                        return {num: "", variable: true};
                    } else {
                        return {num: val.toString(), variable: false};
                    }
                });
            });
        default:
            return state;
    }
}

export default sudoku
