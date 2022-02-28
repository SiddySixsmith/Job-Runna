import React from "react";
import { BottomNavigation, BottomNavigationAction, Link } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import OpacityIcon from "@mui/icons-material/Opacity";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { LinkContainer } from "react-router-bootstrap";
import Auth from "../../utils/auth";

function Footer() {
  const [value, setValue] = React.useState(0);

  const HandleLogChange = () => {
    if (Auth.loggedIn) {
      return (
        <BottomNavigationAction
          label="Logout"
          onClick={Auth.logout}
          icon={<LogoutIcon />}
        />
      );
    }
  };
  return (
    <BottomNavigation
      showLabels
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <LinkContainer to={"/home"}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </LinkContainer>
      <LinkContainer to={"/stock"}>
        <BottomNavigationAction label="Stock" icon={<OpacityIcon />} />
      </LinkContainer>
      <LinkContainer to={"/jobs"}>
        <BottomNavigationAction label="Jobs" icon={<WorkIcon />} />
      </LinkContainer>
      <HandleLogChange />
    </BottomNavigation>
  );
}

export default Footer;
