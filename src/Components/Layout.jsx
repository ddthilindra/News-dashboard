import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;
const useStyle = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    wlcm: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});
export default function Layout({ children }) {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();

  const menuLinks = [
    { name: "Dashbord", path: "/", icon: <DashboardIcon color="primary" /> },
    { name: "News", path: "/news", icon: <NewspaperIcon color="primary" /> },
    { name: "Editors", path: "/editors", icon: <AccountBoxIcon color="primary" />},
    { name: "Logins", path: "/logins", icon: <VerifiedUserIcon color="primary" /> },
  ];

  return (
    <div className={classes.root}>
      <AppBar color="" className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.wlcm}>Welcome</Typography>
          <Typography>User</Typography>
          <Avatar src="./assets/user.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            News
          </Typography>
        </div>
        <List>
          {menuLinks.map((item) => (
            <ListItem
              key={item.name}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
