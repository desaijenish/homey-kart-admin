import React, { useEffect, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavItem from "./NavItem";
import multipleUser from "../../assets/icons/users-line.svg";
import user from "../../assets/icons/user.svg";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Logo from "../../assets/images/Logo.svg";
import lead from "../../assets/icons/lead.svg";
import employee from "../../assets/icons/employee.svg";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
// import { useCreateTimeTableMutation } from "../../redux/api/timetable";
import { parseJwt } from "../../utils/parseJwt";
// import { setToken } from "../../redux/authSlice";
import dashboard from '../../assets/icons/dashboard.svg'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const NavContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: 1,
  margin: "10px 0px",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const router = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const token = cookies.get("token");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // const [addTimetable] = useCreateTimeTableMutation();

  const logout = async () => {
    const cookiesGet = cookies.get("token");
    const token = parseJwt(cookiesGet);
    // await addTimetable({ timetable_id: token.timetable });
    await cookies.remove("token");
    dispatch(setToken(""));
    router(`/login`);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      setIsSuperAdmin(decodedToken?.is_super_admin || false);
    }
  }, [token]);

  if (location.pathname !== "/login" && location.pathname !== "/register") {
    if (isSuperAdmin) {
      return (
        <Box sx={{ display: "flex" }}>
          <Drawer variant="permanent" open={open}>
            <div style={{ padding: "7px", display: "flex", gap: 15 }}>
              <img src={Logo} alt="logo" width={50} />
              <ListItemText
                primary="D2 WebTech"
                sx={{ opacity: open ? 1 : 0, cursor: "pointer" }}
              />
            </div>
            <Divider />
            <NavContainer>
              <List>
                <NavItem
                  open={open}
                  onClick={() => router(`/`)}
                  label="Candidate"
                  icon={multipleUser}
                />
                <NavItem
                  open={open}
                  onClick={() => router(`/leads`)}
                  label="Leads"
                  icon={lead}
                />
                <NavItem
                  open={open}
                  onClick={() => router(`/employee`)}
                  label="Employee"
                  icon={employee}
                />
                <NavItem
                  open={open}
                  onClick={() => router(`/timetable`)}
                  label="Candidate"
                  icon={multipleUser}
                />
              </List>
              <List>
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      alignItems: "center",
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      gap: "0px",
                    }}
                  >
                    <img
                      src={user}
                      alt="icon"
                      style={{ color: "black", width: "35px", height: "70px" }}
                    />
                    <div style={{ marginLeft: "10px" }}>
                      <ListItemText
                        primary="jenish desai"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      <ListItemText
                        primary="logout"
                        sx={{ opacity: open ? 1 : 0, cursor: "pointer" }}
                        onClick={logout}
                      />
                    </div>
                  </ListItemIcon>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}></ListItem>
              </List>
            </NavContainer>
            <div
              onClick={() => setOpen(!open)}
              style={{
                position: "fixed",
                left: open ? "217px" : "43px",
                bottom: 80,
                zIndex: 1201,
                background: "#ededed",
                borderRadius: "50%",
                boxShadow: "26px 26px 52px #c7c7c7,-26px -26px 52px #f9f9f9",
              }}
            >
              {open ? (
                <IconButton>
                  <ChevronLeftIcon sx={{ fontSize: 25 }} />
                </IconButton>
              ) : (
                <IconButton>
                  <ChevronRightIcon sx={{ fontSize: 25 }} />
                </IconButton>
              )}
            </div>
          </Drawer>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: "flex" }}>
          <Drawer variant="permanent" open={open}>
            <div style={{ padding: "7px", display: "flex", gap: 15 }}>
              <img src={Logo} alt="logo" width={50} />
              <ListItemText
                primary="D2 WebTech"
                sx={{ opacity: open ? 1 : 0, cursor: "pointer" }}
              />
            </div>
            <Divider />
            <NavContainer>
              <List>
                <NavItem
                  open={open}
                  onClick={() => router(`/`)}
                  label="Employee"
                  icon={dashboard}
                />
                <NavItem
                  open={open}
                  onClick={() => router(`/employee`)}
                  label="Employee"
                  icon={employee}
                />
              </List>
              <List>
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      alignItems: "center",
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      gap: "0px",
                    }}
                  >
                    <img
                      src={user}
                      alt="icon"
                      style={{ color: "black", width: "35px", height: "70px" }}
                    />
                    <div style={{ marginLeft: "10px" }}>
                      <ListItemText
                        primary="jenish desai"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      <ListItemText
                        primary="logout"
                        sx={{ opacity: open ? 1 : 0, cursor: "pointer" }}
                        onClick={logout}
                      />
                    </div>
                  </ListItemIcon>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}></ListItem>
              </List>
            </NavContainer>
            <div
              onClick={() => setOpen(!open)}
              style={{
                position: "fixed",
                left: open ? "217px" : "43px",
                bottom: 80,
                zIndex: 1201,
                background: "#ededed",
                borderRadius: "50%",
                boxShadow: "26px 26px 52px #c7c7c7,-26px -26px 52px #f9f9f9",
              }}
            >
              {open ? (
                <IconButton>
                  <ChevronLeftIcon sx={{ fontSize: 25 }} />
                </IconButton>
              ) : (
                <IconButton>
                  <ChevronRightIcon sx={{ fontSize: 25 }} />
                </IconButton>
              )}
            </div>
          </Drawer>
        </Box>
      );
    }
  } else {
    return null;
  }
};

export default SideBar;
