//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './component/navbar/Navbar'
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
 
} from "react-router-dom";
import AllRoutes from './component/AllRoutes';
import DrawerSidebar from './component/LeftSidebar/DrawerSidebar';
import CreateEditChannel from './pages/Chanel/CreateEditChannel';
import { fetchAllChanel } from './action/chanelUser';
import { useDispatch } from 'react-redux';
import VideoUpload from './pages/VideoUpload/VideoUpload';
//import { getAllvideos } from '../../server/controllers/video';
import { getAllVideo } from './action/video';
import { getAlllikedVideo } from './action/likedVideo';
import { getAllwatchLater } from './action/watchLater';
import { getAllHistory } from './action/History';
//import { getVideo } from './action/video';
import GroupCreate from "./component/GroupSearch/GroupCreate";
import GroupSearch from "./component/GroupSearch/GroupSearch";
//import DownloadsList from "./component/UserProfile/DownloadsList";
function App() {
  const dispatch=useDispatch();
   useEffect(()=>{
  dispatch(fetchAllChanel());
  dispatch(getAllVideo());
  dispatch(getAlllikedVideo());
  dispatch(getAllwatchLater());
  dispatch(getAllHistory());
   },[dispatch]);


  const [toggleDrawerSidebar,settoggleDrawerSidebar]=useState({
    display:"none",
  })
  const toggleDrawer=()=>{
    if(toggleDrawerSidebar.display==="none"){
      settoggleDrawerSidebar({
        display:"flex",
      });
    }else{
      settoggleDrawerSidebar({
        display:"none"
      })
    }
  }
  const [vidUploadPage,setVidUploadPage]=useState(false)
  const [EditCreateChanelBtn,setEditCreateChanelBtn]=useState(false)
  return (
    <Router>
      {
        vidUploadPage &&
        <VideoUpload setVidUploadPage={setVidUploadPage}/>
      }
      
      {
        EditCreateChanelBtn &&
      
      <CreateEditChannel setEditCreateChanelBtn={setEditCreateChanelBtn}/>
     }
      <Navbar setEditCreateChanelBtn={setEditCreateChanelBtn} toggleDrawer={toggleDrawer}/>
       
      <DrawerSidebar  
        toggleDrawer={toggleDrawer} 
        toggleDrawerSidebar={toggleDrawerSidebar}/>      
      <AllRoutes setVidUploadPage={setVidUploadPage} setEditCreateChanelBtn={setEditCreateChanelBtn}/>
      <div style={{padding:"1rem"}}>
        <h2>Create a group</h2>
        <GroupCreate/>
        <h2>Search for groups</h2>
        <GroupSearch/>
      </div>
      
    </Router>
        
  );
}

export default App;
