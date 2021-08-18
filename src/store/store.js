import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer} from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewareArr = [thunk]
if(process.env.NODE_ENV === "development"){
    middlewareArr.push(logger);
}
const middleware = applyMiddleware(...middlewareArr);

export const store = createStore(reducer, composeWithDevTools(middleware));