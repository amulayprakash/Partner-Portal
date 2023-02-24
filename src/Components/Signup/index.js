import React, { useState } from 'react'
import Navbar from '../Navbar'
import { TextField,Button } from '@mui/material'
import './style.scss'
const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit=(e) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
  }
  return (
    <div>
        
        <div>
        <form className='app__form' >
                <h2 style={{margin:'auto',marginBottom:'20px'}} >Sign Up</h2>
                <TextField  className='form__text' id="outlined-basic" 
                    label="Partner Name" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                    label="Email Id" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField style={{marginTop:'20px'}} className='form__text' id="outlined-basic" type='password'
                    label="Password" variant="outlined" onChange={(e) =>setPassword(e.target.value)}  />
                <Button variant="outlined" style={{width:'100px',margin:'auto',marginTop:'20px'}} 
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    </div>
  )
}

export default SignUp