import Axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Page from "../../components/Page";
import { SnackbarProvider,useSnackbar } from 'notistack';
import { createBrowserHistory } from 'history';

const VAdd = () => {

  const history= createBrowserHistory();
  const {enqueueSnackbar} = useSnackbar();
  const url="http://10.8.1.170:4545/api/v1/vendor"
  const [vendorData,setVendorData]= useState({
    Supplier_code:"",
    name:"",
    email:"",
    zipcode:"",
    phone:"",
    address1:"",
    address2:"",
    city:"",
    state:"",
    country:"",
    contact_person:"",
    contact_reference:"",
  })

  const handleChange=(e)=>{
    const newdata={...vendorData}
    newdata[e.target.id]=e.target.value
    setVendorData(newdata)
}

  const handleSave=(e)=>{
    e.preventDefault();
    Axios.post(url,vendorData) 
    .then((response) => {
        // console.log(response); 
        enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        history.push("/dashboard/vendors")
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }, (error) => {
        console.log(error);
        enqueueSnackbar('Check values and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
    });
  }
  return (
    <Page title="Poorvika | Vendors | Add">
      <Container maxWidth="xl">
      <Box
          component="form"
          sx={{ paddingRight: 3, paddingLeft: 3 }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h4">Add Vendors</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="Supplier_code"
                  label="Supplier Code"
                  type="number"
                  value={vendorData.Supplier_code}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  value={vendorData.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  value={vendorData.phone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  value={vendorData.email}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address1"
                  label="Address 1"
                  type="text"
                  value={vendorData.address1}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address2"
                  label="Address 2"
                  type="text"
                  value={vendorData.address2}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  type="text"
                  value={vendorData.city}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  type="text"
                  value={vendorData.state}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  value={vendorData.country}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="zipcode"
                  label="Pin Code"
                  type="text"
                  value={vendorData.zipcode}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="contact_person"
                  label="Contact Person"
                  type="text"
                  value={vendorData.contact_person}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="contact_reference"
                  label="Contact Reference"
                  type="text"
                  value={vendorData.contact_reference}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleSave} sx={{ maxWidth: 0.5 }}>
            SAVE
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <VAdd />
    </SnackbarProvider>
  );
}
