import React, {useCallback, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Papa from "papaparse";
import Table from 'react-bootstrap/Table';
import Modeling from './Modeling';
import { useSelector, useDispatch } from 'react-redux';
import { setshownewmodel, setdatavalues, setselectedcols, setfile} from "../feature/data/dataSlice";
const d3 = require('d3');

export default function MyDropzone() {
  const dispatch = useDispatch();
  const [columns, setColumns] = React.useState([]);
  const [showcols, setShowcols] = React.useState();
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  //const statedata = useSelector(state => state.data);
  const [filename, setFilename] = React.useState();
  
  const onSelect = async (e)=>{
    //console.log(e.target.value);
    const value = e.target.value;
    selected.push(value)
    //console.log(selected)
  }

  React.useEffect(() => {
    const mappedcols = columns.map((column,key) => {
      return (<tr>
                <td>{column}</td>
                <td><div>
                      <input id = {key} type="checkbox" value={column} onChange={onSelect}/>
                    </div>
                </td>
                <td>{data[0][column]}</td>
              </tr>)})
    setShowcols(mappedcols);
    
  }, [columns]);
  const onDrop = async (files) => {
    const reader = new FileReader()
    dispatch(setfile(files));
    setIsFileUploaded(true);
    setFilename(files[0].name);
    console.log(files[0].name);
    reader.onload =  ({target}) => { 
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setData(parsedData);
      dispatch(setdatavalues(parsedData));
      //console.log(parsedData)
      const ccolumns = Object.keys(parsedData[0]);
      setColumns(ccolumns);
      const mappedcols = columns.map((column, key) => {(<tr>
        <td>{column}</td>
        <td><div>
              <input id = {key} type="checkbox" value={column} onChange={onSelect}/>
            </div>
        </td>
        <td>{data[0][column]}</td>
      </tr>)})
      setShowcols(mappedcols);
      
    };
    reader.readAsText(files[0])
    //console.log(columns)
    
  }
  const onGenerate = React.useCallback(() => {
    dispatch(setselectedcols(selected));
    dispatch(setshownewmodel(true));
    //console.log(columns);
  }, []);
  return (
    <div className='flex flex-col justify-center items-center'>
      <Dropzone onDrop={acceptedFiles => {onDrop(acceptedFiles)}}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} className=" h-[300px] w-[70%] border-2 border-dashed  flex items-center justify-center bg-slate-50 text-gray-600 font-light hover:cursor-pointer">
            <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          )}
      </Dropzone>
      {isFileUploaded?
      <div className='text-left mt-3'> <text className=''>File Selected: {filename}</text>
      <div className='flex flex-row flex-wrap'>
        <div className='mt-5 pl-10 pr-10 text-sm self-start text-left font-medium'>
          <text className=' text-base'>Define Model:</text>
          <Table bordered hover responsive size="sm" className='mt-4'>
            <thead className=' text-base'>
              <tr>
                <th>Field</th>
                <th>Include</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
                {showcols}
                <tr>
                  <td className = "hover:cursor-pointer text-blue-500" colSpan={3} onClick ={() => {onGenerate() }}> Create Model </td>
                </tr>
            </tbody>
          </Table>
        </div>
        <Modeling columns = {columns} />
      </div></div>:<></>
    }
    </div>
  )
}