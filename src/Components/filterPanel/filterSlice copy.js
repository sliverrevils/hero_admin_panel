
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";


const initialState=
    {      
        filtersLoading:'loading',         
        filters:[],
        activeFilters:[]
    };


export const fetchFilters=createAsyncThunk(
    'filters/frtchFilters',
    async()=>{
        return await fetch('http://localhost:3001/filters').then(data=>data.json());
    }
)


const filtersSlice=createSlice({
    name:'filters',
    initialState,
    reducers:{
        addFilters:(state,action)=>{state.filters=action.payload},
        filerClick:(state,{payload:clickFilter})=>{
            if(clickFilter!=='all'){
                if(state.activeFilters.includes(clickFilter)){               
                state.activeFilters=state.activeFilters.filter(el=>el!==clickFilter);}
                else{
                    state.activeFilters.push(clickFilter);}
            }else{
                state.activeFilters=[];
            }
        }

    },
    extraReducers:builder=>{
        builder
        .addCase(fetchFilters.pending,state=>{
            state.filtersLoading='loading';
        })        
        .addCase(fetchFilters.fulfilled,(state,action)=>{
            state.filters=action.payload;
            state.filtersLoading='loaded';
        })
        .addCase(fetchFilters.rejected,state=>{
            state.filtersLoading='error';
        })
    }
});

const {reducer,actions}=filtersSlice;

export default reducer;
export const {addFilters,filerClick}=actions;
    