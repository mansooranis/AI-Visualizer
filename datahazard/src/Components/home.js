import React from "react";
import MyDropzone from "./filedrop";
import {useSelector, useDispatch} from 'react-redux';
import Graphs from "./Graphs";
import Train from "./train";

export default function (){
    const data = useSelector(state => state.data);
    //const showm = useSelector(state => state.data.showmodels);
    
    return (
        <div className=" flex flex-col">
            <div className=" mt-11 ">
                <div className="">
                    <MyDropzone/>
                </div>
            </div>
            {data["showgraphs"]?<div><Graphs/> </div>:<></>}
            {data["shownewmodel"]?<div><Train/></div>:<></>}
        </div>
    )
}