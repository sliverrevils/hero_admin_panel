import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import CharListItem from "../charListItem/charListItem";
import {createSelector} from 'reselect';
import './animation.css';

import {selectAll as selectAllFromHeroes} from './heroesSlice'; //функция адаптера 
import { heroFiltersCS } from "./heroesSlice";
// WITHOUT STATE AND USE CREATESELECTOR

const CharList2=()=>{      
        
    const filteredHeroes=useSelector(heroFiltersCS);
    
    const {fatchLoading}=useSelector(({fetchReducer})=>fetchReducer);

    const {search}=useSelector(({filtersReducer})=>filtersReducer);
    
    
    //USING DEFERREDVALUE FOR OUTLAG ON SEARCH RENDER
    const defVal=useDeferredValue(filteredHeroes);
    //USE REACT-TRANSITION-GROUP FOR ANIMATION ON HEROES LIST 

    const listJSX=useMemo(()=>filteredHeroes?.length>0
    ?filteredHeroes.map(({ id, ...props },i) => <CSSTransition key={id} timeout={300} classNames='heroitem'><CharListItem  {...{...props,id,i,search}} /></CSSTransition>)
    :fatchLoading!=='loading'&&<CSSTransition timeout={200}><h2>not found! 😭</h2></CSSTransition>
    ,[defVal])
    

    return (
        <div className="CharList2">
            <TransitionGroup className='HeroesList'>
                {listJSX.length>0?listJSX:' '}
            </TransitionGroup>

        </div>
    )
}

export default CharList2;