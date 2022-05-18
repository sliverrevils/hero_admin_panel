import { createStore, combineReducers, compose, applyMiddleware } from "@reduxjs/toolkit";
import heroesReducer from "./reducers/heroesReducer";
import fetchReducer from "./reducers/fetchReducer";
import filtersReducer from "./reducers/filterReducer";
import ReduxThunk from 'redux-thunk';

// MIDDLEWARE
//next - это dispatch
const stringMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string')
        return next({ type: action });
    else
        return next(action);
}



//COSTOM STORE ENHANCER
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({ type: action });
        }
        return oldDispatch(action);

    }
    return store;
}

//----------------------CRIATING STORE WITH createStore  -- OLD VERSION

export const store = createStore(
    // // USING ENCHANCER DISPATCH-STRING UPDATE
    // //USING COMPOSE TO COMBO FUNCS ON PROPS

    combineReducers({ heroesReducer, fetchReducer, filtersReducer }),
    // USING MIDDLEWARE DISPATCH-STRING & REDUXTHUNK
    compose(
        applyMiddleware(ReduxThunk,stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )   
    
);

