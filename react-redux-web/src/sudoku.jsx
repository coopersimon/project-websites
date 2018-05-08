import React from 'react'
import './index.css'
import {NewSquareArray, CheckSudoku} from './sulib'

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
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

    checkCorrect(event) {
        try {
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
                this.props.setSudoku(data.sudoku);
            })
            .catch((error) => console.log(error));
    }
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
                    <strong>{this.props.value}</strong>
                </div>
            );
        }
    }
}

export default Sudoku
