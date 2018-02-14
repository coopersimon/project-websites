import React from 'react'
import './index.css'
import CheckSudoku from './sulib'

function NewSquareArray(size) {
    var array = new Array(size);

    for (var i = 0; i < size; i++) {
        array[i] = new Array(size);
        array[i].fill({num: "", variable: true});
    }

    return array;
}

// static: should either generate or read from database
function NewSudoku() {
    var init = NewSquareArray(9);

    init[4][0] = {num: "5", variable: false};
    init[6][0] = {num: "6", variable: false};
    init[7][0] = {num: "2", variable: false};
    init[8][0] = {num: "7", variable: false};
              
    init[2][1] = {num: "6", variable: false};
    init[3][1] = {num: "9", variable: false};
    init[8][1] = {num: "1", variable: false};
              
    init[0][2] = {num: "7", variable: false};
    init[1][2] = {num: "4", variable: false};
    init[2][2] = {num: "2", variable: false};
    init[3][2] = {num: "6", variable: false};
              
    init[0][3] = {num: "5", variable: false};
    init[3][3] = {num: "1", variable: false};
              
    init[2][4] = {num: "9", variable: false};
    init[3][4] = {num: "3", variable: false};
    init[4][4] = {num: "4", variable: false};
    init[5][4] = {num: "2", variable: false};
    init[6][4] = {num: "5", variable: false};
              
    init[5][5] = {num: "9", variable: false};
    init[8][5] = {num: "2", variable: false};
              
    init[5][6] = {num: "4", variable: false};
    init[6][6] = {num: "8", variable: false};
    init[7][6] = {num: "5", variable: false};
    init[8][6] = {num: "6", variable: false};
              
    init[0][7] = {num: "4", variable: false};
    init[5][7] = {num: "6", variable: false};
    init[6][7] = {num: "1", variable: false};
              
    init[0][8] = {num: "1", variable: false};
    init[1][8] = {num: "6", variable: false};
    init[2][8] = {num: "7", variable: false};
    init[4][8] = {num: "3", variable: false};

    return init;
}

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: NewSquareArray(9),
        };
        this.getSudoku();
    }

    render() {
        return (
            <div>
            <div className="su-grid">
                {this.state.squares.map((row, y) =>
                    <div className="su-row" key={y}>
                        {row.map((sq, x) =>
                            <SudokuSquare
                             value={sq.num}
                             variable={sq.variable}
                             key={(y*9 + x + 9).toString()}
                             onChange={(event) => this.handleInput(event,y,x)}
                             boldLines={ {right: (y%3 === 2) && (y != 8), bottom: (x%3 === 2) && (x != 8)} }
                            />
                        )}
                    </div>
                )}
            </div>
            // if correct - generate new sudoku ?
                <button onClick={(event) => this.checkCorrect(event)}> Check! </button>
            </div>
        );
    }

    handleInput(event, y, x) {
        const num = event.target.value;
        if (num.length <= 1 && !isNaN(num)) {
            const squares = this.state.squares.slice();
            squares[y][x] = {num: num, variable: true};
            this.setState({
                squares: squares,
            });
        }
    }

    checkCorrect(event) {
        try {
            var sudokuVals = this.state.squares.map((row) => {
                return row.map((val) => {
                    return parseInt(val.num);
                });
            });
        } catch(e) {
            console.log("Error: " + e);
            return;
        }

        if (CheckSudoku(sudokuVals)) {
            console.log("Yay!");
        } else {
            console.log("Nope.");
        }
    }
    
    // gets from database
    getSudoku() {
        fetch('/sudoku')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    squares: data.sudoku.map((row) => {
                        return row.map((val) => {
                            if (val == 0) {
                                return {num: "", variable: true};
                            } else {
                                return {num: val.toString(), variable: false};
                            }
                        });
                    }),
                });
            })
            .catch((error) => console.log(error));
    }

    // check for correctness
}

class SudokuSquare extends React.Component {
    render() {
        const boldRight = this.props.boldLines.right ? "2px" : "";
        const boldBottom = this.props.boldLines.bottom ? "2px" : "";
        if (this.props.variable) {
            return (
                <div
                 className="su-square"
                 style={{borderRightWidth: boldRight, borderBottomWidth: boldBottom}}
                >
                    <input
                     type="text"
                     value={this.props.value}
                     onChange={this.props.onChange}
                     className="sq-input"
                    />
                </div>
            );
        } else {
            return (
                <div
                 className="su-square sq-input"
                 style={{borderRightWidth: boldRight, borderBottomWidth: boldBottom}}
                >
                    <b>{this.props.value}</b>
                </div>
            );
        }
    }
}

export default Sudoku
