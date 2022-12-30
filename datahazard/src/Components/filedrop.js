import React, {useCallback} from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

export default function MyDropzone() {

  const uploadfile = async (files) => {
    console.log(files[0]);
    try{
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //console.log(response);
    }catch(err){
      console.log(err);
    }
  
  }

  return (
    <Dropzone onDrop={acceptedFiles => uploadfile(acceptedFiles)}>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} className=" border-2 border-dashed h-52 flex items-center justify-center bg-slate-50 text-gray-600 font-light hover:cursor-pointer">
          <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        )}
    </Dropzone>
  )
}