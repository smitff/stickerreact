import React,{useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Box,TextField,Button,Grid, Stack,Autocomplete,IconButton,Typography} from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   renderCell:(params)=>{
    //     return(
    //       <>
    //       <span>{params.row.firstName}</span>
    //       <span>{params.row.lastName}</span>
    //       </>
    //     )
    //   }
    // },
    // {
    //   field:"action",
    //   headerName:"Action",
    //   description: 'This column has a value getter and is not sortable.',
    //   width:200,
    //   sortable: false,
    //   renderCell:(params)=>{
    //     return(
    //       <Stack
    //       spacing={5}
    //       direction="row"
    //       // backgroundColor="yellow"
    //       // justifyContent="center"
    //       // alignItems="center"
          
    //       m='auto'
    //       // height="100vh"
    //       // width={{lg:'50%', md: '50%',sm:'80%', xs: '80%',}}
    //       // px={{lg:10,md:10,sm:3,xs:1}}
        
    //       >
    //         <IconButton onClick={()=>onUpdate()}>
    //           <ModeEditOutlineOutlinedIcon />
    //         </IconButton>

    //         <IconButton>
    //           <HighlightOffOutlinedIcon />
    //         </IconButton>
    //       </Stack>
        
          
    //     )
    //   }
    // }
  ];



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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Dashboard = () => {

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
            <IconButton onClick={()=>setOpenUpdate(true)}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>

            <IconButton onClick={()=>setOpenDelete(true)}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Stack>
        
          
        )
      }
    }
  ]


  const [newStickerName,setNewStickerName] = useState('');
  const [deletedStickerCategory,setDeletedStickerCategory] = useState('');

  const [updatedStickerName,setUpdatedStickerName] = useState('');
  const [updatedStickerImage,setUpdatedStickerImage] = useState('');

  const [deletedStickerName,setDeletedStickerName] = useState('');
  const [deletedStickerImage,setDeletedStickerImage] = useState('');

  const onAddSticker = () => {

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

  const DeleteSelected = ()=>{

  }

  const [selectionModel, setSelectionModel] = React.useState([]);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddSticker, setOpenAddSticker] = useState(false);
  const [opendeleteallSticker, setOpenDeleteAllSticker] = useState(false);

  return (


    <Box
    // backgroundColor="yellow"



      
      // m="auto"
      sx={{
        display: 'flex',
        flexDirection:'column',
        height:"80vh",
        width:{lg:'100%', md: '50%',sm:'80%', xs: '80%',},
        // m:"auto",
        // justifyContent:'space-between',
        // alignItems:'center',
        padding: 10,
      }}
      >
        {/* <div>
          {selectionModel}
        </div> */}

        <Stack
        // backgroundColor="yellow" 
        direction="row"
        spacing={2}
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
        sx={{
          ...style,
          // backgroundColor: 'pink',
          display: 'flex',
          flexDirection:'column',
          height:"30vh",
          justifyContent:'center',
          // alignItems:'flex-start',

        }}
        
        >
          
          <TextField
              value={newStickerName}
              label="New Sticker Name"
              onChange={(e) => setNewStickerName(e.target.value)}
              error={newStickerName === ""}
              helperText={newStickerName === "" ? 'Empty field!' : ''}
              variant="outlined"
          />

        {/* <input type={'file'} onChange={(e) => setStickerImage(e.target.files[0])} /> */}

      
          <Button
          variant='outlined'
          onClick={() => onAddSticker()}
          >
              Add New Sticker
          </Button>

        </Box>
      </Modal>


      <Modal
        open={opendeleteallSticker}
        onClose={()=>setOpenDeleteAllSticker(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography variant='h3'>

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
          variant='outlined'
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
        <Box sx={style}>
          
          <TextField
              value={updatedStickerName}
              label="Updated Sticker Name"
              onChange={(e) => setUpdatedStickerName(e.target.value)}
              error={updatedStickerName === ""}
              helperText={updatedStickerName === "" ? 'Empty field!' : ''}
              variant="outlined"
          />
      
          <Button
          variant='outlined'
          onClick={() => onUpdate()}
          >
              Update
          </Button>

        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={()=>setOpenDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography variant='h3'>

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
          variant='outlined'
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
  )
}

export default Dashboard