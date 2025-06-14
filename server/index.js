import express from "express"
import mongoose from "mongoose"
import dontenv from "dotenv"
import cors from 'cors'
import bodyParser from "body-parser"
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import path from 'path'
import groupRoutes from './routes/group.js';
import fetch from "node-fetch";

dontenv.config()
const app=express()

app.use(cors())
app.use(express.json({limit:"300000mb",extended:true}))
app.use(express.urlencoded({limit:"30000mb",extended:true}))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))
app.get('/',(req,res)=>{
    res.send("hello")
    
})
app.use(bodyParser.json())
app.use('/user',userRoutes)
app.use('/video',videoRoutes)
app.use('/comment',commentsRoutes)
app.use('/group', groupRoutes);

app.post("/api/translate", async (req, res) => {
  const { q, target } = req.body;
  try {
    const response = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q,
        source: "auto",
        target,
        format: "text"
      })
    });
    const data = await response.json();
    res.json({ translatedText: data.translatedText });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Translation failed." });
  }
});

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
const DB_URL=process.env.CONNECTION_URL

mongoose.connect(DB_URL)
.then(()=>{
    console.log("MongoDB database connected")
}).catch((error)=>{
    console.log(error)
})