import Download from "../models/downloads.js";
import User from "../models/auth.js"; // <-- Fix import
import VideoFiles from "../models/videoFiles.js";

export const downloadVideo = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.userId;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if user is premium
  const user = await User.findById(userId); // <-- Fix usage
  const isPremium = user?.isPremium;

  // Count today's downloads
  const count = await Download.countDocuments({
    userId,
    date: { $gte: today }
  });

  if (!isPremium && count >= 1) {
    return res.status(403).json({ message: "Daily download limit reached. Upgrade to premium." });
  }

  // Record the download
  await Download.create({ userId, videoId });

  // Find the video file information
  const video = await VideoFiles.findById(videoId);
  if (!video) return res.status(404).json({ message: "Video not found" });

  // Send the video file (or its URL)
  res.status(200).json({ url: `/${video.filePath.replace(/\\/g, "/")}` });
};