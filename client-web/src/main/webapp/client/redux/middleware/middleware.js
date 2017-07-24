import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const errorHandler = (store) => (next) => (action) => {
    try {
        return next(action);
    } catch(e) {
        console.log("ERROR!", e);
    }
};

const middleware = applyMiddleware(promise(), thunk, createLogger(), errorHandler)

export default middleware;