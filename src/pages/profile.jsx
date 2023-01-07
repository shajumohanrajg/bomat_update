import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Page from "../components/Page";

const Profile = () => {
  return (
    <Page title="Profile">
      <div className="profile">
        <Typography variant="h4">My Account</Typography>
        <Typography>Team:</Typography>
        {/* {...props} */}
        <Typography>E-Mail: </Typography>
        {/* {props} */}
        <Divider />
        <div className="profile_button">
          <Button
            variant="outlined"
            color="info"
            startIcon={<EditIcon />}
            href="/dashboard/profile/edit"
          >
            Edit Team
          </Button>
          <Button variant="contained" color="error" href="/login">
            Log Out
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default Profile;
