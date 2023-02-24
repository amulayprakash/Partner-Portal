import { Input } from '@mui/material'
import React,{useState} from 'react'
import {TextField,Button} from '@mui/material'
import axios from 'axios'
import './style.scss'

const AddDocument = () => {

    const [filename, setFilename] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [hash, setHash] = useState('')

    const handleSubmit= (e) => {
        e.preventDefault()
        // const formData=new FormData()
        // formData.append('filename',filename)
        axios.post("http://localhost:1902/upload",{name:'file',filename},{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        })
            .then(res => {
                console.log(res)
            }).catch((err) => {
                console.log(err.message)
            })
    }

  return (
    <div>
        <div>
            <form onSubmit={handleSubmit} className='app__form' >
                <h3 className='head-text' >Upload The <span>Required</span> Document</h3>
                    
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" label='Name of Document' type='text' onChange={(e) =>setName(e.target.value)} />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Description' onChange={(e) =>setDescription(e.target.value)} />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Customer Hash' onChange={(e) =>setHash(e.target.value)} />
                    <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='file' onChange={(e) =>setFilename(e.target.files[0])} />
                    <Button className='btn p-text' variant="outlined" 
                    style={{width:'100px',margin:'auto',marginTop:'20px'}}  type='submit'
                    
                    >
                        Submit   
                    </Button>
            </form>
        </div>
    </div>
  )
}

export default AddDocument