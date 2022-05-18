import { createSlice, nanoid ,createAsyncThunk} from "@reduxjs/toolkit";
//import useHttp from "../../Hooks/http.hook";

const initState =
{
    heroesLoadingStatus:'loading',
    heroes: []
}

//Создаеем отдельно
//в асинхронной функции в параметрах обязательно возвращаем пропис
//получаем объект с тремя экшенами (как состояния промиса)

//потом добавляем их в createSlice в поле extraReducers
//каждый экшен указаный в addCase будет выполняться на своем этапе промиса( описываем логику в функции)

//экспортируем экшены для дальнейшего использования в других файлах
export const fetchHeroes=createAsyncThunk( //Вернет 3 экшен криэйтора
    'heroes/fetchHeroes',
    async (_,{dispatch})=>{
       // const {request}=useHttp();
       
        return await fetch('http://localhost:3001/heroes').then(data=>data.json()); //функция должна возвращать промис
    }
);



const heroesSlice=createSlice(
    {
        name:'heroes',
        initialState:initState,
        reducers:{
            addHeroes:(state,action)=>{state.heroes=action.payload},
            delHeroRedux:(state,action)=>{state.heroes=state.heroes.filter(hero=>hero.id!==action.payload)},
            addHero:{
                reducer:(state,action)=>{state.heroes.push(action.payload)},//ОБНОВЛЕНИЕ СТЭЙТА ПОДГОТОВЛЕННЫЙМ prepare ПЭЙЛОАДОМ
                prepare:name=>{ //ПЕРВОНАЧАЛЬНАЯ ОБРАБОТКА ПЭЙЛОАДА
                    const id=nanoid();
                    return {payload:{id,name,description:'for test'}}
                }
            }
        },
        extraReducers:(builder)=>{//добавляем через addCase все три экшена полученные createAsyncThunk (три состояния промиса)
            builder
            .addCase(fetchHeroes.pending,state=>{ //ОТПРАВКА ЗАПРОСА
                console.log('PENDING',state);
                state.heroesLoadingStatus='loading';
            })
            .addCase(fetchHeroes.fulfilled,(state,action)=>{ //УСПЕШНЫЙ ОТВЕТ
                state.heroes=action.payload;
                state.heroesLoadingStatus='loaded';
            }) 
            .addCase(fetchHeroes.rejected,state=>{// ОШИБКА
                console.log('ERROR',state);
                state.heroesLoadingStatus='error';
            })
            .addDefaultCase(()=>{})
        }
        
    }
);

const {actions,reducer}=heroesSlice;

export default reducer; 
export const {addHeroes,delHeroRedux,addHero}=actions;

