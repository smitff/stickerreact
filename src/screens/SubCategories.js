import React,{useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Box,TextField,Button,Grid, Stack,Autocomplete,IconButton,Typography} from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
const columns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'subcategoryName', headerName: 'SubCategory Name', width: 230 },
    { field: 'totalsticker', headerName: 'Total Sticker', width: 130 },
    
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
    height: "40%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

const SubCategories = () => {

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
            <IconButton>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>

            <IconButton>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Stack>
        
          
        )
      }
    }
  ]


  //states
  const [selectionModel, setSelectionModel] = useState([]);
  const [subcategoryName, setsubcategoryName] = useState('');
  const [openAddSubCategory, setopenAddSubCategory] = useState(false);
  const [subcategorytext,setsubCategoryText] = useState('');



  //functions

  const onAddSubCategory = () => {

  }




  return (


    <Box
    // backgroundColor="yellow"
    width={{lg:'100%', md: '100%',sm:'100%', xs: '100%',}}
    pl={{lg:"20%",md:"20%",sm:"2%",xs:"2%"}}
    pr={{lg:"2%",md:"2%",sm:"2%",xs:"2%"}}
    pt={8}

      sx={{
        display: 'flex',
        flexDirection:'column',
        // justifyContent: 'flex-',
        // alignItems: 'center',
        height:"100vh",
        // width:{lg:'80%', md: '80%',sm:'80%', xs: '80%',},
        // marginLeft:"20%",
        // padding: 10,
      }}
      >

      <Box
      // backgroundColor="pink"
      width={{lg:'100%', md: '100%',sm:'100%', xs: '100%',}}
      sx={{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      }}
      my={2}

      >

        <TextField
          disabled
          value={"For You"}
          label="Parent Category Name"
          variant="outlined"
          />
      


        <Button
          variant='contained'
          onClick={() => setopenAddSubCategory(true)}
          >
              Add
          </Button>
      </Box>

      <Modal
        open={openAddSubCategory}
        onClose={()=>setopenAddSubCategory(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Stack 
          spacing={10}
          direction="column"
          // backgroundColor="yellow"
          // justifyContent="space-around"
          // alignItems="center"
          // m='auto'
          // height="100vh"
          // width={{lg:'80%', md: '50%',sm:'80%', xs: '80%',}}
          px={{lg:10,md:10,sm:3,xs:1}}
          sx={{
              // marginLeft: "20%",
          }}
          >
          <TextField
              value={subcategorytext}
              label="SubCategory Name"
              onChange={(e) => setsubCategoryText(e.target.value)}
              error={subcategorytext === ""}
              helperText={subcategorytext === "" ? 'Empty field!' : ''}
              variant="outlined"
          />
      
          <Button
          variant='outlined'
          onClick={() => onAddSubCategory()}
          >
              Add SubCategory
          </Button>
          </Stack>
        </Box>
      </Modal>





      <Box
      // backgroundColor="pink"
      sx={{
        display: 'flex',
        flexDirection:'column',
        height:"80vh",
        width:{lg:'100%', md: '100%',sm:'100%', xs: '100%',},
        justifyContent:'center',
        
        // marginLeft:"20%",
        // alignSelf:'flex-end',
      
      }}
    >
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

export default SubCategories