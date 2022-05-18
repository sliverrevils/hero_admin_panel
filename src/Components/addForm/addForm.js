import { Formik,Form,Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import useAdminPanelServices from "../../Services/AdminPanelServices";
import { elementIcons } from "../../UI/ui";
import {v4 as uuid} from 'uuid';
import './addForm.css';
import { addHeroRedux } from "../charList/heroesSlice";
import { selectAll } from "../filterPanel/filterSlice";

const AddForm = () => {

    const {addHero}=useAdminPanelServices();
    const ID=useId();

    const [elements,setElements]=useState(); // menu options

    // store.subscribe(()=>{ // add filters after his load
    //     setElements(store.getState().filtersReducer.filters?.filter(el=>el!='all'));
    // });

    const filtersArr=useSelector(selectAll);
    useEffect(()=>setElements(filtersArr.filter(el=>el.name!='all')),[filtersArr])
    
    const dispatch=useDispatch();    

    return (
        <div className="AddForm">
            <Formik
                initialValues={{ name: '', description: '', element: 'earth'}}
                validationSchema={Yup.object({
                    name: Yup.string().min(3, 'Min 3').max(10, 'MAx 10').required('Enter name!'),
                    description: Yup.string().max(30, 'Max 30').min(5, 'Min 5').required('Must type description')
                    
                })}                
                onSubmit={(value,{resetForm})=>{
                    dispatch(addHeroRedux(value));
                    addHero({...value,id:uuid()});//ADD TO SERVER
                    resetForm();
                }}
            >
                <Form className="Formik">
                    <Field id='name' name='name' type='text' placeholder='Name'/>
                    <ErrorMessage name='name' component='div'/>

                    <Field id='description' name='description' type='textarea' placeholder="Description" as='textarea'/>
                    <ErrorMessage name='description' component='div'/>
                                    
                    <Field id="element" name="element" component="select" >
                        {elements&&elements.map(({name},i)=><option key={ID+i}  value={name}>{ name+elementIcons[name]}</option>)}
                    </Field>
                    <ErrorMessage name='element' component='div'/>
                    <button type="submit" >Add Char</button>
                </Form>

            </Formik>
        </div>
    )
}


export default AddForm;