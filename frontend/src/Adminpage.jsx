import { useState } from "react";

import {
  Typography,
  Grid,
  Avatar,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Administrators from "./Adminpagecomponents/Administrators";
import Approvals from "./Adminpagecomponents/Approvals";
import Users from "./Adminpagecomponents/Users";

const Adminpage = () => {
  const [activeComponent, setActiveComponent] = useState("Users");

  const handleLinkClick = (newComponent) => {
    setActiveComponent(newComponent);
  };

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Grid sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2, gap: 10 }}>
        <Typography variant="h4" align="center" color="white">
          Administrator Panel
        </Typography>
        <Grid>
          <Button variant="contained" color="primary">
            Add New Administrator
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={2} sx={{
          backgroundColor: "#eaeff1",
          height: "550px",
          border: "1px solid black",
          display: "flex",
          justifyContent:"space-between",
          flexDirection: "column",
          p: 2,
          m: 2,
          borderRadius: 5,
        }}>
          <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Avatar alt="Jeevant Verma" src="/static/images/avatar/1.jpg" />
            <Typography variant="h6" align="center">
              Jeevant Verma
            </Typography>
          </Grid>
          <List>
            <ListItem button onClick={() => handleLinkClick("Users")}>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => handleLinkClick("Administrators")}>
              <ListItemText primary="Administrators" />
            </ListItem>
            <ListItem button onClick={() => handleLinkClick("Approvals")}>
              <ListItemText primary="Approval Requests" />
            </ListItem>
          </List>
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Grid>
        <Grid item xs={9} sx={{
          backgroundColor: "#eaeff1",
          height: "550px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          p: 2,
          m: 2,
          borderRadius: 5,
        }}>
          {activeComponent === "Users" && <Users />}
          {activeComponent === "Administrators" && <Administrators />}
          {activeComponent === "Approvals" && <Approvals />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Adminpage;