import React, { useState } from 'react'
import { TextField,Button } from '@mui/material'
import './style.scss'

const AddQr = () => {
    const [id, setId] = useState('')
    const [pin, setPin] = useState('')
    const [hash,setHash]=useState('')
    const handleSubmit= (e) => {
        e.preventDefault()
        // const formData=new FormData()
        // formData.append('filename',filename)
        // axios.post("http://localhost:1902/upload",{name:'file',filename},{
        //     headers:{
        //         "Content-Type":"multipart/form-data",
        //     }
        // })
        //     .then(res => {
        //         console.log(res)
        //     }).catch((err) => {
        //         console.log(err.message)
        //     })
        console.log(id+' '+ pin +' '+hash)
    }
  return (
    <div>
        <div>
            <form onSubmit={handleSubmit} className='app__form' >
                <h3 className='head-text' >Assign <span>We Safe QR Code</span> To Customer </h3>
                    
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" label='Enter QR Id' 
                     type='text' onChange={(e) =>setId(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Enter QR Pin' 
                     onChange={(e) =>setPin(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Enter Customer Hash' 
                     onChange={(e) =>setHash(e.target.value)} 
                     />
                    
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

export default AddQr