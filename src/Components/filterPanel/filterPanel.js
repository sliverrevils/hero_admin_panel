
import './filterPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { filerClick } from './filterSlice';

import { TransitionGroup, Transition } from 'react-transition-group';
import {selectAll,setSearch} from './filterSlice';


const FilterPanel = () => {

    const dispatch = useDispatch();

    const { activeFilters } = useSelector(({ filtersReducer }) => filtersReducer);

    const filtersArr=useSelector(selectAll);
    
    const styleBtn = filter =>
        activeFilters.includes(filter)
            ? ({ backgroundColor: 'black', color: 'white' })
            : (filtersArr.length === 0 && filter === 'all') ? ({ backgroundColor: 'black', color: 'white' }) : ({ backgroundColor: 'white', color: 'black' });

    const createButton = filter =>
        <Transition key={filter.name} timeout={200}>
            <button
                onClick={e => dispatch(filerClick(e.target.innerText))}
                style={styleBtn(filter.name)}
                >
                {filter.name}
            </button>
        </Transition>

    return (
        <div className='FilterPAnel'>

            <div className="FilterButtons">
                <TransitionGroup className={'Trans'}>
                    {filtersArr.map(createButton)}
                </TransitionGroup>
                <br />
                <label >
                    search &nbsp;
                    <input type="text" onChange={e => dispatch(setSearch(e.target.value))} />                    
                </label>
            </div>
        </div>
    )
}

export default FilterPanel;