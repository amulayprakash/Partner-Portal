import React, { useState } from 'react'
import { TextField,Button } from '@mui/material'
import './style.scss'

const AddGroup = () => {
    const [groupId, setGroupId] = useState('')
    const [name, setName] = useState('')
    const [destination,setDestination]=useState('')
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
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
        console.log(groupId+' '+ name +' '+destination+' '+startDate+' '+
        endDate + ' ' +hash)
    }
  return (
    <div>
        <div>
            <form onSubmit={handleSubmit} className='app__form' >
                <h3 className='head-text' >Create A <span>New</span> Group </h3>
                    
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" label='Enter Group Id' 
                     type='text' onChange={(e) =>setGroupId(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Enter Group Name' 
                     onChange={(e) =>setName(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='text' label='Enter Group Destination' 
                     onChange={(e) =>setDestination(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" label='start' 
                     type='date' onChange={(e) =>setStartDate(e.target.value)} 
                     />
                     <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                     variant="outlined" type='date' label='end' 
                     onChange={(e) =>setEndDate(e.target.value)} 
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

export default AddGroup