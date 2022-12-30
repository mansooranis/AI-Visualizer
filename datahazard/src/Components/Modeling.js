import Table from "react-bootstrap/esm/Table";
import React from "react";
import DropdownList from "react-widgets/DropdownList";
import {useSelector, useDispatch} from 'react-redux';
import { setshowgraps, setshowmodes, setgraphs, setdatavalues} from "../feature/data/dataSlice";

export default function Modeling(props) {
    const [graphlist, setGraphlist] = React.useState([]);
    const [changeGraph, setChangeGraph] = React.useState(false);
    const [showGroups, setShowGroups] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [xvals , setXvals] = React.useState([]);
    const [yvals , setYvals] = React.useState([]);
    const dispatch = useDispatch();
    const graph = useSelector(state => state.data.graphs);

    const onClick = async () => {
        console.log(props.columns);
        const graphcomponent = {
            xaxis:<DropdownList data = {props.columns} onChange={(change)=>{if (xvals[id]){ xvals[id] = change; setXvals(xvals)}else{ setXvals([...xvals, change])}}}/>,
            yaxis:<DropdownList data = {props.columns} onChange={(change)=>{if (yvals[id]){ yvals[id] = change; setYvals(yvals)}else{ setYvals([...yvals, change])}}}/>
        }
        setId(id+1)
        const newlist = [...graphlist, graphcomponent];
        setGraphlist(newlist);
        console.log(graphcomponent);
        setChangeGraph(true)
    }
    
    React.useEffect(() => {
        const g = graphlist.map((graph,id) => {
            return (<tr>
                <td>{id+1}</td>
                <td className="w-[200px]">{graph.xaxis}</td>
                <td className="w-[200px]">{graph.yaxis}</td>
                <td className = " hover:cursor-pointer" onClick={
                    () => {
                        if (graphlist.length === 1){
                            setChangeGraph(false);
                        }
                        const filteredlist = graphlist.filter((item) => item !== graph);
                        setGraphlist(filteredlist);
                        const filteredx = xvals.filter((item) => item !== xvals[id]);
                        setXvals(filteredx);
                        const filteredy = yvals.filter((item) => item !== yvals[id]);
                        setYvals(filteredy);
                    }
                }>Delete</td>
            </tr>)})
        setShowGroups(g);
        dispatch(setgraphs({xaxis:xvals, yaxis:yvals}));
        console.log(graph)
    }, [graphlist]);
  return (
    <div className="mt-5 self-start">
        <text className="flex ">Generate Graphs:</text>
        <Table bordered hover responsive size="sm" className="mt-4 w-[400px]">
            <thead>
                <tr>
                    <td className = "hover:cursor-pointer w-[469px]" colSpan={4} onClick ={onClick}>+</td>
                </tr>
            </thead>
            {changeGraph?
            <>
                <thead>
                    <tr>
                        <th></th>
                        <th>x-axis</th>
                        <th>y-axis</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className=" text-sm">
                    {showGroups}
                    <tr>
                        <td className = "hover:cursor-pointer text-blue-500" colSpan={4} onClick ={() => {
                            dispatch(setshowgraps())
                            console.log("hello")
                            }}>Generate</td>
                    </tr>
                </tbody>
                </>:<></>}
        </Table>
    </div>
  )
}