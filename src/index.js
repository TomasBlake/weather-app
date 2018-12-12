import React from 'react'
import reactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer,compose(applyMiddleware(thunkMiddleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

reactDOM.render(<BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>, document.getElementById('root'));