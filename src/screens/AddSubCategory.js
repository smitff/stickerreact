import React,{useState,useEffect} from 'react'
import {Box,TextField,Button,Grid, Stack} from '@mui/material';





const AddSubCategory = () => {

    //This is 2 state will be default selected

    const [parentCategory,setParentCategory] = useState('For You');
    // const [parentCategoryId,setParentCategoryId] = useState();
    const [subCategoryText,setSubCategoryText] = useState('');
    const [subCategoryId,setSubCategoryId] = useState();

    const onSubmit = (e) => {
      e.preventDefault();
      console.log(subCategoryText);
      setSubCategoryText('');
  }




  return (

      <Stack 
      spacing={10}
      direction="column"
      // backgroundColor="yellow"
      justifyContent="center"
      // alignItems="center"
      m='auto'
      height="100vh"
      // width={{lg:'50%', md: '50%',sm:'80%', xs: '80%',}}
      px={{lg:10,md:10,sm:3,xs:1}}
      sx={{
        marginLeft: "20%",
      }}
      >

          <TextField
              value={parentCategory}
              label="Parent Category Name"
              onChange={(e) => setParentCategory(e.target.value)}
              // error={subCategoryText === ""}
              // helperText={subCategoryText === "" ? 'Empty field!' : ''}
              variant="outlined"
              disabled={true}
          />
      



          <TextField
              value={subCategoryText}
              label="SubCategory Name"
              onChange={(e) => setSubCategoryText(e.target.value)}
              error={subCategoryText === ""}
              helperText={subCategoryText === "" ? 'Empty field!' : ''}
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

export default AddSubCategory