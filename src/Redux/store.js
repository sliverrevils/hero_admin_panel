//import { createStore, combineReducers, compose, applyMiddleware } from "@reduxjs/toolkit";
//import heroesReducer from "./reducers/heroesReducer";
import heroesReducer from "../Components/charList/heroesSlice";
import fetchReducer from "./reducers/fetchReducer";
import filtersReducer from "../Components/filterPanel/filterSlice";
//import ReduxThunk from 'redux-thunk';

import { configureStore } from "@reduxjs/toolkit";

// MIDDLEWARE
//next - это dispatch
const stringMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string')
        return next({ type: action });
    else
        return next(action);
}

//----------------------CRIATING STORE WITH TOOLKIT configureStore ---- CURRENT VERSION----------------
export const store=configureStore({
    reducer:{heroesReducer, fetchReducer, filtersReducer},//передаем редюсеры
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(stringMiddleware),//getDefaultMiddleware - массив встроенных мидлваров(ReduxThunk уже там), который мы дополняем своим 
    devTools:process.env.NODE_ENV!=='production',// подключает DEVTOOLS только на этапе разработки
    
})

//----------------------CRIATING STORE WITH createStore  --------- OLD VERSION---------------------------

// //COSTOM STORE ENHANCER
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({ type: action });
//         }
//         return oldDispatch(action);

//     }
//     return store;
// }


// export const store = createStore(
//     combineReducers({ heroesReducer, fetchReducer, filtersReducer }),
//     // USING MIDDLEWARE DISPATCH-STRING & REDUXTHUNK
//     compose(
//         applyMiddleware(ReduxThunk,stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

//     // // USING ENCHANCER DISPATCH-STRING UPDATE
//     // //USING COMPOSE TO COMBO FUNCS ON PROPS
//     // compose(enhancer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );






