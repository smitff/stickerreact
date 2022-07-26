import React,{useState,useEffect} from 'react'
import {Box,TextField,Button,Grid, Stack,Autocomplete,Typography,IconButton,Divider,Snackbar,Alert,CircularProgress} from '@mui/material';
import Modal from '@mui/material/Modal';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { ApiUtils, ApiUtilsImage } from '../Utils/ApiUtils';


const columns = [

  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Sticker Name', width: 400 },
  // { field: 'image', headerName: 'Sticker Imagee', width: 0 },
  
  
  {
    field: 'imagef',
    headerName: 'Sticker Image',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    renderCell:(params)=>{
      return(
        <>
        {/* <span>{params.row.firstName}</span>
        <span>{params.row.lastName}</span> */}
        <Box
          sx={{
            // height: "100%",
            display: "flex",
            // backgroundColor:'yellow',
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          >
            <img
            width={50}
            // height={80}
            style={{
              objectFit: 'contain',
              alignSelf: 'center',
            }}

            // src="http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/stickers/1656908135089004.png"
            // src={"http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/stickers/"+params.row.image}

            src={ApiUtilsImage.stickerImage+params.row.image}

            alt="Sticker Image" />

            {
              console.log(params.row.image)
            }

          </Box>


        </>
      )
    }
  },
  
];




const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px inset #0F3B68',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
};

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "80%",
//     height: "40%",
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   };


const AddStickerParent = () => {



const [categoryList,setCategoryList] = useState([
  {
    _id:"",
    name:"",
    regular:"",
    createdAt:"",
    updatedAt:"",
    __v:0
  }
]);

const [stickers,setStickers] = useState([])



  const [value, setValue] = React.useState(categoryList[0]);
  const [inputValue, setInputValue] = React.useState('');

  const [openAddSticker, setOpenAddSticker] = useState(false);
  const [opendeleteallSticker, setOpenDeleteAllSticker] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const [newStickerName,setNewStickerName] = useState('');

  const [deletedStickerCategory,setDeletedStickerCategory] = useState('');

  const [updatedStickerName,setUpdatedStickerName] = useState('');
  const [updatedStickerImage,setUpdatedStickerImage] = useState('');

  const [deletedStickerName,setDeletedStickerName] = useState('');
  const [deletedStickerImage,setDeletedStickerImage] = useState('');

  const [stickerText,setStickerText] = useState('');
  const [stickerImage,setStickerImage] = useState(null);
  const [categoryImage,setCategoryImage] = useState(null);

  const [selectionModel, setSelectionModel] = useState([]);

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [loading, setLoading] = useState(false);

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

    console.log(stickers)

    useEffect(()=>{

    },[])

    useEffect(()=>{
      getAllCategories()
    },[])

    const getAllCategories = () => {
      axios.get(ApiUtils.allcategories).then((data) => {
  
        console.log(data.data.result[0].name);
        setCategoryList(data.data.result)
        // const maindata = data.data;
        // console.log(maindata)
        // setdr(maindata.data[id])
        // setloading(false)
  
    }).catch((e) => {
        console.log(e)
    })
    }
  
    const getAllStickersBycatid = async (catid) => {
      try {
        console.log(catid,"---------------id")
    
          const Res = await axios.get(ApiUtils.allstickersbycatid+catid)
          // console.log(Res)
          // console.log(Res.data.category[0],"------------------result")
          if(Res.data.category[0].stickers.length>0){
            setStickers(Res.data.category[0].stickers)
          }
          else{
            setStickers([])
          }

          // console.log(Res.data.category[0].stickers,"---------------Reskk")
          // setStickers(Res.data.category[0].stickers)
        } catch (error) {
            console.log(error)
            setStickers([])
        }
    }    

    const getStickerById = async (id) => {
     
      try {
      console.log(id,"---------------id")
  
        const Res = await axios.get(ApiUtils.stickerById+id)
        console.log(Res,"---------------resultf")


        setUpdatedStickerName(Res.data.result.name)
        setStickerImage(ApiUtilsImage.stickerImage+Res.data.result.image)
        setDeletedStickerName(Res.data.result.name)
  
      } catch (error) {
          console.log(error)
      }

    }

    const getCategoryImgById = async (id) => {
     
      try {
      console.log(id,"---------------id")
  
        const Res = await axios.get(ApiUtils.categoryById+id)
        console.log(Res,"---------------resultf")


        // setUpdatedStickerName(Res.data.result.name)
        setCategoryImage(ApiUtilsImage.categoryImage+Res.data.result.image)
        // setDeletedStickerName(Res.data.result.name)
  
      } catch (error) {
          console.log(error)
      }

    }



   useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)

        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }

    }

    }, [file]);





  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }






    // const [stickerId,setStickerId] = useState();
    // const [stickerImageId,setStickerImageId] = useState();
    // const [stickerImageUrl,setStickerImageUrl] = useState('');


  const onAddSticker = async () => {
    let formData = new FormData();    //formdata object
    if(!value._id){
      setSnackstatus("Select the Category First")
      handleClick()
      return
    }
    else if(!newStickerName){
      setSnackstatus("Enter the Sticker Name")
      handleClick()
      return
    }
    else if(!file){
      setSnackstatus("Select the Sticker Image")
      handleClick()
      return

    }
      
    formData.append('name',newStickerName );   //append the values with key, value pair
    formData.append('catId',value._id);
    formData.append('image',file);
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    try {
      const Res = await axios.post(ApiUtils.createSticker, formData, config)
      console.log(Res)
      getAllStickersBycatid(value._id)
      setSnackstatus("Sticker Added Successfully")
      handleClick()
      setOpenAddSticker(false);
    } catch (error) {
      console.log(error)      
    }

    setNewStickerName("")
    setStickerImage(null)
    setFileDataURL(null)
    setFile(null)

      

  }

  const onDeleteAllSticker = ()=>{

  }

  const onUpdate = async (stickerid)=>{
    console.log(updatedStickerName);
    // setUpdatedStickerName('');
    console.log(file,"Thisiiiiiiiiis")

    let formData = new FormData();    //formdata object

    formData.append('name',updatedStickerName );   //append the values with key, value pair
    // formData.append('catId',value._id);

    if(file){
      formData.append('image',file);
    }

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    try {
      console.log(ApiUtils.updateSticker+stickerid)
      const Res = await axios.put(ApiUtils.updateSticker+stickerid, formData, config)
      console.log(Res)
      getAllStickersBycatid(value._id)
      setSnackstatus("Sticker Updated Successfully")
      handleClick()
      setOpenUpdate(false);
    } catch (error) {
      console.log(error)      
    }

    // getAllCategories()
    setUpdatedStickerName("")
    setStickerImage(null)
    setFileDataURL(null)
    setFile(null)

  }
  const onDelete = async (id)=>{

    try {

  
      const Res = await axios.delete(ApiUtils.deleteSticker+id)
      console.log(Res,"---------------result")


      // getAllCategories()
      getAllStickersBycatid(value._id)
      setSnackstatus("Sticker Deleted Successfully")
      handleClick()

      setOpenDelete(false)

    } catch (error) {
        console.log(error)
    }



    // console.log(deletedStickerName);

    setDeletedStickerName("")
    // setNewStickerName("")
    setUpdatedStickerName("")
    setStickerImage(null)
    setFileDataURL(null)
    setFile(null)
 

  }












  //states
  // const [openAddSticker, setopenAddSticker] = useState(false);


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
            onClick={()=>{
              setOpenUpdate(true)
              
              }}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>

            <IconButton 
            color='error'
            onClick={()=>setOpenDelete(true)}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Stack>
        
          
        )
      }
    }
  ]




  return (

    <>

    {
      loading ?
      (
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          }}>
          <CircularProgress />
        </Box>
      ):
      (
        <Box 
        // backgroundColor="yellow"
        width={{lg:'100%', md: '100%',sm:'100%', xs: '100%',}}
        pl={{lg:"20%",md:"20%",sm:"2%",xs:"2%"}}
        pr={{lg:"2%",md:"2%",sm:"2%",xs:"2%"}}
        // pt={{lg:8,md:8,sm:8,xs:8}}
        pt={12}
        sx={{
        //   paddingLeft:'3 x0%'
          // marginLeft:"20%",
          display: 'flex',
          flexDirection: 'column',
          // paddingTop: "6rem",
        }}
        // px={{lg:10,md:10,sm:3,xs:1}}
        >
    
    
          <Box
          // backgroundColor="yellow"
        //   height="50vh"
          
          width="100%"
          m="auto"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
            alignItems:'center',
            
            // m:"auto",
          }}
          >
    
          <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                  getCategoryImgById(newValue._id)
                  getAllStickersBycatid(newValue._id)
                  setValue(newValue);
                  console.log(newValue._id);
                  console.log(newValue,"-------------");
    
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  // getAllStickersBycatid(newInputValue._id)
                  setInputValue(newInputValue);
                }}
                options={categoryList}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                getOptionLabel={(option) => option.name}
      
    
    
              />
    
    
            <Button 
            sx={{
              ml:2,
            }}
              // onClick={()=>SendNotification()}
              variant="contained" endIcon={<NotificationsNoneIcon />}>    
                Notifications
            </Button>


            <img
            width={100}
            // height={80}
            style={{
              objectFit: 'contain',
              alignSelf: 'center',
              marginLeft: '10px',
            }}

            // src="http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/stickers/1656908135089004.png"
            // src={"http://ec2-13-126-2-209.ap-south-1.compute.amazonaws.com:3000/stickers/"+params.row.image}

            src={categoryImage}

            alt="Sticker Image" />

    
    
    
    
    
          </Box>
    
          
          <Box
        // backgroundColor="yellow"
          // m="auto"
          py={2}
    
          sx={{
            display: 'flex',
            flexDirection:'column',
            height:"80vh",
            width:{lg:'100%', md: '100%',sm:'100%', xs: '100%',},
            // m:"auto",
            // justifyContent:'space-between',
            // alignItems:'center',
            // padding: 10,
          }}
          >
            <Stack
            // backgroundColor="yellow" 
            direction="row"
            spacing={2}
            mb={2}
            sx={{
              alignSelf:'flex-end',
            }}>
              <Button 
              onClick={()=>setOpenAddSticker(true)}
              variant="contained" endIcon={<AddCircleOutlineIcon />}>
                Add
              </Button>
    
              <Button 
              onClick={()=>setOpenDeleteAllSticker(true)}
              variant="contained" endIcon={<DeleteForeverIcon />}>
                Delete All
              </Button>
            </Stack>
    
    
          
            <Modal
            open={openAddSticker}
            onClose={()=>{
            
              setOpenAddSticker(false)
              setNewStickerName("")
              setStickerImage(null)
              setFileDataURL(null)
              
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            
            <Box 
            // sx={...style}
    
            flexDirection={{
              xs:'column',
              sm:'column',
              md:'row',
              lg:'row',
            }}
            sx={{
              ...style,
              // backgroundColor: 'pink',
              display: 'flex',
              // flexDirection:'column',
              // flexDirection:{{}}
              // height:"70vh",
              justifyContent:'space-evenly',
              alignItems:'center',
    
            }}>
            
          
              
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
                  disabled
                  value={value.name}
                  label="Selected Category"
                  // onChange={(e) => setNewStickerName(e.target.value)}
                  // error={newStickerName === ""}
                  // helperText={newStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />



              <TextField
                  sx={{
                    mb:4,
    
                  }}
                  value={newStickerName}
                  label="New Sticker Name"
                  onChange={(e) => setNewStickerName(e.target.value)}
                  error={newStickerName === ""}
                  helperText={newStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
    
    
                  {/* <input type={'file'} onChange={changeHandler}/> */}
    
                  <Button
                  sx={{
                    mb:5
                  }}
                  variant="outlined"
                  component="label"
                >
                  Upload File
                   <input
                    type="file"
                    hidden
                    onChange={changeHandler}
                  /> 
                  </Button>
    
          
              <Button
              variant='contained'
              onClick={() => onAddSticker()}
              >
                  Add New Sticker
              </Button>
    
    
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
    
              <Box sx={{
                backgroundColor: 'pink',
              }}>
            
              {fileDataURL ?
                <p className="img-preview-wrapper">
                {
                  <img 
                  width={200} 
                  height={200}
                  
                  src={fileDataURL} alt="preview" />
                }
                </p> : null}
    
              
    
    
              </Box>
    
            </Box>
          
          </Modal>
    
    
          <Modal
            open={opendeleteallSticker}
            onClose={()=>setOpenDeleteAllSticker(false)}
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
    
            }}
            >
    
              <Typography variant='h3'
              sx={{
                color:'red',}}
              >
    
                Are you sure you want to delete All Sticker?
              </Typography>
              
              <TextField
                  value={deletedStickerCategory}
                  label="Deleted Sticker Category"
                  // onChange={(e) => setDeletedStickerName(e.target.value)}
                  error={deletedStickerCategory === ""}
                  helperText={deletedStickerCategory === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
          
              <Button
              color='error'
              variant='contained'
              onClick={() => onDeleteAllSticker()}
              >
                  Delete
              </Button>
    
            </Box>
          </Modal>
    
    
          <Modal
            open={openUpdate}
            onClose={()=>{
              setOpenUpdate(false)
              setFileDataURL(null)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
    
            <Box 
            // sx={...style}
            flexDirection={{
              xs:'column',
              sm:'column',
              md:'row',
              lg:'row',
            }}
            sx={{
              ...style,
              // backgroundColor: 'pink',
              display: 'flex',
              // flexDirection:'column',
              // flexDirection:{{}}
              // height:"70vh",
              justifyContent:'space-evenly',
              alignItems:'center',
    
            }}>  
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
                  disabled
                  value={value.name}
                  label="Selected Category"
                  // onChange={(e) => setNewStickerName(e.target.value)}
                  // error={newStickerName === ""}
                  // helperText={newStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
    
              <TextField
                  sx={{
                    mb:4,
    
                  }}
                  value={updatedStickerName}
                  label="Updated Sticker Name"
                  onChange={(e) => setUpdatedStickerName(e.target.value)}
                  error={updatedStickerName === ""}
                  helperText={updatedStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
    
    
                  {/* <input type={'file'} onChange={changeHandler}/> */}
    
                  <Button
                  sx={{
                    mb:5
                  }}
                  variant="outlined"
                  component="label"
                >
                  Upload New Sticker File
                   <input
                    type="file"
                    hidden
                    onChange={changeHandler}
                  /> 
                  </Button>
    
                  
    
    
          
              <Button
              color="primary"
              variant='contained'
              onClick={() => onUpdate(selectionModel[0])}
              >
                   Update
              </Button>
    
    
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
    
              <Box sx={{
                // backgroundColor: 'pink',
              }}>
            
              {fileDataURL ?
                <p className="img-preview-wrapper">
                {
                  <img 
                  width={200} 
                  height={200}
                  
                  src={fileDataURL} alt="preview" />
                }
                </p> : 
                // null
                <img 
                // src='https://via.placeholder.com/200x200'
                src={stickerImage}
                width={200}
                height={200}
                 alt="preview" />
                
    
                }
    
              
    
    
              </Box>
    
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
    
                Are you sure you want to delete this sticker?
              </Typography>

              <TextField
                  sx={{
                    mb:4,
    
                  }}
                  disabled
                  value={value.name}
                  label="Selected Category"
                  // onChange={(e) => setNewStickerName(e.target.value)}
                  // error={newStickerName === ""}
                  // helperText={newStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
              
              <TextField
                  value={deletedStickerName}
                  label="Deleted Sticker Name"
                  disabled
                  onChange={(e) => setDeletedStickerName(e.target.value)}
                  error={deletedStickerName === ""}
                  helperText={deletedStickerName === "" ? 'Empty field!' : ''}
                  variant="outlined"
              />
          
              <Button
              color='error'
              variant='contained'
              onClick={() => onDelete(selectionModel[0])}
              >
                  Delete
              </Button>
    
            </Box>
          </Modal>
    
    
    
    
          
            <DataGrid
              // rows={rows}
              rows={stickers}
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
                getStickerById(newSelectionModel[0]);
                console.log(newSelectionModel,'newSelectionModel');
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



    </>
  )
}

export default AddStickerParent