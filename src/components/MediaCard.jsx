import { Card, Typography, IconButton, Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/images.jpeg";
import Image2 from "../assets/images/images1.jpg";
import Image3 from "../assets/images/images2.jpeg";
import { motion } from "framer-motion";

const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <StarIcon
      key={i}
      sx={{
        color: i < rating ? "#ffcc00" : "rgba(255,255,255,0.3)",
        fontSize: "16px",
      }}
    />
  ));
};

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
  const thumbnail = isVideoOrMovie
    ? getRandomThumbnail(media.category)
    : media.url || getRandomThumbnail(media.category || "image");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to={`/media/${media.id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            minHeight: 280,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Chip
                label={media.category || "image"}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                  mb: 1,
                  "& .MuiChip-label": {
                    textTransform: "capitalize",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {media.title || "Untitled"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {renderStars(media.averageRating || 0)}
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    ml: 1,
                  }}
                >
                  ({media.averageRating || 0})
                </Typography>
              </Box>
            </Box>

            {isVideoOrMovie && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "16px",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Card>
      </Link>
    </motion.div>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    averageRating: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
