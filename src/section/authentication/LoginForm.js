import * as Yup from "yup";
import { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// import { useLocation } from "react-router-dom";
// material
import {
  // Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import useAuth from "../../hooks/useAuth";
// component
import { SnackbarProvider,useSnackbar } from 'notistack';
import Iconify from "../../components/Iconify";
import axios from "axios";
import { createBrowserHistory } from "history";
// ----------------------------------------------------------------------

const LoginForm= ()=> {
  const {enqueueSnackbar} = useSnackbar();
  // const navigate = useNavigate();
  // const { login } = useAuth();
  const history= createBrowserHistory();
  // const { state } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  
  const initialValues = {
    email: "",
    password: "",
    remember: true,
  }
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     remember: true,
  //   },
  //   validationSchema: LoginSchema,
  //   onSubmit: () => {
  //     login().then(() => {
  //       navigate(state?.path || "/dashboard/homepage", { replace: true });
  //       console.log(state);
  //     });
  //   },
  // });

  const handleCheck = (data) => {
    localStorage.setItem('User-id', data.email)
    // console.log(data)
    // console.log(JSON.stringify(data,null,2))
     axios.post("http://10.8.1.170:4545/api/v1/login/", {
        email: data.email,
        password: data.password,
     }).then((response)=> {
                // const { token } = response.data.token;
                localStorage.setItem('access_token',response.data.token.access);
                // localStorage.setItem('refresh_token',response.data.token.refresh);
                const send=localStorage.getItem('access_token');
                // dispatch({
                //     type: STORE_USER,
                //     payload: response.data
                // })
            // console.log(response.data.status);
         if(!send && response.status===404){
            enqueueSnackbar('Invalid User' , { variant:'error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } ); 
          } else{
            enqueueSnackbar('Succesful Login', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} }); 
            history.push("/dashboard/homepage")
            setTimeout(() => {
              window.location.reload();
            },1000);
            // navigate("/dashboard/homepage", { replace: true });    

          }
        })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: handleCheck,
    });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          {/* <Link
            component={RouterLink}
            variant="subtitle2"
            to="/forgot_password"
            underline="hover"
          >
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <LoginForm />
    </SnackbarProvider>
  );
}
