//import React, { useState } from 'react'
import './ShowVideo.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PremiumModal from './PremiumModal'; // Adjust the import based on your file structure
import React, { useState } from "react";
//import VideoDownload from "../ShowVideo/VideoDownload";

function ShowVideo({vid}) {
    const [downloadMsg, setDownloadMsg] = useState("");
    const [showPremium, setShowPremium] = useState(false);
   
    //console.log(vid)
    const handleDownload = async () => {
        console.log("Download button clicked");
        try {
          const res = await fetch("http://localhost:5500/video/download", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
            },
            body: JSON.stringify({ videoId: vid._id })
          });
          console.log("Response status:", res.status);
          let data;
          try {
            data = await res.json();
            console.log("Response JSON:", data);
          } catch (e) {
            console.log("Failed to parse JSON:", e);
            setDownloadMsg("Download failed (bad response).");
            return;
          }
          if (res.status === 403) {
            setShowPremium(true);
            setDownloadMsg("Daily limit reached. Upgrade to premium.");
            return;
          }
          if (!data.url) {
            setDownloadMsg("Download failed: No file URL.");
            return;
          }
          console.log("Download URL:", data.url);
          const link = document.createElement("a");
          link.href = `http://localhost:5500${data.url}`;
          link.download = "";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadMsg("Download started!");
        } catch (err) {
          console.log("Download error:", err);
          setDownloadMsg("Download failed.");
        }
      };
  return (
    <>
    <Link to={`/videopage/${vid?._id}`}>
        <video
        src={`http://localhost:5500/${vid.filePath}`}
        className='video_ShowVideo'/>

       
    </Link>
    
        <div className="video_description">
            <div className="Chanel_logo_App">
                <div className="fstChar_logo_App">
                    <>{vid?.uploader?.charAt(0).toUpperCase()}</>
                </div>
            </div>
            <div className="video_details">
                <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
                <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
                <pre className="vid_views_UploadTime">
                  {vid?.Views} views <div className="dot"></div>  {moment(vid?.createdAt).fromNow()}
                </pre>
            </div>
        </div>
        <div style={{ margin: "16px 0" }}>
      <button
        onClick={handleDownload}
        style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ⬇️ Download Video
      </button>
      {downloadMsg && <div style={{ color: "#d32f2f", marginTop: 8 }}>{downloadMsg}</div>}
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
    </div>
   
        
    </>
  )
}

export default ShowVideo