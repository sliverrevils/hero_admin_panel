import { createSlice, nanoid ,createAsyncThunk,createEntityAdapter} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// const initState =
// {
//     heroesLoadingStatus:'loading',
//     heroes: []
// }

//------------------------------ENTITY ADAPTER--------------------!!!
const heroesAdapter=createEntityAdapter();//в параметрах можно указать поле индификатора(если оно не id) и алгоритм сортировки сущностей


//получаем начальный стэйт из метода адаптера
const initStateAdaptsrs=heroesAdapter.getInitialState({ 
    //можем добавлять поля которые не будут относиться к списку сущностей
    heroesLoadingStatus:'loading'   
});

export const fetchHeroes=createAsyncThunk( //Вернет 3 экшен криэйтора
    'heroes/fetchHeroes',
    async (_,{dispatch})=>{            
        return await fetch('http://localhost:3001/heroes').then(data=>data.json()); //функция должна возвращать промис
    }
);

const heroesSlice=createSlice(
    {
        name:'heroes',
        initialState:initStateAdaptsrs,//ставим начальным стэйт адаптера
        reducers:{
            //ДОБАВЛЯЕМ ИСПОЛЬЗУЯ МЕТОДЫ АДАПТЕРА (ДОПИСЫВАЕМ ID К ОБЪЕКТУ ДАННЫХ С ФОРМЫ )
            addHeroRedux:(state,action)=>{heroesAdapter.addOne(state,{...action.payload,id:nanoid()})}, 
            //УДАЛЯЕМ           
            delHeroRedux:(state,action)=>{heroesAdapter.removeOne(state,action.payload)}          
        },
        extraReducers:(builder)=>{//добавляем через addCase все три экшена полученные createAsyncThunk (три состояния промиса)
            builder
            .addCase(fetchHeroes.pending,state=>{ //ОТПРАВКА ЗАПРОСА               
                state.heroesLoadingStatus='loading';
            })
            .addCase(fetchHeroes.fulfilled,(state,action)=>{ //УСПЕШНЫЙ ОТВЕТ                 
                //добавляем в адаптер полученный массив
                //действия выпрлняем через адаптер его методами
                //setAll- добавляет все и перезаписывает
                //первый параметр - глобальный стейт , второй - то что приходит в этот стэйт
                heroesAdapter.setAll(state,action.payload);
                state.heroesLoadingStatus='loaded';
            }) 
            .addCase(fetchHeroes.rejected,state=>{// ОШИБКА               
                state.heroesLoadingStatus='error';
            })
            .addDefaultCase(()=>{})
        }        
    }
);




const {actions,reducer}=heroesSlice;

// все функции селектора - https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions

// указываем часть стора для селектора (тоесть все функции будут обращаться сразу туда)
//ДЕСТРУКТУРИЗИРУЕМ  ФУНКЦИЮ И ЭКСПОРТИРУЕМ 
const {selectAll}=heroesAdapter.getSelectors(state=>state.heroesReducer);


export const heroFiltersCS=createSelector(
    //--------------USING ADAPTER
    //передаем функцию селектора адаптера, 
    //в нее передается глобальный стэйт
    //(state)=>selectAllFromHeroes(state),
    //ВЕРНЕТ МАССИВ 
    selectAll,
    (state)=>state.filtersReducer.activeFilters,
    (state)=>state.filtersReducer.search,
    (heroes,activeFilters,search)=>{ //параметры - результаты первых функций           
       if(heroes.length>0){                         
        const afterFilters=activeFilters.length>0?heroes.filter(hero=>activeFilters.includes(hero.element)):heroes;//after filters
        return afterFilters.filter(hero=>hero.name?.toLowerCase().includes(search.toLowerCase()));//after search 
    }
    }
)


export default reducer; 
export const {addHeroRedux,delHeroRedux,addHero}=actions;

