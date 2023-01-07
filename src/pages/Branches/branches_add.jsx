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

const BAdd = () => {

  const history= createBrowserHistory();
  const {enqueueSnackbar} = useSnackbar();
  const url="http://10.8.1.170:4545/api/v1/branches"
  const [branchData,setBranchData]= useState({
    name:"",
    email:"",
    pincode:"",
    phone:"",
    address1:"",
    address2:"",
    city:"",
    state:"",
    country:"",
    GST_number:"",
  })

  const handleChange=(e)=>{
    const newdata={...branchData}
    newdata[e.target.id]=e.target.value
    setBranchData(newdata)
}

  const handleSave=(e)=>{
    e.preventDefault();
    Axios.post(url,branchData) 
    .then((response) => {
        // console.log(response); 
        enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        history.push("/dashboard/branches")
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }, (error) => {
        console.log(error);
        enqueueSnackbar('Check values and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
    });
  }
  return (
    <Page title="Poorvika | Branches | Add">
      <Container maxWidth="xl">
      <Box
          component="form"
          sx={{ paddingRight: 3, paddingLeft: 3 ,}}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
            
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h">Add Branches</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  value={branchData.name}
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
                  value={branchData.phone}
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
                  value={branchData.email}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="GST_number"
                  label="GST Number"
                  type="text"
                  value={branchData.GST_number}
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
                  value={branchData.address1}
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
                  value={branchData.address2}
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
                  value={branchData.city}
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
                  value={branchData.state}
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
                  value={branchData.country}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="pincode"
                  label="Pin Code"
                  type="text"
                  value={branchData.pincode}
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
      <BAdd />
    </SnackbarProvider>
  );
}
