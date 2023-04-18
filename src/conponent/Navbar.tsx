import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./Context/UserContext";

const ResponsiveAppBar = () => {
  const { loginUser, setLoginUser } = useContext(LoginContext);
  
  const pages = [
    { name: "Home", path: "/" },
    { name: "Timer", path: "/timer" },
    { name: "Calculator", path: "/calculator" },
  ];
  const userSettings = [
    { name: "Inbox", path: "/inbox" },
    { name: "Outbox", path: "/outbox" },
  ];
  const guestSettings = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLoginUser(null);
    setAnchorElUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="absolute">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={loginUser ? loginUser.name : ""}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loginUser
                ? userSettings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={setting.path}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))
                : guestSettings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={setting.path}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}

              {loginUser ? (
                <MenuItem key={"Logout"} onClick={handleLogout}>
                  <Typography textAlign="center">{"Logout"}</Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
