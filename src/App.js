
// import './App.css';
import React,{useState,useEffect} from 'react'
import {Box,TextField,Button} from '@mui/material';
import ParentCategories from './screens/ParentCategories';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SubCategories from './screens/SubCategories';
import AddStickerParent from './screens/AddStickerParent';
import AddStickerSub from './screens/AddStickerSub';
import Rdrawer from './screens/Rdrawer'
import Login from './screens/Login'

function App() {

  const [isLoggedin,setIsLoggedin] = React.useState(false)

  const [username,setUsername] = React.useState('')
  const [password,setPassword] = React.useState('')

  useEffect(()=>{
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log(BASE_URL)
    if(sessionStorage.getItem('name')==='admin'){
      setIsLoggedin(true)
    }
    
  },[])




  const onSubmit = () => {
    console.log(username,password)
    if(username === 'admin' && password === 'admin'){
      sessionStorage.setItem("name",username);
      setUsername('')
      setPassword('')
      setIsLoggedin(true)
    }
  }


  return (
    <Box 

    >      
      <Router>

{
  !isLoggedin ?

  (
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
  ):
  (
    <>
      <Rdrawer/>
        <Routes>
        <Route path='/parentcategories' element={<ParentCategories/>}/>
        <Route path='/subcategories' element={<SubCategories/>}/>
        <Route path='/addstickerparentcategories' element={<AddStickerParent/>}/>
        <Route path='/addstickersubcategories' element={<AddStickerSub/>}/>      
      </Routes>
    </>

  )
}



    </Router>


    
    </Box>
  );
}

export default App;
