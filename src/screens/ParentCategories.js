import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Box,TextField,Button,Grid, Stack,Autocomplete,IconButton,Typography,FormGroup,FormControlLabel,Checkbox,Snackbar,Alert} from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { ApiUtils } from '../Utils/ApiUtils';


const columns = [

    { field: '_id', headerName: 'ID', width: 270 },
    { field: 'name', headerName: 'Category Name', width: 230 },
    { field: 'regular', headerName: 'Regular', width: 230 },
    // { field: 'totalsticker', headerName: 'Total Sticker', width: 130 },
    // { field: 'createdAt', headerName: 'Regular', width: 230 },
    // { field: 'updatedAt', headerName: 'Regular', width: 230 },
    
  ];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "40%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

const ParentCategories = () => {


  //states
  const [selectionModel, setSelectionModel] = useState([]);
  // const [categoryName, setcategoryName] = useState('');
  const [openAddCategory, setopenAddCategory] = useState(false);
  const [categorytext,setCategoryText] = useState('');


  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const [categories,setCategories] = useState([]);
  const [updatecategorytext,setUpdateCategoryText] = useState('');
  const [deletedcategorytext,setDeletedCategoryText] = useState('');

  const [checked, setChecked] = useState(false);

  //---------------
  const [snackstatus, setSnackstatus] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  //--------------




  useEffect(()=>{
    getAllCategories()
  },[])

  // useEffect(()=>{
  //     getCategoryById()
  // },[openUpdate])


  const getCategoryById = async (id) => {
    // await axios.get(ApiUtils.categoryById+id)
    // .then(res => {
    //   console.log(res.data.result)
    //   setUpdateCategoryText(res.data.result.name)
    // })
    // .catch(err => {
    //   console.log(err)
    // })


    try {
    console.log(id,"---------------id")

      const Res = await axios.get(ApiUtils.categoryById+id)
      console.log(Res.data.result,"---------------result")
      setUpdateCategoryText(Res.data.result.name)
      setChecked(Res.data.result.regular)
      setDeletedCategoryText(Res.data.result.name)

    } catch (error) {
        console.log(error)
    }





  }
  const getAllCategories = () => {
    axios.get(ApiUtils.allcategories).then((data) => {

      console.log(data.data.result);
      setCategories(data.data.result)
      // const maindata = data.data;
      // console.log(maindata)
      // setdr(maindata.data[id])
      // setloading(false)

  }).catch((e) => {
      console.log(e)
  })
  }



  //functions

  const onAddCategory = async () => {
    if(categorytext.length <= 0 ){
      setSnackstatus("Enter Category Name")
      handleClick()
      return
    }
    
    try {
      const body = {
        name: categorytext,
        regular: checked
      }
      const Res = await axios.post(ApiUtils.addCategory,
          body,
        )
        console.log(Res,"---------------result")

        getAllCategories()
        setSnackstatus(`Category Added Successfully As a  ${checked?"Regular":"Non-Regular"}`)
        handleClick()    
        setopenAddCategory(false)

      } catch (error) {
          console.log(error.response)
          setSnackstatus(error.response.data.err)
          handleClick()    

      }

      setCategoryText("")




  }

  const onUpdateCategory = async (id) => {

    try {

      const body = {
        name: updatecategorytext,
        regular: checked
      }
  
        const Res = await axios.put(ApiUtils.updateCategory+id,
            body,
          )
        console.log(Res,"---------------result")


        getAllCategories()
        setSnackstatus(`Category Updated Successfully`)
        handleClick()


        setOpenUpdate(false)

      } catch (error) {
          console.log(error)
      }

      setUpdateCategoryText("")

    
  }

  const onDeleteCategory = async (id) => {

    try {

  
        const Res = await axios.delete(ApiUtils.deleteCategory+id)
        console.log(Res,"---------------result")


        getAllCategories()

        setOpenDelete(false)

      } catch (error) {
          console.log(error)
      }
      setDeletedCategoryText("")



  }

  const onUpdateCategoryIconClick = () => {

    // console.log(categories[0]._id===selectionModel[0].id)
    // console.log( typeof categories[0]._id)
    // console.log(typeof selectionModel[0].id)
    // console.log(selectionModel[0])
    // const res = categories.find(c=>c._id === selectionModel[0])
    // console.log(res,"res")
    // setUpdateCategoryText(res.name)

    // getCategoryById(selectionModel[0])

    setOpenUpdate(true)


  }
  const onDeleteCategoryIconClick = () => {
    setOpenDelete(true)
  }

  const handleChangeincheckbox = (event) => {
    setChecked(event.target.checked);
  }

  const actionColumn = [


    {
      field:"action",
      headerName:"Action",
      description: 'This column has a value getter and is not sortable.',
      width:200,
      sortable: false,
      renderCell:()=>{
        return(
          <Stack
          spacing={5}
          direction="row"
          // backgroundColor="yellow"
          // justifyContent="center"
          // alignItems="center"
          
          m='auto'
          // height="100vh"
          // width={{lg:'50%', md: '50%',sm:'80%', xs: '80%',}}
          // px={{lg:10,md:10,sm:3,xs:1}}
        
          >
            <IconButton 
            color='primary'
            onClick={()=>onUpdateCategoryIconClick()}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>

            <IconButton 
            color='error'
            onClick={()=>onDeleteCategoryIconClick()}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Stack>
        
          
        )
      }
    }
  ]





  return (


    <Box
    // backgroundColor="yellow"
    width={{lg:'100%', md: '100%',sm:'100%', xs: '100%',}}
    pl={{lg:"20%",md:"20%",sm:"2%",xs:"2%"}}
    pr={{lg:"2%",md:"2%",sm:"2%",xs:"2%"}}
    // pt={{lg:8,md:8,sm:8,xs:8}}
    pt={8}
      sx={{
        display: 'flex',
        flexDirection:'column',
        // justifyContent: 'flex-',
        // alignItems: 'center',
        height:"100vh",
        // width:{lg:'80%', md: '80%',sm:'80%', xs: '80%',},
        // marginLeft:"20%",
        // justifyContent: 'center',
        // alignItems: 'center',
    
        // padding: 10,
      }}
      >

      <Box
      // backgroundColor="pink"
      width={{lg:'100%', md: '100%',sm:'100%', xs: '100%',}}
      sx={{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
      }}
      my={2}

      >
        <Button
          variant='contained'
          onClick={() => setopenAddCategory(true)}
          >
              Add
          </Button>
      </Box>

      <Modal
        open={openAddCategory}
        onClose={()=>{
          setopenAddCategory(false)
          setCategoryText("")
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Stack 
          spacing={5}
          direction="column"
          // backgroundColor="yellow"
          // justifyContent="space-around"
          // alignItems="center"
          // m='auto'
          // height="100vh"
          // width={{lg:'80%', md: '50%',sm:'80%', xs: '80%',}}
          // px={{lg:10,md:10,sm:3,xs:1}}
          sx={{
              // marginLeft: "20%",
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


          <FormGroup>
                <FormControlLabel control={<Checkbox 
                // defaultChecked
                checked={checked}
                onChange={handleChangeincheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
                />} label="Regular" />
          </FormGroup>

      
          <Button
          variant='contained'
          onClick={() => onAddCategory()}
          >
              Add Category
          </Button>
          </Stack>
        </Box>
      </Modal>


      <Modal
        open={openUpdate}
        onClose={()=>setOpenUpdate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}
        
        
        >
          
          <Stack 
          spacing={5}
          direction="column"
          // backgroundColor="yellow"
          // justifyContent="space-around"
          // alignItems="center"
          // m='auto'
          // height="100vh"
          // width={{lg:'80%', md: '50%',sm:'80%', xs: '80%',}}
          // px={{lg:10,md:10,sm:3,xs:1}}
          sx={{
              // marginLeft: "20%",
          }}
          >
          <TextField
              // value={(categories.find(c=>c._id === selectionModel[0].id))}
              //selection model par kae
              // value="ok"
              value={updatecategorytext}
              label="Update Category Name"
              onChange={(e) => setUpdateCategoryText(e.target.value)}
              error={updatecategorytext === ""}
              helperText={updatecategorytext === "" ? 'Empty field!' : ''}
              variant="outlined"
          />

          <FormGroup>
                <FormControlLabel control={<Checkbox 
                // defaultChecked
                checked={checked}
                onChange={handleChangeincheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
                />} label="Regular" />
          </FormGroup>

          
          <Button
          variant='contained'
          onClick={() => onUpdateCategory(selectionModel[0])}
          >
              Update Category
          </Button>
          </Stack>
        </Box>
      



      </Modal>

      <Modal
        open={openDelete}
        onClose={()=>setOpenDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box   
        sx={{
          ...style,
          // backgroundColor: 'pink',
          display: 'flex',
          flexDirection:'column',
          height:"50vh",
          justifyContent:'space-evenly',
          // alignItems:'flex-start',

        }}>

          <Typography 
          sx={{
            color:'red',
          }}
          variant='h3'>

            Are you sure you want to delete this Category?
          </Typography>
          
          <TextField
              value={deletedcategorytext}
              label="Delete Category Name"
              onChange={(e) => setDeletedCategoryText(e.target.value)}
              error={deletedcategorytext === ""}
              helperText={deletedcategorytext === "" ? 'Empty field!' : ''}
              variant="outlined"
          />
      
          <Button
          color='error'
          variant='contained'
          onClick={() => onDeleteCategory(selectionModel[0])}
          >
              Delete
          </Button>

        </Box>
      </Modal>





      <Box
      // backgroundColor="pink"
      sx={{
        display: 'flex',
        flexDirection:'column',
        height:"80vh",
        width:{lg:'100%', md: '100%',sm:'100%', xs: '100%',},
        // marginLeft:"20%",
        // alignSelf:'flex-end',
        justifyContent:'center',
        // alignItems:'center',
      
      }}
    >
        <DataGrid
          rows={categories}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          getRowId={(row) => row._id}
          sx={{ 
            // display: 'flex',
            // justifyContent:'center',
            // // alignItems:'center',
            // height:'80vh',
            // width:"50%",
            // m:"auto",
            // backgroundColor:'pink',
          }}
          // rowsPerPageOptions={[3,5,10]}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(newSelectionModel) => {
            getCategoryById(newSelectionModel[0]);
            console.log(newSelectionModel);
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackstatus}
        </Alert>
      </Snackbar>
    
    </Box>
  )
}

export default ParentCategories