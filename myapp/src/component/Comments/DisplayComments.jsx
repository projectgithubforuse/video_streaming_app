/**import React,{useState} from 'react'
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../action/comments';
import moment from 'moment';
function DisplayComments({cId,commentBody,userId,commentOn,userCommented}) {
    const [Edit,setEdit]=useState(false);
    const [cmtBdy,setCmtBdy]=useState("");
    const [cmtId,setcmtId]=useState("");
    const CurrentUser = useSelector((state) => state?.currentUserReducer);
    const handleEdit=(ctId,ctBdy)=>{
        setEdit(true);
        setcmtId(ctId)
        setCmtBdy(ctBdy);
    }
    const dispatch=useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        if(!cmtBdy){
            alert("type your comment")
        }else{
            dispatch(editComment({
                id:cmtId,
                commentBody:cmtBdy
            }))
            setCmtBdy("")
        }
        setEdit(false);
    }
    const handleDel=(id)=>{
        dispatch(deleteComment(id))
      }
  return (
    <>
    {
        Edit?(<>
        <form className='comments_sub_form_comments'
        onSubmit={handleOnSubmit}
        >
        <input type='text'
        onChange={e=>setCmtBdy(e.target.value)}
        placeholder='Edit comments...'
        value={cmtBdy}
        className='comment_ibox'/>
        <input type='submit' value='Change' className='comment_add_btn_comment'/>
    </form>
        </>):(
            <p className="comment_body">{commentBody}</p>
        )
    }
    
    <p className="usercommented">
        {" "} - {userCommented} commented {moment(commentOn).fromNow()}</p>
    {CurrentUser?.result._id === userId && (
        <p className="EditDel_DisplayComment">
          <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
          <i onClick={()=> handleDel(cId)} >Delete</i>
        </p>    
        
    )}
    
    </>
  )
}

export default DisplayComments**/
/**import React, { useState } from 'react'
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../action/comments';
import moment from 'moment';

// Dummy translation function (replace with real API call)
async function translateText(text, targetLang) {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      })
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("API error:", data);
      throw new Error("Translation API error");
    }
    return data.translatedText;
  } catch (err) {
    console.log("Translation error:", err);
    throw err;
  }
}

function DisplayComments({ cId, commentBody, userId, commentOn, userCommented, city, likes = 0, dislikes = 0 }) {
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setCmtBdy] = useState("");
  const [cmtId, setcmtId] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch = useDispatch();

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setcmtId(ctId)
    setCmtBdy(ctBdy);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cmtBdy) {
      alert("type your comment")
    } else {
      dispatch(editComment({
        id: cmtId,
        commentBody: cmtBdy
      }))
      setCmtBdy("")
    }
    setEdit(false);
  }

  const handleDel = (id) => {
    dispatch(deleteComment(id))
  }

  // Translation logic
  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const result = await translateText(commentBody, targetLang);
      setTranslated(result);
    } catch (err) {
      setTranslated("Translation failed.");
    }
    setIsTranslating(false);
  }

  const handleLike = async () => {
    setLikeCount(likeCount + 1);
    // Optionally: call backend to persist
  };

  const handleDislike = async () => {
    const newDislike = dislikeCount + 1;
    setDislikeCount(newDislike);
    // Optionally: call backend to persist
    if (newDislike >= 2) {
      dispatch(deleteComment(cId));
    }
  };

  return (
    <>
      {
        Edit ? (
          <>
            <form className='comments_sub_form_comments'
              onSubmit={handleOnSubmit}
            >
              <input type='text'
                onChange={e => setCmtBdy(e.target.value)}
                placeholder='Edit comments...'
                value={cmtBdy}
                className='comment_ibox' />
              <input type='submit' value='Change' className='comment_add_btn_comment' />
            </form>
          </>) : (
          <p className="comment_body">{commentBody}</p>
        )
      }

      <div style={{ margin: "6px 0" }}>
        <select value={targetLang} onChange={e => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages as needed *///}
        /**</select>
        <button onClick={handleTranslate} disabled={isTranslating}>
          {isTranslating ? "Translating..." : "Translate"}
        </button>
        {translated && (
          <div className="translated_comment" style={{ marginTop: 4, color: "#555" }}>
            {translated}
          </div>
        )}
      </div>

      <div>
        <button onClick={handleLike}>👍 {likeCount}</button>
        <button onClick={handleDislike}>👎 {dislikeCount}</button>
      </div>

      <p className="usercommented">
        {" "} - {userCommented}
        {city && <> from {city}</>}
        {" "}commented {moment(commentOn).fromNow()}
      </p>
      {CurrentUser?.result._id === userId && (
        <p className="EditDel_DisplayComment">
          <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
          <i onClick={() => handleDel(cId)} >Delete</i>
        </p>
      )}
    </>
  )
}

export default DisplayComments**/
// FIXED: DisplayComments.jsx with working LibreTranslate API and corrected file paths
// FIXED: Using alternative LibreTranslate endpoint (argosopentech)
// ✅ DisplayComments.jsx - updated to use proxy for translation API
import React, { useState } from 'react';
import './Comments.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../action/comments';
import moment from 'moment';

async function translateText(text, targetLang) {
  const res = await fetch("http://localhost:5500/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, target: targetLang })
  });
  const data = await res.json();
  return data.translatedText || "Translation failed.";
}

function DisplayComments({ cId, commentBody, userId, commentOn, userCommented, city, likes = 0, dislikes = 0 }) {
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setCmtBdy] = useState("");
  const [cmtId, setcmtId] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch = useDispatch();

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setcmtId(ctId);
    setCmtBdy(ctBdy);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cmtBdy) {
      alert("type your comment");
    } else {
      dispatch(editComment({ id: cmtId, commentBody: cmtBdy }));
      setCmtBdy("");
    }
    setEdit(false);
  };

  const handleDel = (id) => {
    dispatch(deleteComment(id));
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    const result = await translateText(commentBody, targetLang);
    setTranslated(result);
    setIsTranslating(false);
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    const newDislike = dislikeCount + 1;
    setDislikeCount(newDislike);
    if (newDislike >= 2) {
      dispatch(deleteComment(cId));
    }
  };

  return (
    <>
      {Edit ? (
        <form className='comments_sub_form_comments' onSubmit={handleOnSubmit}>
          <input
            type='text'
            onChange={e => setCmtBdy(e.target.value)}
            placeholder='Edit comments...'
            value={cmtBdy}
            className='comment_ibox'
          />
          <input type='submit' value='Change' className='comment_add_btn_comment' />
        </form>
      ) : (
        <p className="comment_body">{commentBody}</p>
      )}

      <div style={{ margin: "6px 0" }}>
        <select value={targetLang} onChange={e => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <button onClick={handleTranslate} disabled={isTranslating}>
          {isTranslating ? "Translating..." : "Translate"}
        </button>
        {translated && (
          <div className="translated_comment" style={{ marginTop: 4, color: "#555" }}>
            {translated}
          </div>
        )}
      </div>

      <div>
        <button onClick={handleLike}>👍 {likeCount}</button>
        <button onClick={handleDislike}>👎 {dislikeCount}</button>
      </div>

      <p className="usercommented">
        {" "} - {userCommented}
        {city && <> from {city}</>} commented {moment(commentOn).fromNow()}
      </p>
      {CurrentUser?.result._id === userId && (
        <p className="EditDel_DisplayComment">
          <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
          <i onClick={() => handleDel(cId)}>Delete</i>
        </p>
      )}
    </>
  );
}

export default DisplayComments;
