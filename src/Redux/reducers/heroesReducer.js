import { createReducer } from "@reduxjs/toolkit";

import {addHeroes,delHeroRedux} from '../actions';


const initState =
{
    heroes: []
}

//!!!!--createReducer требует , что бы все экшены были созданы с createAction---!!!!
const heroesReducer=createReducer(initState,builder=>{
    builder
    .addCase(addHeroes,(state,action)=>{//иммутабельность сохраняется автоматически 
        state.heroes=action.payload; //можно обращаться напрямую к нужному полю, НО ПРИ ЭТОМ ФУНКЦИЯ НИЧЕГО ВОЗВРАЩАТЬ НЕ ДОЛЖНА
    })//если в функции будет return то об иммутабельности надо заботиться самому
    .addCase(delHeroRedux,(state,action)=>{
        state.heroes=state.heroes.filter(({id})=>id!==action.payload)
    })
    .addDefaultCase(()=>{})//то что вызвется когда не неайден экшен. Стэйт останентся таким же.Обычно пишут просто пустую функцию
})



// const heroesReducer = (state = initState, action) => {
//     const funcs = {
//         'LOAD_HEROES': () => ({ ...state, heroes: action.payload }),

//         'DEL_HERO': () => {
//             const filterArr = state.heroes.filter(hero => hero.id !== action.payload)
//             return { ...state, heroes: filterArr }
//         }
//     }
//     if (action.type in funcs)
//         return funcs[action.type]();
//     else
//         return state;
// }

export default heroesReducer;