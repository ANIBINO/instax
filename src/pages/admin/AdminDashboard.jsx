import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Toolbar,
  CssBaseline,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ViewCards from "./ViewCards";
import { motion } from "framer-motion";

const drawerWidth = 280;

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { text: "Upload Media", path: "/admin/upload", icon: <CloudUploadIcon /> },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        paddingTop: 2,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            mb: 2,
            border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          A
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Admin Panel
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
            mt: 1,
          }}
        >
          Welcome back, Admin
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 2 }} />

      <List>
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "#79ff40" : "#fff",
                background:
                  location.pathname === item.path
                    ? "rgba(33, 150, 243, 0.1)"
                    : "transparent",
                borderRadius: "12px",
                margin: "8px 16px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "#79ff40" : "#fff",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                  },
                }}
              />
              {location.pathname === item.path && (
                <Box
                  sx={{
                    width: 4,
                    height: 24,
                    backgroundColor: "#79ff40",
                    borderRadius: "2px",
                  }}
                />
              )}
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1200,
              color: "#fff",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "12px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.05)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: "80%",
                boxSizing: "border-box",
                background: "rgba(26, 26, 46, 0.95)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          minHeight: "100vh",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.05) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            opacity: 0.5,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {location.pathname === "/admin" && <ViewCards />}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
