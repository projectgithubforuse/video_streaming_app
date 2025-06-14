//import comments from "../models/comments.js";
import comment from "../models/comments.js";
import mongoose from "mongoose";
import axios from "axios";

//   ;

export const postComment = async (req, res) => {
  const commentData = req.body;
  // Example: get city from IP (for demo, use a free API)
  let city = "";
  try {
    const geo = await axios.get(`http://ip-api.com/json/${req.ip}`);
    city = geo.data.city;
  } catch (e) {}
  commentData.city = city;

  const regex = /^[a-zA-Z0-9\s.,?!]+$/;
  if (!regex.test(commentData.commentBody)) {
    return res.status(400).json({ message: "Special characters are not allowed!" });
  }
  const postcomment = new comment(commentData);
  try {
    await postcomment.save();
    res.status(200).json("posted the comment");
    //   console.log("DOne");
  } catch (error) {
    res.status(400).json(error);
  }
};



export const getComment = async (req, res) => {
    try {
      const commentList = await comment.find();
      res.status(200).send(commentList);
    } catch (error) {
      res.status(404).send(error.message);
  }
};
  
export const deleteComment = async (req, res) => {
    const {id:_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Comments Unavailable..");
      }
      try {
      await comment.findByIdAndDelete(_id);
      res.status(200).json({ message: "deleted comment" });
    } catch (error) {
      res.status(400).json({ message: error.message });
   }
};
  
export const editComment = async (req, res) => {
    const {id:_id}=req.params;
    const {commentBody}=req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("comment Unavailable..");
    }
    try {
        const updateComment = await comment.findByIdAndUpdate(
             _id,
            {
                $set: {"commentBody":commentBody}
            }
            )
            res.status(200).json(updateComment)
    } catch (error) {
        res.status(400).json(error)
                
    }
}

export const dislikeComment = async (req, res) => {
  const { id } = req.params;
  const cmt = await comment.findById(id);
  cmt.dislikes = (cmt.dislikes || 0) + 1;
  if (cmt.dislikes >= 2) {
    await comment.findByIdAndDelete(id);
    return res.status(200).json({ message: "Comment auto-removed due to dislikes." });
  }
  await cmt.save();
  res.status(200).json(cmt);
};