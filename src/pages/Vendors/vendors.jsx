import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Page from "../../components/Page";
import axios from "axios";
import {createBrowserHistory} from 'history';
import { SnackbarProvider,useSnackbar } from 'notistack';
import { useEffect } from "react";

const Vendors = (props) => {

  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  const url="http://10.8.1.170:4545/api/v1/vendor";
  const [vendorData,setVendorData]= React.useState([]);

  useEffect(()=> {
    axios.get(url)
    .then((res) => setVendorData(res.data));
      // console.log("v",vendorData);
    }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
      axios.delete(`${url}/${id}`).then(()=> {
          // console.log("deleted",res)
          enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          setTimeout(() => {
            window.location.reload(false)
          },1000);
      })
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/vendors/update/${id}`)
    window.location.reload();
  }
  
  return (
    <div className="vendors">
      <Page title="Poorvika | Vendors">
        <div className="vendors_head">
          <Typography variant="h4">Vendors</Typography>
          <br />
          <Button
            href="/dashboard/vendors/add"
            variant="contained"
            color="primary"
          >
            Add Vendor
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {vendorData.map((v)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ maxWidth:1, borderRadius: 5, minHeight: '25vh', m:'1vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {v.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                {v.name}
                </Typography>
                <Typography color="text.secondary">
                {v.phone}
                </Typography>
                <Typography sx={{ mb:1.5}} color="text.secondary">
                {v.email}
                </Typography>
                <Typography>
                  Address
                </Typography>
                <Typography noWrap variant="body2" color="text.secondary">
                {v.address1},{v.address2},{v.city},{v.state},{v.country}-{v.zipcode}
                </Typography>
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Contact Person
                </Typography>
                <Typography color="text.secondary">
                {v.contact_person}
                </Typography>
                <Typography>
                Contact Reference
                </Typography>
                <Typography color="text.secondary">
                {v.contact_reference}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(v.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(v.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      </Page>
    </div>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Vendors />
    </SnackbarProvider>
  );
}
