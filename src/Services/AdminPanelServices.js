
import { useDispatch } from 'react-redux';
import useHttp from '../Hooks/http.hook';
import { fatchLoaded, fatchLoading } from '../Redux/actions';
import { delHeroRedux,addHeroes } from '../Components/charList/heroesSlice';

import { addFilters } from '../Components/filterPanel/filterSlice';



const useAdminPanelServices=()=>{

    const {status,request,clearError} =useHttp();
    const dispatch=useDispatch();

    //--------------------------------------HEROES

    // GET HEROES FROM SERVER TO REDUX STATE
    // const getHeroes=()=>request('http://localhost:3001/heroes')
    // .then(heroes=>dispatch(addHeroes(heroes)));    

    //ADD TO SERVER
    const addHero = value => {
        console.log(JSON.stringify(value, null, 2));
        fetch('http://localhost:3001/heroes',
            {
                body: JSON.stringify(value),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }).then(()=>{
              //  getHeroes();                
            });
        ;
    }

    //DELETE FROM SERVER AND REDUX
    const delHero=(id)=>{
        console.log('DELETE -' +id);
        dispatch(fatchLoading());
        fetch('http://localhost:3001/heroes/'+id,
        {            
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(()=>{
            //getHeroes(); 
            dispatch(fatchLoaded());
            dispatch(delHeroRedux(id));                
        });
    }
    //-------------------------------------FILTERS
    const getFilters=()=>request('http://localhost:3001/filters').then(filters=>dispatch(addFilters(filters)));

    






    return {/* getHeroes */addHero,getFilters,delHero}
}

export default useAdminPanelServices;