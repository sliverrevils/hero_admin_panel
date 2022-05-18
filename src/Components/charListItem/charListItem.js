

import { useId } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { delHeroRedux } from '../charList/heroesSlice';
// import useAdminPanelServices from '../../Services/AdminPanelServices';
import { elementIcons } from '../../UI/ui';
import './charListItem.css';
import { useDelHeroMutation } from '../../app/apiSlice';

const CharListItem=({name,description,element,id,i,search})=>{
    //const {delHero}=useAdminPanelServices();
    //const dispatch=useDispatch();
    const ID=useId();    

    const showName=text=>{
        
        if(search.length>0)
        return text.toLowerCase().replace(search.toLowerCase(),`<mark>${search.toUpperCase()}</mark>`).split(' ').map(([first,...other])=>[first.toUpperCase(),...other].join('')).join(' ');

        return text;
    };

    const textLength=(text)=>text.length>30?text.substring(0,49)+'...':text;
    const [delHero,{isLoading}]=useDelHeroMutation();
    return(
        
        <div key={ID} className='CharListItem'>
            <div className="CharListItem_element">{i}){elementIcons[element]}</div>
            <div className='CharListItem_close' onClick={()=>delHero(id)}>❌</div>
            {/* <div className="CharListItem_close" onClick={()=>dispatch(delHeroRedux(id))}>✖</div> */}
            <div className='CharListItem_name' ref={ref=>ref?(ref.innerHTML=showName(name)):null}>.</div>            
            <div className='CharListItem_description'><span>about:</span> {textLength(description)}</div>
        </div>
        
    )
}

export default CharListItem;