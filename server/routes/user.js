import express from 'express'
import { login } from '../controllers/auth.js';
import { updateChanelData ,getAllChanels} from '../controllers/chanel.js';
import auth from '../middleware/auth.js';
import { upgradeUser } from '../controllers/upgrade.js'; 
import Download from '../models/downloads.js'; // <-- Add this import

const routes=express.Router();
routes.post('/login',login)
routes.patch('/update/:id',updateChanelData)
routes.get('/getAllChanels',getAllChanels)
routes.post("/upgrade", auth, upgradeUser);
routes.get("/downloads", auth, async (req, res) => {
  const downloads = await Download.find({ userId: req.userId });
  res.json(Array.isArray(downloads)? downloads:[]);
});
export default routes;