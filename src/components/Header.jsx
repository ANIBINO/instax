import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useScroll, useSpring } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import MediaCard from "./MediaCard";
import { fetchMedias } from "../services/api";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { scrollY } = useScroll();
  const ySpring = useSpring(scrollY, { stiffness: 100, damping: 20 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = ySpring.on("change", (latest) => {
      setScrolled(latest > 100);
    });
    return () => unsubscribe();
  }, [ySpring]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await fetchMedias(searchTerm);
        setFilteredResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Categories", icon: <CategoryIcon />, path: "/medias" },
  ];

  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        background: scrolled
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.1)",
        boxShadow: scrolled ? "0px 4px 20px rgba(0,0,0,0.3)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 2 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: "2px",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: { xs: "1rem", sm: "1.5rem" },
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#fff",
                transform: "translateY(-2px)",
              },
            }}
          >
            ELVCO
          </Typography>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          {!isMobile && (
            <Box
              sx={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}
              ref={searchRef}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.6)",
                    },
                  },
                  "& input": {
                    color: "#fff",
                    "&::placeholder": {
                      color: "rgba(255,255,255,0.6)",
                    },
                  },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    width: "100%",
                    background: "rgba(0,0,0,0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                    borderRadius: "12px",
                    padding: 2,
                    maxHeight: "400px",
                    overflowY: "auto",
                    mt: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    {filteredResults.map((media) => (
                      <Grid key={media.id} xs={12}>
                        <MediaCard media={media} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Box>
          )}

          {/* Upload Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                background: "linear-gradient(45deg,rgb(37, 245, 0) 30%,rgb(137, 255, 64) 90%)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "12px",
                padding: "8px 20px",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                boxShadow: "0 3px 5px 2px rgba(255, 64, 129, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg,rgb(37, 245, 0) 30%,rgb(137, 255, 64) 90%)",
                },
              }}
              onClick={() => navigate("/admin/upload")}
            >
              Upload
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: "300px",
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </motion.div>
  );
};

export default Header;
