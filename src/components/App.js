
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
import "./../styles/App.css";

const App = () => {
  const [page, setPage] = useState(window.location.pathname);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);

  const users = ["Alice", "Bob", "Charlie"];

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPage(path);
  };

  const addPost = (e) => {
    e.preventDefault();
    const newPost = { ...form, id: Date.now(), reactions: [0, 0, 0, 0, 0] };
    setPosts([newPost, ...posts]);
    setForm({ title: "", author: "", content: "" });
    navigate("/");
  };

  const editPost = () => {
    setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
    setEditingPost(null);
    navigate("/");
  };

  return (
    <div className="App">
      <h1>GenZ</h1>
      <nav>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Posts</a>
        <a href="/users" onClick={(e) => { e.preventDefault(); navigate("/users"); }}>Users</a>
        <a href="/notifications" onClick={(e) => { e.preventDefault(); navigate("/notifications"); }}>Notifications</a>
      </nav>

      {page === "/" && (
        <>
          <form onSubmit={addPost}>
            <input id="postTitle" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <select id="postAuthor" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}>
              <option value="">Select author</option>
              {users.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <textarea id="postContent" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content"></textarea>
            <button>Add Post</button>
          </form>

          <div className="posts-list">
            <h2>Posts</h2>
            {posts.map((post, i) => (
              <div className="post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><i>by {post.author}</i></p>
                <div>
                  {post.reactions.map((r, idx) => (
                    <button key={idx} onClick={() => {
                      if (idx === 4) return;
                      setPosts(posts.map(p => p.id === post.id
                        ? { ...p, reactions: p.reactions.map((v, i) => i === idx ? v + 1 : v) }
                        : p
                      ));
                    }}>{r}</button>
                  ))}
                </div>
                <button className="button" onClick={() => { navigate(`/posts/${post.id}`); }}>View Post</button>
              </div>
            ))}
          </div>
        </>
      )}

      {page.startsWith("/posts/") && editingPost == null && (
        <>
          {(() => {
            const postId = parseInt(page.split("/")[2]);
            const post = posts.find(p => p.id === postId);
            return post ? (
              <div className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button className="button" onClick={() => setEditingPost({ ...post })}>Edit</button>
              </div>
            ) : <p>Post not found</p>
          })()}
        </>
      )}

      {editingPost && (
        <>
          <input id="postTitle" value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} />
          <textarea id="postContent" value={editingPost.content} onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}></textarea>
          <button onClick={editPost}>Save</button>
        </>
      )}

      {page === "/users" && (
        <ul>
          {users.map((u, i) => (
            <li key={u}><a onClick={() => navigate(`/users/${i}`)}>{u}</a></li>
          ))}
        </ul>
      )}

      {page.startsWith("/users/") && (
        <div className="posts-list">
          {posts.filter(p => users[parseInt(page.split("/")[2])] === p.author)
            .map(p => (
              <div className="post" key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.content}</p>
              </div>
            ))}
        </div>
      )}

      {page === "/notifications" && (
        <div>
          <button className="button" onClick={() => setNotifications(["New message", "New follower", "Update available"])}>Refresh Notifications</button>
          <section className="notificationsList">
            {notifications.map((n, i) => <div key={i}>{n}</div>)}
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
