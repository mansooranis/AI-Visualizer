import React from "react";
import MyDropzone from "./filedrop";
import {useSelector, useDispatch} from 'react-redux';

export default function (){
    const showg = useSelector(state => state.data.showgraps);
    const showm = useSelector(state => state.data.showmodels);

    React.useEffect(() => {
        showg?console.log("showg"):console.log("hideg");
    }, [showg]);
    
    return (
        <div className=" flex flex-col">
            <div className=" mt-11 ">
                <div className="">
                    <MyDropzone/>
                </div>
            </div>
            {showg?<div>hello</div>:<></>}
            {showm?<div></div>:<></>}
        </div>
    )
}