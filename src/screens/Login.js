import React from 'react'
import {Box,TextField,Button} from '@mui/material';

const Login = () => {

  const [username,setUsername] = React.useState('')
  const [password,setPassword] = React.useState('')
  
  const onSubmit = () => {
    console.log(username,password)
    if(username === 'admin' && password === '123@123'){
      setUsername('')
      setPassword('')
      // setIsLoggedin(true)
    }
  }


  return (
    <Box  
    // backgroundColor="yellow"
    width="100%"
    height="100vh"
    sx={{
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >

        <Box
          sx={{
            display: 'flex',
            flexDirection:'column',
            height:"70vh",
            justifyContent:'center',
            // backgroundColor: 'pink',
            // alignItems:'center',
            width: '60%',  
            
          }}
          >

          <TextField
              sx={{
                mb:4,

              }}
              value={username}
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              error={username === ""}
              helperText={username === "" ? 'Empty field!' : ''}
              variant="outlined"
          />


          <TextField
              sx={{
                mb:4,

              }}
              value={password}
              
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              error={password === ""}
              helperText={password === "" ? 'Empty field!' : ''}
              variant="outlined"
          />



              


      
          <Button
          variant='contained'
          onClick={() => onSubmit()}
          >
              Login
          </Button>


          </Box>

    </Box>
    
    



  )
}

export default Login