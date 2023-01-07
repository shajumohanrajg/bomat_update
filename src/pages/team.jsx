import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import Page from "../components/Page";

const Team = () => {
  return (
    <Page title="Profile | Team">
      <Container maxWidth="md">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
          <Typography sx={{ padding: 5 }} variant="h4">
            Edit team
          </Typography>
          <Stack spacing={2}>
            <TextField id="name" label="Name" type="text" variant="outlined" />
            <TextField
              id="phone_number"
              label="Phone Number"
              type="number"
              variant="outlined"
            />
            <TextField
              id="gst_number"
              label="GST NUMBER"
              type="text"
              variant="outlined"
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              id="address"
              label="Address 1"
              type="text"
              variant="outlined"
            />
            <TextField
              id="address"
              label="Address 2"
              type="text"
              variant="outlined"
            />
            <TextField
              id="zip_code"
              label="Zip Code"
              type="number"
              variant="outlined"
            />
            <TextField
              id="street"
              label="Street"
              type="text"
              variant="outlined"
            />
            <TextField id="city" label="City" type="text" variant="outlined" />
            <TextField
              id="country"
              label="Country"
              type="text"
              variant="outlined"
            />

            <Divider />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" size="large" sx={{ maxWidth: 0.5 }}>
                SAVE
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Page>
  );
};

export default Team;
