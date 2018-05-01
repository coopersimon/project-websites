import { connect } from 'react-redux';
import { changeSquare, createSudoku } from '../actions';
import Sudoku from '../sudoku';

const mapStateToProps = (state) => ({
    squares: state.sudoku
});

const mapDispatchToProps = (dispatch) => ({
    setSquare: (x, y, val) => dispatch(changeSquare(x, y, val)),
    setSudoku: (data) => dispatch(createSudoku(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sudoku);
