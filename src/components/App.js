
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
import "./styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [users] = useState(["User1", "User2", "User3"]);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  
  return (
    <div className="App">
      <h1>GenZ</h1>
      <Router>
        <nav>
          <a href="/">Posts</a> | 
          <a href="/users">Users</a> | 
          <a href="/notifications">Notifications</a>
        </nav>

        <Routes>
          <Route path="/" element={
            <PostsList posts={posts} setPosts={setPosts} />
          } />
          <Route path="/users" element={
            <Users users={users} posts={posts} setSelectedUserPosts={setSelectedUserPosts} selectedUserPosts={selectedUserPosts} />
          } />
          <Route path="/notifications" element={
            <Notifications notifications={notifications} setNotifications={setNotifications} />
          } />
          <Route path="/create-post" element={
            <CreatePost posts={posts} setPosts={setPosts} />
          } />
          <Route path="/posts/:postId" element={
            <PostDetails posts={posts} setPosts={setPosts} />
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

// Components

const PostsList = ({ posts, setPosts }) => {
  return (
    <div className="posts-list">
      <h2>Posts</h2>
      <a href="/create-post"><button>Create New Post</button></a>
      {posts.map((post, i) => (
        <div key={i} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div>
            {post.reactions.slice(0, 4).map((r, idx) => (
              <button key={idx} onClick={() => {
                const updated = [...posts];
                updated[i].reactions[idx]++;
                setPosts(updated);
              }}>{r}</button>
            ))}
            <button>0</button>
          </div>
          <button className="button" onClick={() => window.location.href=`/posts/${i}`}>View Details</button>
        </div>
      ))}
    </div>
  )
}

const CreatePost = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newPost = { title, author, content, reactions: [0,0,0,0] };
    setPosts([newPost, ...posts]);
    navigate("/");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input id="postTitle" placeholder="Post Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <select id="postAuthor" value={author} onChange={(e)=>setAuthor(e.target.value)}>
        <option value="">Select Author</option>
        <option value="User1">User1</option>
        <option value="User2">User2</option>
        <option value="User3">User3</option>
      </select>
      <textarea id="postContent" placeholder="Post Content" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const PostDetails = ({ posts, setPosts }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const post = posts[postId];

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const saveEdit = () => {
    const updated = [...posts];
    updated[postId].title = title;
    updated[postId].content = content;
    setPosts(updated);
    setEditing(false);
  };

  return (
    <div className="post">
      {editing ? (
        <>
          <input id="postTitle" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea id="postContent" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button className="button" onClick={()=>setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

const Users = ({ users, posts, setSelectedUserPosts, selectedUserPosts }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i} onClick={() => {
            setSelectedUserPosts(posts.filter(p=>p.author===u));
          }}>{u}</li>
        ))}
      </ul>
      {selectedUserPosts.map((p, i)=>(
        <div key={i} className="post">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
};

const Notifications = ({ notifications, setNotifications }) => {
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
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
  )
}

