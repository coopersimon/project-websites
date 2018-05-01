//import Hello from './hello';
import Sudoku from './containers/sudoku';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <Sudoku/>
    </Provider>,
    document.getElementById('app')
);
