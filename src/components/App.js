
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const initialPosts = [
  {
    id: 1,
    title: "First Post",
    content: "Hello World",
    author: "Alice",
    reactions: [0, 0, 0, 0, 0],
  },
  {
    id: 2,
    title: "Second Post",
    content: "React is great!",
    author: "Bob",
    reactions: [0, 0, 0, 0, 0],
  },
];

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const navigate = useNavigate();

  const addReaction = (postId, reactionIndex) => {
    setPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: post.reactions.map((r, i) =>
                i === reactionIndex ? r + 1 : r
              ),
            }
          : post
      )
    );
  };

  const addPost = (e) => {
    e.preventDefault();
    if (newPostTitle && newPostContent) {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        author: "You",
        reactions: [0, 0, 0, 0, 0],
      };
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostContent("");
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users" data-testid="users-link">
              Users
            </Link>
          </li>
          <li>
            <Link to="/notifications" data-testid="notifications-link">
              Notifications
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Posts</h2>
              <form onSubmit={addPost}>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={newPostTitle}
                  id="postTitle"
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                  placeholder="Post Content"
                  value={newPostContent}
                  id="postContent"
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button type="submit">Add Post</button>
              </form>

              <div className="posts-list">
                {posts.map((post) => (
                  <div className="post" key={post.id} style={{ marginBottom: "20px" }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>
                      <i>by {post.author}</i>
                    </p>
                    <Link className="button" to={`/posts/${post.id}`}>
                      View Post
                    </Link>
                    {/* Reactions container as 4th child */}
                    <div>
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => addReaction(post.id, idx)}
                          aria-label={`reaction-${idx}`}
                        >
                          {post.reactions[idx]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <Route path="/posts/:postId" element={<PostView posts={posts} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  );
};

const PostView = ({ posts }) => {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === Number(postId));
  const navigate = useNavigate();

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <i>by {post.author}</i>
      </p>
      <button className="button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>
          <a href="/users">User1</a>
        </li>
        <li>
          <a href="/users">User2</a>
        </li>
        <li>
          <a href="/users">User3</a>
        </li>
      </ul>
    </div>
  );
};

const Notifications = () => {
  return (
    <div>
      <h2>Notifications</h2>
      <a href="/notifications">Notification 1</a>
      <a href="/notifications">Notification 2</a>
    </div>
  );
};

export default App;
