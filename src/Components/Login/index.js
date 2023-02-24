import React,{useState} from 'react'
import { TextField,Button } from '@mui/material'

const Login = () => {
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
                <h2 className='head-text' style={{margin:'auto',marginBottom:'20px'}} >Please <span>Log In</span> To Continue </h2>
                <TextField style={{marginTop:'20px'}}  className='form__text' id="outlined-basic" 
                    label="Email Id" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField style={{marginTop:'20px'}} className='form__text' id="outlined-basic" type='password'
                    label="Password" variant="outlined" onChange={(e) =>setPassword(e.target.value)}  />
                <Button className='btn p-text' variant="outlined" style={{width:'100px',margin:'auto',marginTop:'20px'}} 
                    onClick={handleSubmit}
                >
                    Log In
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Login