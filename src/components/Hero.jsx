import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import hero from "../assets/images/images3.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background:
          "linear-gradient(45deg,rgb(45, 108, 34) 30%,rgb(31, 56, 15) 90%)",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0,0,0,0.2) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pt: 10 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Content */}
          <Grid size={{xs :12, md: 6}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  mb: 2,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Discover Amazing Content
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  mb: 4,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                Explore our collection of stunning images from around
                the world
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#2d6c22",
                    borderRadius: "30px",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.9)",
                    },
                  }}
                >
                  Explore Now
                </Button>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Image */}
          <Grid size={{xs :12, md: 6}}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  transform: "rotate(-2deg)",
                }}
              >
                <Box
                  component="img"
                  src={hero}
                  alt="Hero"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(45deg, rgba(45,108,34,0.2), transparent)",
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
