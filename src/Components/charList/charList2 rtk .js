import { useDeferredValue, useMemo, } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import CharListItem from "../charListItem/charListItem";
import './animation.css';
import { useGetHeroesQuery } from "../../app/apiSlice";

// ------------------------------------>> WITH RTK Query <<--------------------------------------------

const CharList2=()=>{   

    //----GET DATA & STATUSES FROM SERVER
    
    const {
        data:heroes=[],//полученные данные 
        isLoading, //Первый запрос на сервер 
        isFetching,//последующие запросы        
        isError,   //Если ошибка
        isSuccess,//Успешная загрузка
        isUninitialized,// Вернет тру если запрос еще не отправлен
        error //сама ошибка
    }=useGetHeroesQuery();
    
    //----FILTER ARRA

    const {search,activeFilters}=useSelector(({filtersReducer})=>filtersReducer);

    const filteredHeroes =useMemo(()=>{
        if(heroes.length>0){                         
            const afterFilters=activeFilters.length>0?heroes.filter(hero=>activeFilters.includes(hero.element)):heroes;//after filters
            return afterFilters.filter(hero=>hero.name?.toLowerCase().includes(search.toLowerCase()));//after search 
        }
    },[heroes,activeFilters,search]);   


    //----CREATE VIEW

    //USING DEFERREDVALUE FOR OUTLAG ON SEARCH RENDER
    const defVal=useDeferredValue(filteredHeroes);
    //USE REACT-TRANSITION-GROUP FOR ANIMATION ON HEROES LIST 
    const listJSX=useMemo(()=>filteredHeroes?.length>0
    ?filteredHeroes.map(({ id, ...props },i) => <CSSTransition key={id} timeout={300} classNames='heroitem'><CharListItem  {...{...props,id,i,search}} /></CSSTransition>)
    :!isLoading&&<CSSTransition timeout={200}><h2>not found! 😭</h2></CSSTransition>
    ,[defVal])
    
    
    return (
        !isError
        ?<div className="CharList2">
            <TransitionGroup className='HeroesList'>
                {isLoading?<h3>L🕐ading</h3>:listJSX}
            </TransitionGroup>
        </div>
        :<h1>SERVER ERROR</h1>
    )
}

export default CharList2;