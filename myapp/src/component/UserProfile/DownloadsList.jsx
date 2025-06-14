import React, { useEffect, useState } from "react";

function DownloadsList() {
  const [downloads, setDownloads] = useState([]);
  const [videoFiles, setVideoFiles] = useState({});

  useEffect(() => {
    async function fetchDownloads() {
      const res = await fetch("http://localhost:5500/user/downloads", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
        }
      });
      const data = await res.json();
      if (!Array.isArray(data)) data = [];
      setDownloads(data);

      // Fetch all video file info for the downloaded videos
      const filesRes = await fetch("http://localhost:5500/video/getvideos");
      const filesData = await filesRes.json();
      const fileMap = {};
      filesData.forEach(v => {
        fileMap[String(v._id)] = v.filePath;
      });
      setVideoFiles(fileMap);
    }
    fetchDownloads();
  }, []);

  return (
    <div style={{ margin: "24px 0" }}>
      <h2>Your Downloads</h2>
      {downloads.length === 0 ? (
        <p>No downloads yet.</p>
      ) : (
        <ul>
          {downloads.map(d => (
            <li key={d._id} style={{ margin: "16px 0" }}>
              {videoFiles[String(d.videoId)] ? (
                <div>
                  <video
                    src={`http://localhost:5500/${videoFiles[String(d.videoId)]}`}
                    controls
                    width="320"
                    height="180"
                    style={{ display: "block", marginBottom: 8, borderRadius: 8, background: "#222" }}
                  />
                  <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                    Video ID: {d.videoId}
                  </span>
                </div>
              ) : (
                <span style={{ color: "#888" }}>Video file not found</span>
              )}
              <span style={{ marginLeft: 12, color: "#888" }}>
                {new Date(d.date).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DownloadsList;