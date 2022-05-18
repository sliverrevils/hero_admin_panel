import {fatchLoaded,fatchLoading,fatchLoadingError} from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const initState =
{
    fatchLoading: 'loading'
}
const fetchReducer = createReducer(initState, {
    [fatchLoading]: state => { state.fatchLoading = 'loading'; },
    [fatchLoaded]: state => { state.fatchLoading = 'loaded'; },
    [fatchLoadingError]: state => { state.fatchLoading = 'error'; }
},
    [],//функции сравнения- НЕ РАССМАТРИВАЛИСЬ
    state => state //ПО УМОЛЧАНИЮ
)



// const fetchReducer = (state = initState, action) => {
//     const funcs = {
//         'FATCH_LOADING': () => ({ ...state, fatchLoading: 'loading' }),
//         'FATCH_LOADED': () => ({ ...state, fatchLoading: 'loaded' }),
//         'FATCH_ERROR': () => ({ ...state, fatchLoading: 'error' }),

//         'TEST':()=>{
//             alert(JSON.stringify(action.payload,null,2));
//             return state;
//         }
//     }
//     if (action.type in funcs)
//         return funcs[action.type]();
//     else
//         return state;
// }

export default fetchReducer;