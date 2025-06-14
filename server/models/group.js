import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    invited: [{ type: String }], // emails of invited users
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Group", groupSchema);