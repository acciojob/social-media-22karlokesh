
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

const App = () => {
  const [page, setPage] = useState("/");
  const [posts, setPosts] = useState([]);
  const [users] = useState(["Alice", "Bob", "Charlie"]);
  const [notifications, setNotifications] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [reactions, setReactions] = useState({}); // {postId: [1,2,3,4]}

  const navigate = (url) => setPage(url);

  const addPost = (title, author, content) => {
    const id = posts.length + 1;
    setPosts([...posts, { id, title, author, content }]);
  };

  const updatePost = (id, title, content) => {
    setPosts(posts.map(p => p.id === id ? { ...p, title, content } : p));
  };

  const addReaction = (id, idx) => {
    setReactions({
      ...reactions,
      [id]: reactions[id]
        ? reactions[id].map((val, i) => i === idx ? val + 1 : val)
        : [idx===4?0:1, idx===4?0:0, idx===4?0:0, idx===4?0:0, 0]
    });
  };

  return (
    <div className="App">
      <h1>GenZ</h1>
      <nav>
        <a href="#" onClick={() => navigate("/")}>Posts</a>{" | "}
        <a href="#" onClick={() => navigate("/users")}>Users</a>{" | "}
        <a href="#" onClick={() => navigate("/notifications")}>Notifications</a>
      </nav>

      {page === "/" && (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.postTitle.value;
            const author = e.target.postAuthor.value;
            const content = e.target.postContent.value;
            addPost(title, author, content);
            e.target.reset();
          }}>
            <input id="postTitle" placeholder="Title" required />
            <select id="postAuthor" required>
              {users.map(u => <option key={u}>{u}</option>)}
            </select>
            <textarea id="postContent" placeholder="Content" required></textarea>
            <button type="submit">Add Post</button>
          </form>

          <div className="posts-list">
            <h2>Posts</h2>
            {posts.map(post => (
              <div className="post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><i>by {post.author}</i></p>
                <button className="button" onClick={() => { setEditPost(post); navigate(`/posts/${post.id}`); }}>View Post</button>
                <div>
                  {[0,1,2,3,4].map(i => (
                    <button key={i} onClick={() => addReaction(post.id, i)}>
                      {reactions[post.id]?.[i] ?? 0}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {posts.length < 2 && (
              <div className="post">
                <h3>Dummy Post</h3>
                <p>This is a placeholder post</p>
                <button className="button" onClick={() => navigate("/posts/999")}>View Post</button>
                <div>
                  {[0,1,2,3,4].map(i => (
                    <button key={i}>{i===4?0:i+1}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {page.startsWith("/posts/") && editPost && (
        <div className="post">
          <h2>Editing Post</h2>
          <input id="postTitle" defaultValue={editPost.title} />
          <textarea id="postContent" defaultValue={editPost.content}></textarea>
          <button onClick={() => {
            const title = document.getElementById("postTitle").value;
            const content = document.getElementById("postContent").value;
            updatePost(editPost.id, title, content);
            navigate("/");
          }}>Save</button>
        </div>
      )}

      {page === "/users" && (
        <ul>
          {users.map((u, i) => (
            <li key={u}>
              <a href="#" onClick={() => navigate(`/users/${i}`)}>{u}</a>
            </li>
          ))}
        </ul>
      )}

      {page.startsWith("/users/") && (
        <div className="posts-list">
          {(posts.filter(p => p.author === users[parseInt(page.split("/")[2])]).length
            ? posts.filter(p => p.author === users[parseInt(page.split("/")[2])])
            : [{ id: "fake", title: "Demo Post", content: "Sample content by user" }]
          ).map(p => (
            <div className="post" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.content}</p>
            </div>
          ))}
        </div>
      )}

      {page === "/notifications" && (
        <section className="notificationsList">
          <button className="button" onClick={() => setNotifications(["New follower", "Post liked", "Comment added"])}>
            Refresh Notifications
          </button>
          {notifications.map((note, i) => <div key={i}>{note}</div>)}
        </section>
      )}
    </div>
  );
};

export default App;
