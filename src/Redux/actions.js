
import { createAction , createAsyncThunk } from "@reduxjs/toolkit";

// LOAD FROM SLICE
import { addHeroes } from "../Components/charList/heroesSlice"; 
import { addFilters } from "../Components/filterPanel/filterSlice";


export const fatchLoading=createAction('FATCH_LOADING'); 

export const fatchLoaded=createAction('FATCH_LOADED');

export const fatchLoadingError=createAction('FATCH_ERROR');

//---------------- USING THUNK
// export const fetchHeroes=(request)=>(dispatch)=>{ 
//     dispatch(fatchLoading());
//     request('http://localhost:3001/heroes')
//     .then(data=>dispatch(addHeroes(data)))
//     .catch(()=>dispatch(fatchLoadingError()))
// }

// export const fetchFilters=(request)=>(dispatch)=>{
//    //dispatch(fatchLoading());
//    request('http://localhost:3001/filters')
//    .then(data=>dispatch(addFilters(data)))
//    .catch(()=>dispatch(fatchLoadingError()))
// }

