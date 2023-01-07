import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import PickersDay from "@mui/lab/PickersDay";
import startOfDay from "date-fns/startOfDay";
import DatePicker from "@mui/lab/DatePicker";
import Page from "../../components/Page";
import Axios from "axios";
import { SnackbarProvider,useSnackbar } from 'notistack';
import PercentIcon from "@mui/icons-material/Percent";
import { createBrowserHistory } from "history";

// const CustomPickersDay = styled(PickersDay, {
//   shouldForwardProp: (prop) => prop !== "selected"
// })(({ theme, selected }) => ({
//   ...(selected && {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     "&:hover, &:focus": {
//       backgroundColor: theme.palette.primary.dark
//     },
//     borderTopLeftRadius: "50%",
//     borderBottomLeftRadius: "50%",
//     borderTopRightRadius: "50%",
//     borderBottomRightRadius: "50%"
//   })
// }));

const RAdd = () => {

  const {enqueueSnackbar} = useSnackbar();
  const [ro_value, setRovalue] = React.useState([startOfDay(new Date())]);
  const history= createBrowserHistory();
  const [pub_value, setPubvalue] = React.useState({ date:[
    {
      pub_date:null,
    }
  ]
  });
  const [gross, setGross] = React.useState(0);
  const [gst, setGst] = React.useState(0);
  const [gsta, setGsta] = React.useState(0);
  const [net, setNet] = React.useState(0);
  const [addtype,setAddtype] = React.useState('');
  const [size,setSize] = React.useState('');
  const [color,setColor] = React.useState('');
  const [vendors, setVendors] =React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [idofvendor,setIdofvendor] = React.useState(0);
  const [idofbranch,setIdofbranch] = React.useState(0);
  const [idofedition,setIdofedition] = React.useState(0);
  const [send_date,setSendDate] = React.useState("");
  const [publication,setPublication]= React.useState([]);
  const [edition,setEdition] = React.useState([]);
  const [editionCheck,setEditionCheck] = React.useState([]);
  const [vendorValue,setVendorValue] = React.useState('');
  const [editionValue,setEditionValue] = React.useState('');
  const [branchValue,setBranchValue] = React.useState('');

  const arrayUniqueByPubName = [...new Map(publication.map(item =>
    [item["pub_name"], item])).values()];

  React.useEffect(()=>{
    Axios.get('http://10.8.1.170:4545/api/v1/vendor',{
    }).then((response) => {
          // console.log("vendor",response.data);
          const vendors=response.data;
          setVendors(vendors);
        }, (error) => {
          console.log(error);
      });
    },[])
  React.useEffect(()=>{
    Axios.get('http://10.8.1.170:4545/api/v1/Edition',{
    }).then((response) => {
      // console.log("edition",response.data);
      const editions=response.data; 
      setEdition(editions);
    }, (error) => {
      console.log(error);
    });
  },[])

  React.useEffect(()=>{
    Axios.get('http://10.8.1.170:4545/api/v1/branches',{
    }).then((response) => {
          const branches=response.data;
          setBranches(branches);
        }, (error) => {
          console.log(error);
      });
    },[])
    React.useEffect(()=>{
      Axios.get('http://10.8.1.170:4545/api/v1/Publication',{
      }).then((response) => {
            const publications=response.data;
            setPublication(publications);
          }, (error) => {
            console.log(error);
        });
      },[])

    React.useEffect(()=>{
      let newDate = new Date(ro_value)
      let date = newDate.getDate();
      let month = newDate.getMonth()+1;
      let year = newDate.getFullYear();
      setSendDate(year+'-'+month+'-'+date)
    },[ro_value])

    React.useEffect(()=>{
      vendors.map((v)=>(
        vendorValue===v.name?
        setIdofvendor(v.id):null
      ))
    },[vendorValue, vendors])

    React.useEffect(()=>{
      edition.map((e)=>(
        editionValue===e.edition?
        setIdofedition(e.id):null
      ))
    },[editionValue, edition])

  // React.useEffect(()=>{
  //   const eid=[...idofedition]
  //   for(let i=0;i<editionValue.length;i++) {  
  //   for(let j=0;j<edition.length;j++){
  //     if(editionValue[i].eValue===edition[j].edition){
  //       eid[i].edition=edition[j].id 
  //       setIdofedition(eid)}
  //     }}
  //   },[edition, editionValue, idofedition])
    React.useEffect(()=>{
      branches.map((b)=>(
        branchValue===b.name?
        setIdofbranch(b.id):null
      ))
    },[branches,branchValue])

  const handleSubmit=(e) =>{
    e.preventDefault();
    Axios.post('http://10.8.1.170:4545/api/v1/ro',{
        // id: id,
        ro_date: send_date,
        Add_type: addtype,
        Size: size,
        vendor: idofvendor,
        color: color,
        gross_amount: gross,
        gst: gst,
        gst_amount: gsta,
        net_amunt: net,
        billing_address: idofbranch+1,
        edition: [
          {edition:idofedition}
        ],
        pub_date: pub_value.date,
    }).then((response) => {
      enqueueSnackbar('Data Entry Successful', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      // console.log(response);
      history.push("/dashboard/release_orders")
        setTimeout(() => {
          window.location.reload();
        }, 1000);  
    },(error) => {
      enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      console.log(error);
    });
  }

  // const findDate = (dates, date) => {
  //   const dateTime = date.getTime();
  //   return dates.find((item) => item.getTime() === dateTime);
  // };

  // const findIndexDate = (dates, date) => {
  //   const dateTime = date.getTime();
  //   return dates.findIndex((item) => item.getTime() === dateTime);
  // };

  // const renderPickerDay = (date, selectedDates, pickersDayProps) => {
  //   if (!pub_value) {
  //     return <PickersDay {...pickersDayProps} />;
  //   }

  //   const selected = findDate(pub_value, date);

  //   return (
  //     <CustomPickersDay
  //       {...pickersDayProps}
  //       disableMargin
  //       selected={selected}
  //     />
  //   );
  // };

  const handlePublication=(id)=>{
    const pub = edition.filter(x => x.pub.id === id);
    setEditionCheck(pub);
  }
  const handleItemRemove= (index) => {
    const list=pub_value.date;
    list.splice(index,1);
    setPubvalue((prevState)=>({...prevState,list}));
};

const handleItemAdd = (e) => {
    e.preventDefault()
    setPubvalue((prevState)=>({...prevState, date:[...prevState.date, 
    {
      pub_date: null,
  }]}));
};

// const handleEditionChange=(e,index)=>{
//   const elist = [...editionValue];
//   elist[index].eValue=e.target.value;
//   setEditionValue(elist);
// };

// const handleEditionRemove= (index) => {
//   const elist=[...editionValue];
//   elist.splice(index,1);
//   setEditionValue(elist);
// };

// const handleEditionAdd = () => {
//   setEditionValue([...editionValue, {eValue:''}]);
// };

  React.useEffect(() => {
    const percent = gst / 100;
    setGsta(Math.round(gross * percent));
    setNet(Number(gsta + gross));
  }, [gst,gross,gsta]);

  const gstClick = () => {
    if(gst===0)
      setGst('')
  }

  const grossClick = () => {
    if(gross===0)
      setGross('')
  }

  return (
    <Page title="Poorvika | Release Order">
      <Container maxWidth="xl">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="h4">
              Release Order Entry form
            </Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} md={6} xl={6}>
                  <DatePicker
                    label="Ro_Date"
                    value={ro_value}
                    inputFormat="yyyy-MM-dd"
                    onChange={(newValue) => {
                      setRovalue(newValue);
                    }}
                    
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="add_type"
                  label="Add Type"
                  type="text"
                  value={addtype}
                  onChange={(e)=>setAddtype(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="size"
                  label="Size"
                  type="text"
                  value={size}
                  onChange={(e)=>setSize(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="vendor"
                  label="Vendor Name"
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
              <Grid item xs={12} md={6} xl={6}>   
              <TextField
                    fullWidth
                    id="pub"
                    label="Publication"
                    select
                    unique
                    onChange={(e)=>handlePublication(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem disabled>Select Publication</MenuItem>
                    {arrayUniqueByPubName &&
                    arrayUniqueByPubName !== undefined?
                    arrayUniqueByPubName.map((option,index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.pub_name}
                      </MenuItem>
                    ))
                    :"No Publication"
                    }
                  </TextField>
              </Grid>
              {/* {editionValue.map((ed,index) => (
                <div key={index} className="pub-list">
                  <Grid container spacing={4}> */}
                    <Grid item xs={12} md={6} xl={6}>
                      <TextField
                        fullWidth
                        id="edition"
                        name="edition"
                        label="Edition" 
                        select
                        value={editionValue}
                        onChange={(e)=>setEditionValue(e.target.value)}
                        // value={ed.eValue}
                        // onChange={(e) => handleEditionChange(e,index)}
                        variant="outlined"
                      >
                      <MenuItem disabled>Select Edition</MenuItem>
                        {editionCheck &&
                        editionCheck !== undefined?
                        editionCheck.map((option,index) => (
                          <MenuItem key={index} value={option.edition}>
                            {option.edition}
                          </MenuItem>
                        ))
                        :"No Edition"
                        }
                      </TextField>
                    </Grid>
                    {/* {editionValue.length!==1 && (
                    <Grid item xs={12} md={6} xl={6} sx={{alignSelf:'center'}}>
                      <Button
                      sx={{ maxWidth: 8}} 
                      size="medium" 
                      variant="outlined"
                      onClick={()=>handleEditionRemove(index)}
                      >
                        -
                      </Button>
                    </Grid>
                    )}
                  </Grid>
                  {editionValue.length - 1 === index && (
                    <div className="plus-btn">
                      <Button 
                      sx={{ maxWidth: 8}} 
                      size="medium"   
                      variant="outlined"
                      onClick={handleEditionAdd}
                      >
                      +
                      </Button>
                    </div>
                  )}
                  </div>
                ))} */}
          {pub_value.date.map((date,index) => (
            <div key={index} className="pub-list">
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} xl={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Published Date"
                        name="pubdate"
                        value={date.pub_date}
                        inputFormat="yyyy-MM-dd"
                        onChange={(newValue) => {
                          const list =[...pub_value.date];
                          let newDate = new Date(newValue)
                          let date = newDate.getDate();
                          let month = newDate.getMonth()+1;
                          let year = newDate.getFullYear();
                          list[index].pub_date=year+'-'+month+'-'+date;
                          setPubvalue({...pub_value, date:list});
                        }} 
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                  </LocalizationProvider>
                </Grid>
              {pub_value.date.length!==1 && (
                <Grid item xs={12} md={6} xl={6} sx={{alignSelf:'center'}}>
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
              {pub_value.date.length - 1 === index && (
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
                <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="color"
                  label="Color"
                  type="text"
                  value={color}
                  onChange={(e)=>setColor(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gross"
                  label="Gross Amount"
                  type="number"
                  variant="outlined"
                  onClick={grossClick}
                  value={gross}
                  onChange={(e)=>setGross(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst"
                  label="GST"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  onClick={gstClick}
                  onChange={(e)=>setGst(Number(e.target.value))}
                  value={gst}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst_amount"
                  label="GST Amount"
                  type="number"
                  variant="outlined"
                  value={gsta}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="net_amount"
                  label="Net Amount"
                  type="number"
                  variant="outlined"
                  value={net}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="billing_address"
                  label="Billing Address"
                  select
                  value={branchValue}
                  onChange={(e)=>setBranchValue(e.target.value)}
                  variant="outlined"
                >
                  {branches.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name},{option.state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleSubmit} sx={{ maxWidth: 0.5 }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <RAdd />
    </SnackbarProvider>
  );
}

