import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {Link} from 'react-router-dom'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
const drawerWidth = "20%";

export default function ClippedDrawer() {

    const [open, setOpen] = React.useState(true);
    const [openStickerManagement, setOpenStickerManagement] = React.useState(true);


    const handleClick = () => {
      setOpen(!open);
    };

    const handleClickStickerManagement = () => {
      setOpenStickerManagement(!openStickerManagement);
    };


  return (
    <Box 
    flexDirection={{
      xs: 'column',
      sm: 'row',
    }}
    
    sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sticker Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          
        <List>

        {/* <Link to="/" style={{
            textDecoration: 'none',
        }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddPhotoAlternateOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="Add Sticker" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        <Link to="/addcategory" style={{
            textDecoration: 'none',
        }}>
            <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Add Category" />
            </ListItemButton>
            </ListItem>
        </Link>

        <Divider />


        <Link to="/addsubcategory" style={{
            textDecoration: 'none',
        }}>
            <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Add SubCategory" />
            </ListItemButton>
            </ListItem>
        </Link> */}

        <Divider />

        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
        <ListItemText primary="Category Management" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
        
            <Link to="/parentcategories" style={{
                textDecoration: 'none',
            }}>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Parent Categories" />
                </ListItemButton>
            </Link>


          <Link to="/subcategories" style={{
            textDecoration: 'none',
          }}>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Sub Categories" />
            </ListItemButton>
          </Link>  

        </List>
      </Collapse>


      <Divider />


      <ListItemButton onClick={handleClickStickerManagement}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
        <ListItemText primary="Sticker Management" />
        {openStickerManagement ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStickerManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
        
            <Link to="/addstickerparentcategories" style={{
                textDecoration: 'none',
            }}>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Sticker for Parent Categories" />
                </ListItemButton>
            </Link>


          <Link to="/addstickersubcategories" style={{
            textDecoration: 'none',
          }}>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Sticker for Sub Categories" />
            </ListItemButton>
          </Link>  

        </List>
      </Collapse>




        </List>
      
        </Box>
      </Drawer>
    
    

    </Box>
  );
}
