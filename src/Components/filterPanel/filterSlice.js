
import { createSlice , createAsyncThunk,createEntityAdapter, nanoid } from "@reduxjs/toolkit";

const filterAdapter=createEntityAdapter();

const initStateFilters=filterAdapter.getInitialState({
    filtersLoading:'loading',
    search:'',
    activeFilters:[]
})

export const fetchFilters=createAsyncThunk(
    'filters/fetchFilters',
    async()=> await fetch('http://localhost:3001/filters').then(data=>data.json())       
    
)


const filtersSlice=createSlice({
    name:'filters',
    initialState:initStateFilters,
    reducers:{
        addFilters:(state,action)=>{filterAdapter.setAll(action.payload)},
        
        filerClick:(state,{payload:clickFilter})=>{
            if(clickFilter!=='all'){
                if(state.activeFilters.includes(clickFilter)){               
                state.activeFilters=state.activeFilters.filter(el=>el!==clickFilter);}
                else{
                    state.activeFilters.push(clickFilter);}
            }else{
                state.activeFilters=[];
            }
        },
        setSearch:(state,action)=>{state.search=action.payload}

    },
    extraReducers:builder=>{
        builder
        .addCase(fetchFilters.pending,state=>{
            state.filtersLoading='loading';
        })        
        .addCase(fetchFilters.fulfilled,(state,action)=>{  
            //ADD PAYLOAD ARRAY  TO -- ADAPTER --         
            filterAdapter.setAll(state,action.payload.map(el=>({id:nanoid(),name:el})));
            state.filtersLoading='loaded';
            
        })
        .addCase(fetchFilters.rejected,state=>{
            state.filtersLoading='error';
        })
    }
});


export const {selectAll,selectById}=filterAdapter.getSelectors(state=>state.filtersReducer);

const {reducer,actions}=filtersSlice;
export default reducer;
export const {addFilters,filerClick,setSearch}=actions;
    