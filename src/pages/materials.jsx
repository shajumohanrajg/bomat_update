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

  
    const [jobNature,setJobNature]=useState('');
    const [worknature,setWorkNature]=useState('');
    const [charges,setCharges]=useState('');
    const [dept,setDept]=useState('');
    const [type,setType]=useState('');
    const [matcode,setMatCode]=useState('');
    const [material,setMaterial]=useState('');
    const [price,setPrice]=useState('');
    const [width,setWidth]=useState('');
    const [height,setHeight]=useState('');
    const [sqft,setSqft]=useState('');
    const [quantity,setQuantity]=useState('');
    const [cost,setCost]=useState('');
    const [ po,setPo]=useState('');
    const [vendor,setVendor]=useState('');
    const [details,setDetails]=useState('');
    const [grvalue,setGrValue]=useState('');
    const [gst,setGst]=useState('');
    const [netpayable,setNetPayable]=useState('');
    const [billno,setBillNo]=useState('');
    const [billdate,setBillDate]=useState('');
    const [gstvalue,setGstValue]=useState('');
   
  
 
 
  
  
 
  
  
  const handleItemChange=(e)=>{
    const newdata={...itemList}
    newdata[e.target.id]=e.target.value
    setItemList(newdata)
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
                Update Purchase Order
              </Typography>
              <Typography variant="h6">Vendor</Typography>
           
  
  
  
  
              <TextField
                id="jobnature"
                label="Job Nature"
                select
                value={jobNature}
                onChange={(e)=>setJobNature(e.target.value)}
                helperText="Please select Job Nature"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              
  
  
  
              <TextField
                id="worknature"
                label="Work Nature"
                select
                value={worknature}
                onChange={(e)=>setWorkNature(e.target.value)}
                helperText="Please select Work Nature"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="charges"
                label="Charges"
                select
                value={charges}
                onChange={(e)=>setCharges(e.target.value)}
                helperText="Please select charges"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="dept"
                label="Department"
                select
                value={dept}
                onChange={(e)=>setDept(e.target.value)}
                helperText="Please select Department"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="type"
                label="Type"
                select
                value={type}
                onChange={(e)=>setType(e.target.value)}
                helperText="Please select type"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
  
              <TextField
                id="matcode"
                label="Material Code"
                select
                value={matcode}
                onChange={(e)=>setMatCode(e.target.value)}
                helperText="Please select material code"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="material"
                label="Material"
                select
                value={material}
                onChange={(e)=>setMaterial(e.target.value)}
                helperText="Please select material"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
  
              <TextField
                id="price"
                label="Price"
                select
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                helperText="Please select price"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="width"
                label="Width"
                select
                value={width}
                onChange={(e)=>setWidth(e.target.value)}
                helperText="Please select width"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="height"
                label="Height"
                select
                value={height}
                onChange={(e)=>setHeight(e.target.value)}
                helperText="Please select height"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="sqft"
                label="Sqft"
                select
                value={sqft}
                onChange={(e)=>setSqft(e.target.value)}
                helperText="Please select square feet"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="sqft"
                label="Squre Feet"
                select
                value={sqft}
                onChange={(e)=>setSqft(e.target.value)}
                helperText="Please select square feet"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="quantity"
                label="Quantity"
                select
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                helperText="Please select quantity"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="cost"
                label="Cost"
                select
                value={cost}
                onChange={(e)=>setCost(e.target.value)}
                helperText="Please select cost"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="po"
                label="Purchase Order"
                select
                value={po}
                onChange={(e)=>setPo(e.target.value)}
                helperText="Please select purchase order"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="vendor"
                label="Vendor"
                select
                value={vendor}
                onChange={(e)=>setVendor(e.target.value)}
                helperText="Please select vendor"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="details"
                label="Details"
                select
                value={details}
                onChange={(e)=>setDetails(e.target.value)}
                helperText="Please select details"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}</TextField>
              <TextField
                id="grvalue"
                label="Gross Value"
                select
                value={grvalue}
                onChange={(e)=>setGrValue(e.target.value)}
                helperText="Please select gross value"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="gst"
                label="GST"
                select
                value={gst}
                onChange={(e)=>setGst(e.target.value)}
                helperText="Please select gst"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="netpayable"
                label="Net Paybale"
                select
                value={netpayable}
                onChange={(e)=>setNetPayable(e.target.value)}
                helperText="Please select net payable"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="billno"
                label="Bill No"
                select
                value={billno}
                onChange={(e)=>setBillNo(e.target.value)}
                helperText="Please select bill no"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="billdate"
                label="Bill Date"
                select
                value={billdate}
                onChange={(e)=>setBillDate(e.target.value)}
                helperText="Please select bill date"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                id="gstvalue"
                label="Gst Value"
                select
                value={gstvalue}
                onChange={(e)=>setGstValue(e.target.value)}
                helperText="Please select gst value"
                variant="outlined"
              >
                {data1.map((items) => (
                  <MenuItem key={items.id} value={items.name}>
                    {items.name}
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
                      value={itemList.title}
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
  
  const data1 = [
    {
      id: "1",
      name: "Action",
     
    
    },
    {
      id: "2",
      name: "Another Action",
     
    
    },
    {
      id: "3",
      name: "Something Else",
     
    
    },
  ];
  
  
  export default function IntegrationNotistack() {
    return (
      <SnackbarProvider maxSnack={5}>
        <IAdd />
      </SnackbarProvider>
    );
  }
  