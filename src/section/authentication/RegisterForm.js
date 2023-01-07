import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import { SnackbarProvider,useSnackbar } from 'notistack';
import Iconify from "../../components/Iconify";
import { createBrowserHistory } from "history";
import axios from "axios";
// ----------------------------------------------------------------------

const RegisterForm= () => {
  // const navigate = useNavigate();
  const history = createBrowserHistory();
  const {enqueueSnackbar} = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const iValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: true,
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    // lastName: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    password2: Yup.string()
                          .label("Confirm Password")
                          .required("Enter the Same password")
                          .oneOf([Yup.ref("password"),null], "Password doesnt not match")
  });


  const handleCheck = (data) => {

    // console.log(data)
    // console.log(JSON.stringify(data,null,2))
     axios.post("http://127.0.0.1:8000/api/v1/register/", {
        email: data.email,
        name: data.name,
        password2: data.password2,
        password: data.password,
        tc: data.tc,
     }).then((response)=> {
          if(response.success){
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
    initialValues: iValues,
    validationSchema: RegisterSchema,
    // onSubmit: () => {
    //   navigate("/login", { replace: true });
    // },
    onSubmit: handleCheck,
  });

  const { errors, touched, handleSubmit, values, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}> */}
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
{/* 
            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}

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
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
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
          <TextField
            fullWidth
            // autoComplete="current-password"
            type={showPassword1 ? "text" : "password"}
            label="Re-Enter Password"
            {...getFieldProps("password2")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword1((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword1 ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password2 && errors.password2)}
            helperText={touched.password2 && errors.password2}
          />

          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("tc")}
                checked={values.tc}
              />
            }
            label="I accept the terms and conditions"
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <RegisterForm />
    </SnackbarProvider>
  );
}