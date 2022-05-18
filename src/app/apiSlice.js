import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice=createApi({
    //название редюсера куда будут помещены данные
    reducerPath:'api',
    //функция которая будет делать запрос, fetchBaseQuery - как fetch только имеет больше настроек 
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001'}), // базовый УРЛ   
    tagTypes:['Heroes'], // создаем тэги
    endpoints: builder=>({ //функции (как тут getHeroes ) называются ЭНДПОИНТАМИ
        //Получение героев
        getHeroes:builder.query({ // QUERY-ЗАПРОСЫ НА ПОЛУЧЕНИЕ ДАННЫХ 
            query:()=>'/heroes',
            providesTags:['Heroes'] //присваиваем тэг 
        }),
        //Добавление героя
        addHero:builder.mutation({// MUTATION -запросы на редактирование данных
            query:hero=>({
                url:'/heroes',
                method:'POST',               
                body:hero  //обект в параметре автоматически переведится в JSON
            }),
            invalidatesTags:['Heroes']//обновить данные функцией по тэгу (что бы список героев обновился и перерендрился в компонентах где отображается)
        }),
        //Удаление героя
        delHero:builder.mutation({
            query:id=>({
                url:`/heroes/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Heroes']
        })
    })
});

//Достаем готовый хук с нашим описанным эндпоинтом getHeroes
//Достаем редюсер, который надо добавить в стор 
export const {useGetHeroesQuery,reducer,useAddHeroMutation,useDelHeroMutation}=apiSlice; 