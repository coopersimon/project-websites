import React from 'react'
import './index.css'
import {NewSquareArray, CheckSudoku} from './sulib'

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        // action!
        // async dispatch? initial state needs to be set elsewhere
        /*this.state = {
            squares: NewSquareArray(9),
        };*/
        this.getSudoku();
    }

    render() {
        return (
            <div>
            <div className="su-grid">
                {this.props.squares.map((row, y) =>
                    <div className="su-row" key={y}>
                        {row.map((sq, x) =>
                            <SudokuSquare
                             value={sq.num}
                             variable={sq.variable}
                             key={(y*9 + x + 9).toString()}
                             onChange={(event) => this.props.setSquare(x,y,event.target.value)}
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

    /*handleInput(event, y, x) {
        const num = event.target.value;
        if (num.length <= 1 && !isNaN(num)) {
            // action! (dispatch)
            const squares = this.state.squares.slice();
            squares[y][x] = {num: num, variable: true};
            this.setState({
                squares: squares,
            });
        }
    }*/

    checkCorrect(event) {
        try {
            // read state!
            var sudokuVals = this.props.squares.map((row) => {
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
            /*    this.setState({
                    squares: data.sudoku.map((row) => {
                        return row.map((val) => {
                            if (val == 0) {
                                return {num: "", variable: true};
                            } else {
                                return {num: val.toString(), variable: false};
                            }
                        });
                    }),
                });*/
                this.props.setSudoku(data.sudoku);
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