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
    const [itemList, setItemList] = useState({items: [
      {
      unit_price:0,
      title:'',
      quantity:0,
      gst:0,
      gst_amount:0,
      net_amount:0,
      }
    ]
    });
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
  
    useEffect(()=>{
      vendors.map((v) =>(
        vendorValue===v.name?
        setIdofvendor(v.id):null
      ))
    },[vendorValue, vendors])
    
    useEffect(()=>{
      branches.map((b) =>(
        branchValue===b.name?
        setIdofbranch(b.id):null
      ))
    },[branchValue, branches])
    
    useEffect(()=>{
      Axios.get('http://10.8.1.170:4545/api/v1/vendor',{
      }).then((response) => {
            // console.log("vendor",response.data);
            const vendors=response.data;
            setVendors(vendors);
          }, (error) => {
            console.log(error);
        });
      },[])
    useEffect(()=>{
      Axios.get('http://10.8.1.170:4545/api/v1/branches',{
      }).then((response) => {
            // console.log("branches",response.data);
            const branches=response.data;
            setBranches(branches);
          }, (error) => {
            console.log(error);
        });
      },[])
    const handleUpdate= async(e)=>{
      e.preventDefault();
      Axios.put(`http://10.8.1.170:4545/api/v1/po/${id}`,{
        vendor: idofvendor,
        sender_reference: senderRef,
        gst_amount: gstAmount,
        net_amount: net,
        items: itemList.items,
        branches: idofbranch,
    }).then((response) => {
          // console.log(response);
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
  
    useEffect(() => {
      const newTotal = async()=> {
          var arr = document.getElementsByName("gross");
          var newtotal = 0;
          for(var i = 0; i < arr.length; i++) {
              if(arr[i].value) {
                  newtotal += +arr[i].value;
              }
              setNet(newtotal)
          }
      }
      newTotal()
  })
    useEffect(() => {
      const newGST = async()=> {
        var arr1 = document.getElementsByName("gstamount");
        var newgst = 0;
        for(var i = 0; i < arr1.length; i++) {
            if(arr1[i].value) {
                newgst += +arr1[i].value;
                setGstAmount(newgst)
            }
        }
    }
    newGST()
    })
  
  const handleItemRemove= (index) => {
      const list=itemList.items;
      list.splice(index,1);
      setItemList((prevState)=>({...prevState,list}));
  };
  
  const handleItemAdd = (e) => {
      e.preventDefault()
      setItemList((prevState)=>({...prevState, items:[...prevState.items, 
      {
        unit_price:0,
        title:'',
        quantity:0,
        gst:0,
        gst_amount:0,
        net_amount:0,
    }]}));
  };
  
  const handleItemChange=(e,index)=>{
    const list =[...itemList.items];
    list[index][e.target.name]=e.target.value;
    setItemList({...itemList, items:list});
  };
  
  useEffect(()=> {
    const list = [...itemList.items];
    const percent = list[search_index].gst / 100;
    const total = list[search_index].quantity * list[search_index].unit_price;
    list[search_index].gst_amount=Math.round(total * percent)
    list[search_index].net_amount=list[search_index].gst_amount + total;
  },[itemList, search_index])
  
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
                Update Purchase Order
              </Typography>
              <Typography variant="h6">Vendor</Typography>
              <TextField
                id="vendor"
                label="Vendor"
                select
                value={vendorValue}
                onChange={(e)=>setVendorValue(e.target.value)}
                helperText="Please select vendor"
                variant="outlined"
              >
                {vendors.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="h6">Items</Typography>
              {itemList.items.map((items,index) => (
              <div key={index} className="item-list">
                <Grid container spacing={2} sx={{ pr: 5 }}>
                  <Grid item xs={6} md={6} xl={4}>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
                      onClick={()=>setSearch_index(index)}
                      type="text"
                      value={items.title}
                      onChange={(e)=>handleItemChange(e,index)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="price"
                    name="unit_price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    onClick={()=>setSearch_index(index)}
                    value={items.unit_price===0?"":items.unit_price}
                    onChange={(e)=>handleItemChange(e,index)}
                  /></Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    onClick={(e)=>setSearch_index(index)}
                    value={items.quantity===0?"":items.quantity}
                    onChange={(e)=>handleItemChange(e,index)}
                  /></Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    id="gst"
                    name="gst"
                    fullWidth
                    label="GST"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PercentIcon />
                        </InputAdornment>
                      ),
                    }}
                    onClick={()=>setSearch_index(index)}
                    value={items.gst===0?"":items.gst}
                    onChange={(e)=>handleItemChange(e,index)}
                  >
                  </TextField></Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="gstamount"
                    name="gstamount"
                    label="GST Amount"
                    type="number"
                    variant="outlined"
                    value={items.gst_amount}
                    disabled
                  /></Grid>
                  <Grid item xs={6} md={6} xl={4}><TextField
                    fullWidth
                    id="gross"
                    name="gross"
                    label="Gross Amount"
                    type="number"
                    variant="outlined"
                    value={items.net_amount}
                    disabled
                  /></Grid>
                  {itemList.items.length!==1 && (
                  <Grid item xs={6} md={6} xl={4}>
                    <Button
                    sx={{ maxWidth: 8}} 
                    size="medium" 
                    variant="outlined"
                    onClick={()=>handleItemRemove(index)}
                    >
                      -
                    </Button>
                    </Grid>
                  )}
                </Grid>
                {itemList.items.length - 1 === index && (
                  <div className="plus-btn">
                    <Button 
                    sx={{ maxWidth: 8}} 
                    size="medium" 
                    variant="outlined"
                    onClick={(e)=>handleItemAdd(e)}
                    >
                    +
                    </Button>
                  </div>
                )}
              </div>
              ))}
              <TextField
                id="sender"
                label="Sender Reference"
                type="text"
                value={senderRef}
                onChange={(e)=>setSenderRef(e.target.value)}
                variant="outlined"
              />
              <Typography variant="h6">Branches</Typography>
              <TextField
                id="branches"
                label="Branches"
                select
                value={branchValue}
                onChange={(e)=>setBranchValue(e.target.value)}
                helperText="Please select the branch"
                variant="outlined"
              >
                {branches.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <Divider />
              <br />
              <Typography variant="h6">Total</Typography>
              <Stack spacing={1}>
                <Typography>GST Amount: {gstAmount}</Typography>
                <Typography>Gross Amount: {net}</Typography>
              </Stack>
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
  