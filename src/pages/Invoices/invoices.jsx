import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { SnackbarProvider,useSnackbar } from "notistack";
import React from "react";
import {createBrowserHistory} from 'history';
import axios from "axios";
import Page from "../../components/Page";

const Orders = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  // const [vendorData, setVendorData] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [poData, setPoData] = React.useState([]);

  React.useEffect(()=>{
    axios.get("http://10.8.1.170:4545/api/v1/items_list").then((res)=>{
      // console.log(res.data)
      setItems(res.data)
    });
  }, []);

  React.useEffect(() => {
    // console.log("fetched");
    axios.get("http://10.8.1.170:4545/api/v1/po_list").then((res) => {
      // console.log(res.data)
      setPoData(res.data)
    });
  }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
    axios.delete(`http://10.8.1.170:4545/api/v1/po/${id}`).then(()=>{
        // console.log("deleted",res)
        enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }).catch (err => console.log(err))
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/po/update/${id}`)
    window.location.reload();
  }

  // console.log("Check", items);
  return (
    <Page title="Poorvika | Purchase Order">
      <div className="navigation_purchase">
        <Typography variant="h4">Purchase Orders</Typography>
        <Button variant="contained" color="primary" href="po/add">
          Add Purchase Order
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {poData.map((p)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {p.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                Vendor Name: {p.vendor.name} 
                </Typography>
                <Typography>
                  {p.title}
                </Typography>
                {
                  items.map((i)=>
                  p.id===i.Purchase_order.id ?
                  <div>
                  <Typography variant="h5" component="div">
                  Items
                  </Typography>
                  <Typography color="text.secondary">
                  Title: {i.title}
                  </Typography>
                  <Typography color="text.secondary">
                  Price: {i.unit_price}
                  </Typography>
                  <Typography color="text.secondary">
                  Quantity: {i.quantity}
                  </Typography>
                  <Typography color="text.secondary">
                  GST: {i.gst}%
                  </Typography>
                  <Typography color="text.secondary">
                  Net Amount: {i.net_amount}
                  </Typography>
                  </div> : null
                  )
                }
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Sender Reference: {p.sender_reference}
                </Typography>
                <Typography>
                GST Amount: {p.gst_amount}
                </Typography>
                <Typography>
                Gross Amount: {p.net_amount}
                </Typography>
                <Typography>
                Branch: {p.branches.name},{p.branches.state}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(p.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(p.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      </div>

    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Orders />
    </SnackbarProvider>
  );
}

