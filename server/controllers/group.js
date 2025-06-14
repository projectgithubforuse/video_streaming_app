import Group from "../models/group.js";
import user from "../models/auth.js";

/**export const createGroup = async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;
    try {
        const group = await Group.create({ name, members: [userId], createdBy: userId });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: "Group creation failed" });
    }
};**/
export const createGroup = async (req, res) => {
    const { name, members = [], invited = [] } = req.body;
    const userId = req.userId;
    try {
        // Ensure creator is always a member
        const allMembers = Array.from(new Set([userId, ...members]));
        const group = await Group.create({ name, members: allMembers, invited, createdBy: userId });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: "Group creation failed" });
    }
};

export const inviteToGroup = async (req, res) => {
    const { groupId, email } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });
        if (!group.invited.includes(email)) {
            group.invited.push(email);
            await group.save();
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Invite failed" });
    }
};

export const addMember = async (req, res) => {
    const { groupId, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid groupId or userId" });
    }
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });
        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Add member failed" });
    }
};

export const searchGroups = async (req, res) => {
    const { query } = req.query;
    try {
        const groups = await Group.find({ name: { $regex: query, $options: "i" } });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Search failed" });
    }
};