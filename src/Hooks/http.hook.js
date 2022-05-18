
import { bindActionCreators } from '@reduxjs/toolkit';
import {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux';

import * as actions from '../Redux/actions';

const useHttp=()=>{
    const [status,setStatus]=useState('idle');

    const dispatch=useDispatch();
    const {fatchLoading,fatchLoaded,fatchLoadingError}=bindActionCreators(actions,dispatch);

    const request=useCallback(async url=>{
        setStatus('loading');
        fatchLoading();
        try{
            const res= await fetch(url);
            if(!res.ok)throw new Error(`Can't Fatch ${url} ! \n Error:${res.message}`);
            setStatus('loaded');
            fatchLoaded();
            return res.json();
        }catch(e){
            setStatus('error');
            fatchLoadingError();
            console.log(e)
        }
    },[]);
    const clearError=()=>setStatus('idle');
    return {status,request,clearError}
}

export default useHttp;