import React,{useState,useEffect} from 'react'
import {Box,TextField,Button,Grid, Stack} from '@mui/material';



const AddCategory = () => {

    const [categorytext,setCategoryText] = useState('');
    const [categoryId,setCategoryId] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(categorytext);
        setCategoryText('');
    }


  return (
    <Stack 
    spacing={10}
    direction="column"
    // backgroundColor="yellow"
    justifyContent="center"
    // alignItems="center"
    // m='auto'
    height="100vh"
    // width={{lg:'80%', md: '50%',sm:'80%', xs: '80%',}}
    px={{lg:10,md:10,sm:3,xs:1}}
    sx={{
        marginLeft: "20%",
    }}
    >
        <TextField
            value={categorytext}
            label="Category Name"
            onChange={(e) => setCategoryText(e.target.value)}
            error={categorytext === ""}
            helperText={categorytext === "" ? 'Empty field!' : ''}
            variant="outlined"
        />
    
        <Button
        variant='outlined'
        onClick={() => onSubmit()}
        >
            Submit
        </Button>
    </Stack>
  )
}

export default AddCategory