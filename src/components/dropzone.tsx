import React from 'react'
import {useDropzone} from 'react-dropzone'

export function MyDropzone() {
  const {getInputProps} = useDropzone()

  return (
    <div>
      <input {...getInputProps()} />
      <p>Drag n drop some files here, or click to select files</p>
    </div>
  )
}