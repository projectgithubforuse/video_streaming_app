import mongoose from "mongoose";
const downloadSchema = mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
export default mongoose.model("Download", downloadSchema);