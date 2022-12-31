import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setshownewmodel, setdatavalues, setselectedcols, setfile, setgraphs} from "../feature/data/dataSlice";
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Graphs(props){
    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    const data = useSelector(state => state.data);
    const datavalues = data.datavalues;
    //console.log(datavalues);
    
    const [graphs, setGraphs] = React.useState();
    
    React.useEffect(
        () => {
            const array_of_graph_data = data["graphs"]["xaxis"].map((item, index) =>{
                return datavalues.map((value) => {
                    return {x: value[item], y: value[data["graphs"]["yaxis"][index]]};
                })
            })
            //console.log(data["graphs"]["xaxis"])
            //console.log(array_of_graph_data,"hello")
            //console.log(data)
            //console.log("hello")
            const graphsdata = array_of_graph_data.map((item, index) => {
                return {
                    datasets:[
                        {
                            label: data["graphs"]["xaxis"][index],
                            data: item,
                        }
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
            }})
            //console.log(graphsdata)
            const graph = graphsdata.map((item) => {
                return <Scatter className='m-3' options={options} data={item} />
            })
            setGraphs(graph)
        },[],
    )
    return (
        <div className='h-[350px] flex flex-row flex-wrap justify-center mt-2'>
            {graphs?graphs:<></>}
        </div>
    )
}