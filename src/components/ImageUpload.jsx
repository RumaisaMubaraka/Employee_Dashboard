import React, { useState } from 'react'

const ImageUpload = () => {
    const [file, setFile] = useState("");

    const handleFile = (e) => {

        setFile(e.target.files[0])
    }

    const handleUpload = () => {
        
    }
  return (
    <div className='container'>
        <input type="file" onChange={handleFile}/>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload