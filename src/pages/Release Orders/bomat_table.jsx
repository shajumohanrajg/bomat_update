import { Box,  Typography,IconButton} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
//import MatForm from "./MatForm"

import axios from "axios";
import { createBrowserHistory } from 'history';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const history = createBrowserHistory();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   borderBottom:2,
   borderBottomColor: 'green',
    boxShadow: 25,
    borderTopLeftRadius: 50,
  
    borderBottomRadius: 8,
    p: 4,
  };

  
const Contacts = () => {
   
  //const {enqueueSnackbar} = useSnackbar();
  const [matList, setMatList] = useState([]);
  //const [matList1, setMatList1] = useState([]);

  

 
 
 
      const deleteVendor = (id) => {
        if(window.confirm("Are you sure you want to delete")){
        axios.delete(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`).then(()=>{
            
            // console.log("deleted",res)
            //enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
            setTimeout(() => {
              window.location.reload();
            }, 1000); 
          }).catch (err => console.log(err))
      }}

    
      const updateVendor = (id) => {
        // console.log(id) 
        history.push(`/bomat_update/${id}`)
        window.location.reload();
        
      }
  
  const columns = [
   
    {
      field: "material_code",
      headerName: "Material Code",
     
      headerClassName: 'super-app-theme--header',
      flex: 0.4,
      // cellClassName: "name-column--cell",

    },
    {
      field: "material_type",
      valueFormatter: ({value}) => value.name,
      headerName: "Material Type",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "material",
        headerName: "Material",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },

  
    {
        field: "material_price",
        headerName: "Material Price",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      }, 
      {
        headerName: "Actions", field: "action", flex:1,
        renderCell: (params) => <div>
            
<IconButton aria-label="delete" color="error" size="large" onClick={() => deleteVendor(params.id)}>
  <DeleteIcon fontSize="small" />
</IconButton>
          
        
        </div>
        
      },
     
       
  
  
    
  ]
 

  useEffect(() => {
    fetch("http://10.8.1.170:4545/api/v1/bill_of_meterial")
    .then((response) => response.json())
    .then((result) => setMatList(result))
    .catch((error) => console.log(error));
  }, []);

 
  return (
 <Box  m="30px 0 0 0"
 sx={{boxShadow:20,padding:5,}}>
    <Stack direction="row" >
       
      <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>Bill of Materials Table</Box></Typography>
       </Stack>
      <Box
       height="80vh"  fontWeight={10}
        sx={{ 
          "& .MuiDataGrid-root": {
            border: "none", 
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
         
          },
          "& .MuiDataGrid-columnHeaders": {
           
           borderBottom:"1px solid grey",

           fontWeight: "bold !important"

          },
          "& .MuiDataGrid-virtualScroller": {
            
          },
          "& .MuiDataGrid-footerContainer": {
          
           
          },
       
        }}
    
        
      >  <Stack direction="row" justifyContent="end" >
  
              <Button variant="contained" href="/bomat" color="success" sx={{fontWeight:"bold"}} >Add Items</Button>
              </Stack>
  
   
    
        <DataGrid  
        showQuickFilter
          rows={matList}
          columns={columns}
          getRowId={(row) => row.material_code}
          components={{ Toolbar: GridToolbar ,color:"secondary", }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },color:"secondary"
            },
        }}
        />
             
        </Box>
        </Box>
    
  );
};

export default Contacts;