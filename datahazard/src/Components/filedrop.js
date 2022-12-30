import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className=" border-2 border-dashed h-52 flex items-center justify-center bg-slate-50 text-gray-600 font-light hover:cursor-pointer">
      <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}