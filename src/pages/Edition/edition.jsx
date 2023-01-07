// import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import Axios from 'axios';
// import { DataGrid } from "@mui/x-data-grid";
import { SnackbarProvider,useSnackbar } from 'notistack';
// @mui
// import { styled } from '@mui/material/styles';
import { 
  // Container,
  Typography, 
  Grid,
  TextField,
  MenuItem,
  Divider,
  Button,
  Box,
 } from '@mui/material';
// components
import Page from '../../components/Page';
import EditionTable from '../Edition/editionTable';

// ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0)
// }));

// ----------------------------------------------------------------------

const Edition = ()=>{
  const {enqueueSnackbar} = useSnackbar();
  // const [tableData, setTableData] = React.useState([]);
  const [editionCheck,setEditionCheck] = React.useState([]);
  const [publication,setPublication]= React.useState([]);
  const [editionValue,setEditionValue] = React.useState('');
  const [edition,setEdition] = React.useState([]);
  const [idofdistrict,setIdofdistrict] = React.useState(0);
  const [idofedition,setIdofedition] = React.useState(0);
  const [districtCheck,setDistrictCheck] = React.useState([]);
  const [state,setState]= React.useState([]);
  const [districtValue,setDistrictValue] = React.useState('');
  const [district,setDistrict] = React.useState([]);
  
  // const columns =[
  //   { 
  //     field: "edition", 
  //     headerName: "Publication", 
  //     flex:1,
  //     valueFormatter: ({value}) => value.pub.pub_name,
  //   }, 
  //   { 
  //     field: "edition", 
  //     headerName: "Edition", 
  //     flex: 1,
  //     valueFormatter: ({value}) => value.edition,
  // },
  //   { 
  //     field: "district", 
  //     headerName: "District", 
  //     flex: 1,
  //     valueFormatter: ({value}) => value.district,
  // },
  //     { 
  //       field: "district", 
  //       headerName: "State", 
  //       flex: 1,
  //       valueFormatter: ({value}) => value.state.state,
  //     },
  // ];
  const arrayUniqueByPubName = [...new Map(publication.map(item =>
    [item["pub_name"], item])).values()];
  const arrayUniqueByStateName = [...new Map(state.map(item =>
    [item["state"], item])).values()];

  const handlePublication=(id)=>{
    const pub = edition.filter(x => x.pub.id === id);
    setEditionCheck(pub);
  }
  const handleState=(id)=>{
    const st = district.filter(x => x.state === id);
    setDistrictCheck(st); 
  }

  // React.useEffect(() => {
  //   fetch("https://poorvikadashboard.herokuapp.com/api/v1/Edition_save_list")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data));
  //     // console.log(tableData);
  // }, []);


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
    Axios.get('http://10.8.1.170:4545/api/v1/District',{
    }).then((response) => {
      // console.log("edition",response.data);
      const districts=response.data; 
      setDistrict(districts);
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
      Axios.get('http://10.8.1.170:4545/api/v1/State',{
      }).then((response) => {
            const states=response.data;
            setState(states);
          }, (error) => {
            console.log(error);
        });
      },[])


  React.useEffect(()=>{
    edition.map((e) => (
      editionValue===e.edition?
      setIdofedition(e.id):null
    ))
  },[edition,editionValue])
  React.useEffect(()=>{
    district.map((d) => (
      districtValue===d.district?
      setIdofdistrict(d.id):null
    ))
  },[district,districtValue])
  const handleSubmit=(e) =>{
    e.preventDefault();
    Axios.post('http://10.8.1.170:4545/api/v1/Edition_Add',{
      edition: idofedition,
      district: idofdistrict,
    }).then((response) => {
      enqueueSnackbar('Data Entry Successful', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      // console.log(response);
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    },(error) => {
      enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      console.log(error);
    });
  }


  return (
    <div className="edition">
      <Page title="Poorvika | Edition | Mapping">
        <div className="edition_head">
          <Typography variant="h4">Edition Mapping</Typography>
        </div>
        {/* <Container> */}
          {/* <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h3" paragraph>
              Sorry, Page Under Construction!
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              Please Hold on Until this page is completed.
            </Typography>

            <Box
              component="img"
              src={require("../assets/images/illustration_404.png")}
              sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </ContentStyle> */}
          <Grid container spacing={3} sx={{ pr: 5 }}>
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
                <Grid item xs={12} md={6} xl={6}>
                <TextField
                    fullWidth
                    id="edition"
                    label="Edition"
                    select
                    value={editionValue}
                    onChange={(e)=>setEditionValue(e.target.value)}
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
                  : "No Edition"
                  }
                  </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6}>   
                <TextField
                      fullWidth
                      id="state"
                      label="State"
                      select
                      unique
                      onChange={(e)=>handleState(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem disabled>Select State</MenuItem>
                      {arrayUniqueByStateName &&
                      arrayUniqueByStateName !== undefined?
                      arrayUniqueByStateName.map((option,index) => (
                        <MenuItem key={index} value={option.id}>
                          {option.state}
                        </MenuItem>
                      ))
                      :"No State"
                      }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                <TextField
                    fullWidth
                    id="district"
                    label="District"
                    select
                    value={districtValue}
                    onChange={(e)=>setDistrictValue(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem disabled>Select District</MenuItem>
                    {districtCheck &&
                    districtCheck !== undefined?
                    districtCheck.map((option,index) => (
                      <MenuItem key={index} value={option.district}>
                        {option.district}
                      </MenuItem>
                    ))
                  :"No District"
                  }
                  </TextField>
                  </Grid>
              </Grid>
              <Divider sx={{ mt: 5, mb: 5 }} />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" size="large" onClick={handleSubmit} sx={{ maxWidth: 0.5 }}>
                  Map
                </Button>
              </Box>
              <br />
              <EditionTable edition={editionValue} />
              {/* <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid getRowId={(r)=>r.id} rows={tableData} columns={columns} />
              </Box> */}

        {/* </Container> */}
      </Page>
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Edition />
    </SnackbarProvider>
  );
}