import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import CharListItem from "../charListItem/charListItem";

import {createSelector} from 'reselect';

import './animation.css';

import {v4 as uuid} from 'uuid'


const CharList2=({filters,search})=>{
    const [list,setList]=useState([]);

    const {heroes}=useSelector(({heroesReducer})=>heroesReducer);
      

    //FILTER HEROES
    const filterHEroes=()=>{
        if(heroes.length>0){
           const afterFilters=filters.length>0?heroes.filter(hero=>filters.includes(hero.element)):heroes;
           const afterSearch=afterFilters.filter(hero=>hero.name.toLowerCase().includes(search.toLowerCase()));            

           setList(afterSearch);
        }else{
            setList(heroes);
        }        
    };   
    //ON CHANGE FILTERS OR HEROES LIST 
    useEffect(() => {
       filterHEroes();
    }, [filters,search,heroes]);

    //DEFFERENT VALUE SEARCH
    const defVal=useDeferredValue(list);
    //FINAL JSX LIST
    const cont = useMemo(() => list.map(({id, ...props }) => (
        <CSSTransition key={id} timeout={300} classNames='heroitem'>
            <CharListItem {...{...props,id}} />
        </CSSTransition>))
        , [defVal]);

    
    return(
        <div className="CharList2">   
        <TransitionGroup className={'TranceGroup'}>        
            {cont}
            </TransitionGroup>            
        </div>
    )
}

export default CharList2;