import {
    Box,
    Button,
    Divider,
    MenuItem,
    Grid,
    Stack,
    TextField,
    Container,
    Typography,
    InputAdornment,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  import Page from "../../components/Page";
  import Axios from "axios";
  import { SnackbarProvider,useSnackbar } from 'notistack';
  import { createBrowserHistory } from "history";
  import PercentIcon from "@mui/icons-material/Percent";
  
  const IAdd = () => {
  
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history= createBrowserHistory();
  
    const [material_price, setMaterial_price] = useState('');
    const [material, setMaterial] = useState('');
    const [net,setNet] =useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [vendors, setVendors] =useState([]);
    const [branches, setBranches] =useState([]);
    const [idofvendor,setIdofvendor]=useState(0);
    const [idofbranch,setIdofbranch]=useState(0);
    const [vendorValue,setVendorValue]=useState('');
    const [branchValue,setBranchValue]=useState('');
    const [search_index, setSearch_index]= useState(0);
    const url="http://10.8.1.170:4545/api/v1/bill_of_meterial/"
    useEffect(()=>{
      vendors.map((v) =>(
        vendorValue===v.name?
        setIdofvendor(v.id):null
      ))
    },[vendorValue, vendors])


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
  
    const handleUpdate= async(e)=>{
      e.preventDefault();
      Axios.put(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`,{
        vendor: idofvendor,
        material_price: '',
        material: '',
        gst_amount: gstAmount,
        net_amount: net,
        //items: itemList.items,
        branches: idofbranch,
    }).then((response) => {
           console.log(response);
          enqueueSnackbar('Update Purchase Order', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          history.push("/dashboard/po")
          setTimeout(() => {
            window.location.reload();
          }, 1000);     
        }, (error) => {
          enqueueSnackbar('Check the data and try again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
    }
  
   
  
 
  
    return (
      <Page title="Poorvika | Purchase Order | Add">
        <Container maxWidth="xl">
          <Box
            component="form"
            sx={{ paddingRight: 5, paddingLeft: 5 }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>
              <Typography sx={{ paddingTop: 5, paddingBottom: 5 }} variant="h4">
               
              </Typography>
              <Typography variant="h6"></Typography>
              <TextField
                id="material_type"
                label="material_type"
                select
                value={vendorValue}
                onChange={(e)=>setVendorValue(e.target.value)}
                helperText="Please select vendor"
                variant="outlined"
              >
                {vendors.map((option) => (
                  <MenuItem key={option.id} value={option.material_type}>
                    {option.material_type}
                  </MenuItem>
                ))}
              </TextField>
             
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
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              <TextField
                id="material"
                label="Sender Reference"
                type="text"
                value={material}
                onChange={(e)=>setMaterial(e.target.value)}
                variant="outlined"
              />
              <Typography variant="h6">material_price</Typography>
              <TextField
                id="material_price"
               
                type="text"
                value={material_price}
                onChange={(e)=>setMaterial_price(e.target.value)}
                variant="outlined"
              />
              <br />
              <Divider />
              <br />
            
            </Stack>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5 }}>
                UPDATE
              </Button>
            </Box>
          </Box>
        </Container>
      </Page>
    );
  };
  
  export default function IntegrationNotistack() {
    return (
      <SnackbarProvider maxSnack={5}>
        <IAdd />
      </SnackbarProvider>
    );
  }
  