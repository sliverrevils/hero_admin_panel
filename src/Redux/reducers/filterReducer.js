const initState=
    {       
        filters:[],
        activeFilters:[]
    }


const filtersReducer=(state=initState,action)=>{
    const funcs={       
        'LOAD_FILTERS':()=>({...state,filters:action.payload}),
        'CLICK_FILTER':()=>{
            if(action.payload!=='all')
            return {...state,
            activeFilters:state.activeFilters.includes(action.payload)
        ?state.activeFilters.filter(filter=>filter!==action.payload)
        :[...state.activeFilters,action.payload]}  
        else
        return {...state,activeFilters:[]}; 
    }            
    }
    if(action.type in funcs)
    return funcs[action.type]();
    else
    return state;
}

export default filtersReducer;