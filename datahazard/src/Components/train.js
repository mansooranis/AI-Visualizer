import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import ReactSlider from 'react-slider';
import Highlight from 'react-highlight'
import "./slider.css";
import axios from 'axios';
export default function Train(){
    const data = useSelector(state => state.data);
    const [slidersplit, setSlidersplit] = React.useState();
    const [xarray, setXarray] = React.useState([]);
    const [y, setY] = React.useState();
    const [showresult, setShowresult] = React.useState(false);
    const [backendresult, setBackendresult] = React.useState()
    const [coef, setCoef] = React.useState();
    
    const onSubmit =  React.useCallback (async ()=>{
        console.log(slidersplit);
        console.log(xarray);
        console.log(y)
        const object = {
            trainamt: slidersplit, xarray: xarray, y: y
        }
        try{
            const formData = new FormData();
            formData.append('file', data["file"][0]);
            const blob = new Blob([JSON.stringify(object)], {type: 'application/json'});
            formData.append('traindata', blob);
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setBackendresult(response.data);
            setShowresult(true);
            const c = response.data["coef"].map((item,index)=>{return <div>{xarray[index]} : {item}</div>})
            //console.log(c)
            setCoef(c);

        }catch(err){
        console.log(err);
        }
    })
    useEffect(() => {}, [xarray]);
    return (
        <div className='ml-16 mt-5 h-80 flex flex-col'>
            <div className='text-left mt-4'>Select the split ( train [{slidersplit}%] :  test [{100-slidersplit}%] ) ratio: </div>
            <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track"
                thumbClassName="customSlider-thumb"
                onChange={(change) => setSlidersplit(change)}  
        />
            <div className='text-left mt-16'>Select explanatory variables (x-axis): </div>
            <Select className='w-[500px] mt-1' isMulti options = {data["selectedcols"].map((item)=>{return {value:item, label:item}})} onChange={(change)=>{setXarray(change.map((item)=>{return item.value}))}}/>

            <div className='text-left mt-4'>Select response variable (y-axis): </div>
            <Select className='w-[500px] mt-1 z-100' options = {data["selectedcols"].map((item)=>{return {value:item, label:item}})} onChange={(change)=>setY(change.value)}/>

            <div className='text-left mt-3'>
                <button className=' border w-[100px] text-gray-500' onClick={onSubmit}>Train Data</button>
            </div>
            {showresult? <div className='text-left mt-3'>
                <div className='mt-3'><h3>Results</h3></div>
                <div>SSE: {backendresult["SSE"][0]}</div>
                <div>Intercept: {backendresult["intercept"][0]}</div>
                <div className='mt-1'>Coefficients:</div>
                <div>{coef}</div>
                <div className='mt-2'>Code:</div>
                <div className=' bg-gray-100 w-[55%] h-[500px] rounded-md mt-2'>
               <Highlight className="language-python">
                    {                    `
 import pandas as pd
 import numpy as np
 from sklearn import linear_model

 f = open("csv_file.csv")
 df = pd.read_csv(f)
 cdf = df[[${xarray.map((item)=>{return "'"+item+"'"})},'${y}']]
 msk = np.random.rand(len(df)) < ${slidersplit * 0.01}

 train = cdf[msk]
 test = cdf[~msk]

 regr = linear_model.LinearRegression()
 train_x = train[${xarray.map((item)=>{return "'"+item+"'"})})}]
 train_y = train[['${y}']]
 regr.fit(train_x,train_y)

 x = test[${xarray.map((item)=>{return "'"+item+"'"})}]
 y = test[['${y}']]

 y_pred = regr.predict(test[${xarray.map((item)=>{return "'"+item+"'"})}])
 SSE = np.mean((y_pred - y)**2)




`

}
</Highlight>
</div>
                    
            </div>:
            <></>}
        </div>
    )
}