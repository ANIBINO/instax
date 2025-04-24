import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Skeleton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchMedia, submitComment } from "../services/api";
import banner from "../assets/images/images3.jpg";

const MediaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const fetchedMedia = await fetchMedia(id);
        setMedia(fetchedMedia);
        setComments(fetchedMedia.comments || []);
      } catch (error) {
        console.error("Failed to load media", error);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const username = localStorage.getItem("username") || "Guest";
    setComments([
      ...comments,
      { username, text: comment, timestamp: new Date().toISOString() },
    ]);
    setComment("");
    await submitComment({ uploadId: id, comment });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "images":
        return "#4CAF50";
      case "videos":
        return "#2196F3";
      case "movies":
        return "#9C27B0";
      default:
        return "#607D8B";
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: "30px",
          px: 2,
          py: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        Back
      </Button>

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "40vh", sm: "50vh", md: "60vh" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${
                media?.category === "images" ? media.url : banner
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
              },
            }}
          />
        )}
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {/* Media Content */}
              <Grid item xs={12} md={8}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={400} />
                ) : (
                  <Box
                    sx={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      bgcolor: "#000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 400,
                    }}
                  >
                    {media?.category === "videos" ||
                    media?.category === "movies" ? (
                      <Box
                        component="video"
                        controls
                        src={media?.url}
                        sx={{
                          width: "100%",
                          maxHeight: 600,
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={media?.url}
                        alt={media?.title}
                        sx={{
                          width: "100%",
                          maxHeight: 600,
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </Box>
                )}
              </Grid>

              {/* Media Info */}
              <Grid item xs={12} md={4}>
                <Box sx={{ height: "100%" }}>
                  {loading ? (
                    <>
                      <Skeleton variant="text" width="80%" height={40} />
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={100}
                        sx={{ mt: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <Box sx={{ mb: 3 }}>
                        <Chip
                          label={media?.category || "Unknown"}
                          size="small"
                          sx={{
                            bgcolor: getCategoryColor(media?.category),
                            color: "white",
                            mb: 1,
                          }}
                        />
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {media?.title || "Untitled"}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Rating
                            mediaId={media?.id}
                            initialRating={media?.rating}
                          />
                          <Typography
                            variant="body2"
                            sx={{ ml: 1, color: "text.secondary" }}
                          >
                            ({media?.rating || 0} rating)
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Description
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {media?.description || "No description available."}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                        <Button
                          variant="outlined"
                          startIcon={<FavoriteIcon />}
                          sx={{ borderRadius: "30px", flex: 1 }}
                        >
                          Like
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<ShareIcon />}
                          sx={{ borderRadius: "30px", flex: 1 }}
                        >
                          Share
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          sx={{ borderRadius: "30px", flex: 1 }}
                        >
                          Download
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "rgb(45, 108, 34)",
                  height: 3,
                },
              }}
            >
              <Tab
                label="Details"
                sx={{
                  color: "rgba(0, 0, 0, 0.6)",
                  "&.Mui-selected": {
                    color: "rgb(45, 108, 34)",
                    fontWeight: "bold",
                  },
                }}
              />
              <Tab
                label="Comments"
                sx={{
                  color: "rgba(0, 0, 0, 0.6)",
                  "&.Mui-selected": {
                    color: "rgb(45, 108, 34)",
                    fontWeight: "bold",
                  },
                }}
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {tab === 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(0,0,0,0.02)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Uploaded By
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2 }}>
                        {media?.uploader?.charAt(0) || "U"}
                      </Avatar>
                      <Typography>
                        {media?.uploader || "Unknown User"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(0,0,0,0.02)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Upload Date
                    </Typography>
                    <Typography>
                      {media?.uploadDate
                        ? new Date(media.uploadDate).toLocaleDateString()
                        : "Unknown Date"}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(0,0,0,0.02)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {media?.tags?.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: "rgba(45, 108, 34, 0.1)",
                            color: "rgb(45, 108, 34)",
                          }}
                        />
                      )) || (
                        <Typography variant="body2" color="text.secondary">
                          No tags available
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <CommentSection comments={comments} />
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: "12px",
                    bgcolor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ mr: 2 }}>
                    {media?.title?.charAt(0).toUpperCase()}
                  </Avatar>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    sx={{
                      bgcolor: "rgb(45, 108, 34)",
                      color: "white",
                      borderRadius: "30px",
                      px: 3,
                      "&:hover": {
                        bgcolor: "rgb(31, 56, 15)",
                      },
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MediaDetails;
