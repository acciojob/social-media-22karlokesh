
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
import { Routes, Route, Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([
    { id: 1, author: "Alice", content: "Hello World!" },
    { id: 2, author: "Bob", content: "React is cool." },
  ]);

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <span id="postAuthor">{post.author}</span>: {post.content}
          <button className="button" style={{ marginLeft: "10px" }}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

function Users() {
  const users = [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
    { id: 3, name: "User Three" },
  ];

  return (
    <div className="users-list">
      {users.map((user) => (
        <div key={user.id} className="user-item">
          {user.name}
        </div>
      ))}
    </div>
  );
}

function Notifications() {
  return (
    <div className="notifications">
      <button className="button">Mark All Read</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>GenZ</h1>
      <nav>
        <Link to="/posts" style={{ marginRight: "15px" }}>
          Posts
        </Link>
        <Link to="/users" style={{ marginRight: "15px" }}>
          Users
        </Link>
        <Link to="/notifications">Notifications</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  );
}

export default App;
