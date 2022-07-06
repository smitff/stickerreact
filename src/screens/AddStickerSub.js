import React,{useState,useEffect} from 'react'
import {Box,TextField,Button,Grid, Stack,Autocomplete,Typography,IconButton,Divider} from '@mui/material';
import Modal from '@mui/material/Modal';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { DataGrid } from '@mui/x-data-grid';


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const categoryList = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Sticker Name', width: 130 },
  { field: 'lastName', headerName: 'Sticker Image', width: 130 },
  
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  
];

const imageMimeType = /image\/(png|jpg|jpeg)/i;


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

  const actionColumn = [
    {
      field:"stickerimage",
      headerName:"Sticker Image",
      description: 'Sticker Image display',
      width:200,
      sortable: false,
      renderCell:()=>{
        return(

          <Box
          sx={{

          }}
          >
            <img
            src="https://via.placeholder.com/150" alt="Sticker Image" />

          </Box>
        
          
        )
      }
    },
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
            onClick={()=>setOpenUpdate(true)}>
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


  const [selectionModel, setSelectionModel] = useState([]);

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);


  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
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




    // const [stickerId,setStickerId] = useState();
    // const [stickerImageId,setStickerImageId] = useState();
    // const [stickerImageUrl,setStickerImageUrl] = useState('');


  const onAddSticker = () => {
    setOpenAddSticker(false);
  }

  const onDeleteAllSticker = ()=>{

  }

  const onUpdate = ()=>{
    console.log(updatedStickerName);
    // setUpdatedStickerName('');
    setOpenUpdate(false);

  }
  const onDelete = ()=>{

    console.log(deletedStickerName);
    setOpenDelete(false)

  }












  //states
  // const [openAddSticker, setopenAddSticker] = useState(false);





  return (
  
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

            <TextField
          disabled
          value={"For You"}
          label="Parent Category Name"
          variant="outlined"
          />
      


        <Button 
        sx={{
          ml:2,
        }}
          // onClick={()=>SendNotification()}
          variant="contained" endIcon={<NotificationsNoneIcon />}>    
            Notifications
        </Button>



      </Box>





      {/* <Modal
        open={openAddSticker}
        onClose={()=>setopenAddSticker(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        
        style={style}

        height="30vh"
        width="100%"
        m="auto"
        sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        // alignItems:'center',
        // m:"auto",
        }}>

        <TextField
            value={stickerText}
            label="Sticker Name"
            onChange={(e) => setStickerText(e.target.value)}
            error={stickerText === ""}
            helperText={stickerText === "" ? 'Empty field!' : ''}
            variant="outlined"
        />

        <input type={'file'} onChange={(e) => setStickerImage(e.target.files[0])} />

        <Button
        variant='outlined'
        onClick={() => onSubmit()}
        >
            Submit
        </Button>

        </Box>
      </Modal> */}


{/*  */}

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
        onClose={()=>setOpenAddSticker(false)}
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
        onClose={()=>setOpenUpdate(false)}
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
          onClick={() => onUpdate()}
          >
               Update
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
              value={deletedStickerName}
              label="Deleted Sticker Name"
              onChange={(e) => setDeletedStickerName(e.target.value)}
              error={deletedStickerName === ""}
              helperText={deletedStickerName === "" ? 'Empty field!' : ''}
              variant="outlined"
          />
      
          <Button
          color='error'
          variant='contained'
          onClick={() => onDelete()}
          >
              Delete
          </Button>

        </Box>
      </Modal>




      
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={10}
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
          checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel);
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
    
    </Box>



    </Box>
  )
}

export default AddStickerParent