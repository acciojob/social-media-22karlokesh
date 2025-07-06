
// import React from "react";
// import './../styles/App.css';

// const App = () => {
//   return (
//     <div>
//         {/* Do not remove the main div */}
//     </div>
//   )
// }

// export default App

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users] = useState(["User1", "User2", "User3"]);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [page, setPage] = useState("/");

  const addPost = () => {
    const newPost = { title, author, content, reactions: [0,0,0,0] };
    setPosts([newPost, ...posts]);
    setTitle(""); setAuthor(""); setContent("");
  };

  const editPost = (index) => {
    setEditingIndex(index);
    setEditTitle(posts[index].title);
    setEditContent(posts[index].content);
  };

  const saveEdit = () => {
    const updated = [...posts];
    updated[editingIndex].title = editTitle;
    updated[editingIndex].content = editContent;
    setPosts(updated);
    setEditingIndex(-1);
  };

  return (
    <div className="App">
      <h1>GenZ</h1>
      <nav>
        <a href="/" onClick={(e)=>{e.preventDefault();setPage("/")}}>Posts</a> | 
        <a href="/users" onClick={(e)=>{e.preventDefault();setPage("/users")}}>Users</a> | 
        <a href="/notifications" onClick={(e)=>{e.preventDefault();setPage("/notifications")}}>Notifications</a>
      </nav>

      {page === "/" && (
        <>
          <div>
            <input id="postTitle" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post Title"/>
            <select id="postAuthor" value={author} onChange={e=>setAuthor(e.target.value)}>
              <option value="">Select Author</option>
              {users.map((u,i)=><option key={i} value={u}>{u}</option>)}
            </select>
            <textarea id="postContent" value={content} onChange={e=>setContent(e.target.value)} placeholder="Post Content"></textarea>
            <button onClick={addPost}>Submit</button>
          </div>
          <div className="posts-list">
            <h2>Posts</h2>
            {posts.map((post, i)=>(
              <div key={i} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div>
                  {post.reactions.slice(0,4).map((r,idx)=>(
                    <button key={idx} onClick={()=>{
                      const updated = [...posts];
                      updated[i].reactions[idx]++;
                      setPosts(updated);
                    }}>{r}</button>
                  ))}
                  <button>0</button>
                </div>
                <button className="button" onClick={()=>editPost(i)}>Edit</button>
              </div>
            ))}
            {editingIndex >= 0 && (
              <div className="post">
                <input id="postTitle" value={editTitle} onChange={e=>setEditTitle(e.target.value)} />
                <textarea id="postContent" value={editContent} onChange={e=>setEditContent(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
              </div>
            )}
          </div>
        </>
      )}

      {page === "/users" && (
        <div>
          <ul>
            {users.map((u,i)=>(
              <li key={i} onClick={()=>{
                setSelectedUserPosts(posts.filter(p=>p.author===u));
              }}>{u}</li>
            ))}
          </ul>
          {selectedUserPosts.map((p,i)=>(
            <div key={i} className="post">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
            </div>
          ))}
        </div>
      )}

      {page === "/notifications" && (
        <section className="notificationsList">
          <button className="button" onClick={()=>{
            setNotifications([
              "New comment on your post",
              "User2 liked your post"
            ]);
          }}>Refresh Notifications</button>
          {notifications.map((n,i)=>(
            <div key={i}>{n}</div>
          ))}
        </section>
      )}
    </div>
  );
};

export default App;
