const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const youtubeSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "youtube_videos" }
);

const YoutubeVideo = mongoose.model("YoutubeVideo", youtubeSchema);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.get("/api/youtube-ids", async (req, res) => {
  try {
    const videos = await YoutubeVideo.find().select("videoId");

    res.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching YouTube IDs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch YouTube IDs",
    });
  }
});

app.get("/api/youtube-ids/:id", async (req, res) => {
  try {
    const video = await YoutubeVideo.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({
        success: false,
        error: "Video not found",
      });
    }

    res.json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch YouTube video",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
