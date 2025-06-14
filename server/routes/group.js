import express from "express";
import auth from "../middleware/auth.js";
import { createGroup, inviteToGroup, addMember, searchGroups } from "../controllers/group.js";

const router = express.Router();

router.post("/create", auth, createGroup);
router.post("/invite", auth, inviteToGroup);
router.post("/addMember", auth, addMember);
router.get("/search", searchGroups);

export default router;