import React from "react";
import DownloadsList from "../../component/UserProfile/DownloadsList";

function Downloads() {
  return (
    <div className='container_Pages_App'>
      <div className='container2_Pages_App'>
        <h1>Your Downloaded Videos</h1>
        <DownloadsList />
      </div>
    </div>
  );
}

export default Downloads;