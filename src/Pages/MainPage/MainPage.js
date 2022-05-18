import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "../../Components/addForm/addForm";
import CharList2 from "../../Components/charList/charList2 rtk ";
import FilterPanel from "../../Components/filterPanel/filterPanel";

import { BarWave, Hypnosis } from 'react-cssfx-loading';//https://react-cssfx.surge.sh/

import './MainPage.css';
import { fetchHeroes } from "../../Components/charList/heroesSlice";
import { fetchFilters } from "../../Components/filterPanel/filterSlice";
import { createSelector } from "reselect";

const MainPage = () => {
    const dispatch = useDispatch();

    const { heroesLoadingStatus } = useSelector(state => state.heroesReducer);
    
    const isLoad=useSelector(createSelector(
        state=>state.heroesReducer.heroesLoadingStatus,
        state=>state.filtersReducer.filtersLoading,
        (res1,res2)=>{
            return res1==='loading'&&res2==='loading';
        }
    ));

    //GET DATA FROM SERVER TO REDUX STATE
    useEffect(() => {      
        dispatch(fetchHeroes());
        dispatch(fetchFilters());
    }, []);


    if (heroesLoadingStatus === 'error') return <h1>SERVER ERROR </h1>
    return (
        <div className="MainPage" >

            {isLoad && <Hypnosis className="FetchLoading" key='spin' />}
            <div className="header">Hero Admin Panel</div>
          
            <FilterPanel />
            <div className="Conteiner">
                <CharList2 />
                <AddForm />
            </div>
        </div>
    )
}

export default MainPage;