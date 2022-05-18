
import { createAction } from "@reduxjs/toolkit";


export const fatchLoading=createAction('FATCH_LOADING'); //STRING-WITH MY STORE-DISPATCH ENHANCER || MIDDLEWARE
//export const fatchLoading=()=>({type:'FATCH_LOADING'});
//export const fatchLoading=()=>'FATCH_LOADING'; //STRING-WITH MY STORE-DISPATCH ENHANCER || MIDDLEWARE

export const fatchLoaded=createAction('FATCH_LOADED');
// export const fatchLoaded=()=>(dispatch)=>{ //USING THUNK
//     setTimeout(()=>{
//         console.log(' PAUSE ON LOADING STATUS WITH USING THUNK')
//         dispatch({type:'FATCH_LOADED'});
//     },2000)
   
// };

export const fatchLoadingError=createAction('FATCH_ERROR');
//export const fatchLoadingError=()=>({type:'FATCH_ERROR'});


//export const addHeroes=arr=>({type:'LOAD_HEROES',payload:arr});
export const addHeroes=createAction('LOAD_HEROES');
//export const delHeroRedux=(id)=>({type:'DEL_HERO',payload:id});
export const delHeroRedux=createAction('DEL_HERO');


export const addFilters=arr=>({type:'LOAD_FILTERS',payload:arr});
export const filerClick=filter=>(dispatch)=>{
    console.log('FILTER CHANGE - LOG MESSAGE WITH USING THUNK');
    dispatch({type:'CLICK_FILTER',payload:filter});
};

export const fetchHeroes=(request)=>(dispatch)=>{ // USING THUNK
    dispatch(fatchLoading());
    request('http://localhost:3001/heroes')
    .then(data=>dispatch(addHeroes(data)))
    .catch(()=>dispatch(fatchLoadingError()))
}

export const fetchFilters=(request)=>(dispatch)=>{
   //dispatch(fatchLoading());
   request('http://localhost:3001/filters')
   .then(data=>dispatch(addFilters(data)))
   .catch(()=>dispatch(fatchLoadingError()))
}
