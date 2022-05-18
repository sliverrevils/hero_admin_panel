

import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../Hooks/http.hook';
import './charList.css';
import { store } from '../../Redux/store';
import useAdminPanelServices from '../../Services/AdminPanelServices';
import { elementIcons } from '../../UI/ui';

const CharList=({filters,search})=>{

    const {delHero}=useAdminPanelServices();

    const [heroes,setHeroes]=useState(); //FROM REDUX
    const [list,setList]=useState();

    const id=useId();

    const {charsLoading}=useSelector(state=>state.charsLoading);

   

    const heroJSX = (char, i) => <div key={`char_${id}_${i}`} onClick={() => delHero(char.id)}>
        {char.id} : {char.name} : {elementIcons[char.element]}
    </div>;

    // ON CHANGE STORE  
    store.subscribe(()=>{     
        if(store.getState().heroes){
            setHeroes(store.getState().heroes);
        }       
    });

    // ON CHANGE HEROES || FILTERS 
    useEffect(()=>{       
        if(filters!=0){
            if(heroes?.length>0){
                let tmp=heroes.filter(hero=>filters.includes(hero.element));
                console.log('List',tmp.length===0);
                setList(tmp);
            }
        }else{
            setList(heroes);
        }
        
    },[heroes,filters]);

    // ON CHANGE SEARCH
    const defVal=useDeferredValue(search); 

    const afterSearch=useMemo(()=> 
        {               
           if(list){
               if(search!=='')
               return list.filter(hero=>hero.name.toLowerCase().includes(search.toLowerCase())).map(heroJSX);
               else
               return list.map(heroJSX);
           }
        }
    ,[defVal])    

    return (
        <div className='CharList'>            
            <div className='FiltersShow'>filters:<br/><span> {filters.length>0?filters+'':'all'}</span> </div>
            {search?afterSearch:list&&list.map(heroJSX)}
        </div>
    )

    
}

export default CharList;