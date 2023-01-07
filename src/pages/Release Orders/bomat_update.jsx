import React from "react";
//import Page from "../../components/Page";
import { Container, Box, Grid, TextField, Typography, Stack, Button, Autocomplete,MenuItem } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import { SnackbarProvider,useSnackbar } from 'notistack';
//import { useForm, Controller } from "react-hook-form";

const MatUpdate=(props) =>{

    let {id} = useParams();

    //const { control } = useForm();
    const {enqueueSnackbar} = useSnackbar();
    const history=createBrowserHistory();
    const [senderRef, setSenderRef] = useState('');
    const [net,setNet] =useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [vendors, setVendors] =useState([]);
    const [branches, setBranches] =useState([]);
    const [idofvendor,setIdofvendor]=useState(0);
    const [idofbranch,setIdofbranch]=useState(0);
    const [vendorValue,setVendorValue]=useState('');
    const [branchValue,setBranchValue]=useState('');
    const [search_index, setSearch_index]= useState(0);
    const [matList, setMatList] = useState([]);
    //const [vendors, setVendors] =useState([]);
   
    //const [vendorValue,setVendorValue]=useState('');
    const [value, setValue] = useState();
    const [matData,setMatData]= useState([
        {
            material_type:"",
        material:"",
        material_price:"",}
     
    ])
    
    useEffect(()=>{
        vendors.map((v) =>(
          vendorValue===v.name?
          setIdofvendor(v.id):null
        ))
      },[vendorValue, vendors])
const url="http://10.8.1.170:4545/api/v1/bill_of_meterial/"
    useEffect(()=>{
      // const id=props.match.params.id
      Axios.get(url+id)
        .then((res) => {
          // console.log(res.data)
          setMatData(res.data)
          
      }).catch(err=>console.error(err))
  }, [id]);

  
  useEffect(()=>{
    Axios.get('http://10.8.1.170:4545/api/v1/bill_of_meterial',{
    }).then((response) => {
           console.log("vendor",response.data);
          const vendors=response.data;
          setVendors(vendors);
        }, (error) => {
          console.log(error);
      });
    },[])
  
    const handleUpdate = (e)=> {
      e.preventDefault()
      // const id= props.match.params.id
      Axios.put(url+id,matData)
         .then((response) => {
           console.log(response);
          if(response.status === 200) {
            history.push("/bomat_update")
            enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } ); 
            setTimeout(() => {
              window.location.reload();
            }, 1000); 
          }
        }, (error) => {
          enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
  }
  const handleChange=(e)=>{
      const newdata={...matData}
      newdata[e.target.id]=e.target.value
      setMatData(newdata)
  }
    return(
      
            <Container maxWidth="xl">
                <Box
                    component="form"
                    sx={{ paddingRight: 3, paddingLeft: 3 }}
                    noValidate
                    autoComplete="off"
                    >
                    <Stack spacing={5}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h4">Update Material Code Data {id}</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
            <Grid item xs={12} md={12} xl={12}>
                  <TextField
                    fullWidth
                    id="material_type"
                    label="Material Type"
                    select
                    
                    value={vendorValue}
                    onChange={(e)=>setVendorValue(e.target.value)}
                    variant="outlined"
                  >
                    {vendors.map((option) => (
                      <MenuItem key={option.id} value={option.material_type.toString()}>
                        {option.material_type.toString()}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material"
                 
                  value={matData.material}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material_price"
                 
                  type="number"
                  value={matData.material_price}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
          
              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
      
        <Box display="flex" justifyContent="center" alignItems="center" padding={4}>
          <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5,textTransform:'none',fontWeight:'bold',backgroundColor:'green' }}>
            Update
          </Button>
        </Box>
    </Container>
      
    )
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <MatUpdate />
    </SnackbarProvider>
  );
}
