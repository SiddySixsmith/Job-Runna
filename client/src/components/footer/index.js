import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import OpacityIcon from "@mui/icons-material/Opacity";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { LinkContainer } from "react-router-bootstrap";
import Auth from "../../utils/auth";

function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, bgcolor: "black" }}
      elevation={3}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <LinkContainer to={"/home"}>
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Home"
          icon={<HomeIcon sx={{ color: "white", fontSize: 40 }} />}
        />
      </LinkContainer>
      <LinkContainer to={"/stock"}>
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Stock"
          icon={<OpacityIcon sx={{ color: "white", fontSize: 40 }} />}
        />
      </LinkContainer>
      <LinkContainer to={"/jobs"}>
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Jobs"
          icon={<WorkIcon sx={{ color: "white", fontSize: 40 }} />}
        />
      </LinkContainer>
      <BottomNavigationAction
        sx={{ color: "white" }}
        label="Logout"
        onClick={Auth.logout}
        icon={<LogoutIcon sx={{ color: "white", fontSize: 40 }} />}
      />
    </BottomNavigation>
  );
}

export default Footer;
