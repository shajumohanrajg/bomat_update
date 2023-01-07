import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/dashboard/homepage">
      <Box
        component="img"
        src={require("../assets/images/poorvika-logo.png")}
        sx={{ width: 65, height: 65, ...sx }}
      />
    </RouterLink>
  );
}
