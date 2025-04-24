import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MediaCard from "../components/MediaCard";
import Container from "@mui/material/Container";
import {
  Skeleton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { fetchMedias } from "../services/api";

const HomePage = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        setMediaData(medias);
      } catch (error) {
        console.error("Error loading medias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedias();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
      }}
    >
      <Hero />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          paddingTop: { xs: "24px", sm: "32px", md: "48px" },
          paddingBottom: { xs: "24px", sm: "32px", md: "48px" },
          marginTop: "0px",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            sx={{ marginBottom: 4 }}
          >
            {loading ? (
              Array.from({ length: isMobile ? 2 : 4 }).map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      width: "100%",
                      padding: { xs: 1, sm: 2 },
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={isMobile ? 200 : 250}
                      sx={{ borderRadius: "8px" }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                      <Skeleton variant="text" width="60%" />
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : mediaData.length === 0 ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    No pictures available
                  </Typography>
                  <Typography variant="body1">
                    Check back later for new content
                  </Typography>
                </Box>
              </Grid>
            ) : (
              mediaData.map((media) => (
                <Grid
                  key={media.id}
                  size={{xs:12, md: 3, lg: 3}}
                  component={motion.div}
                  variants={itemVariants}
                >
                  <Box
                    sx={{
                      height: "100%",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <MediaCard media={media} loading={loading} />
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
