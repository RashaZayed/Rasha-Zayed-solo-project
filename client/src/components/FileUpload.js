import React, { Fragment , useState } from 'react'
import axios from  'axios'
export default()=> {
    const [file , setFile]=useState('');
    const [filename , setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    
    const onChangeHandler = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    const onSubmitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file' , file);
        try {
            const res = await axios.post('http://localhost:8000/api/upload' , formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName , filePath} = res.data;
            setUploadedFile({fileName , filePath});
        } catch(err){
            if(err.response.status === 500){
                console.log('there was a problem with the server');
            }else {
                console.log(err.response.data.message)
            }
        }


    }
    return(
        <Fragment>
            <form onSubmit={onSubmitHandler}>
                <input type='file' onChange={onChangeHandler} />
                <label>{filename}</label>
                <input type='submit' value='Upload' />
            </form>
            {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
            
        </Fragment>

    )
}