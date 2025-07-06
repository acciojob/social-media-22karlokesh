
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

const usersList = ["Alice", "Bob", "Charlie"];

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Dummy Post 1",
      author: "Alice",
      content: "This is a dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
    {
      id: 2,
      title: "Dummy Post 2",
      author: "Bob",
      content: "This is another dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
  ]);
  const navigate = useNavigate();

  const addReaction = (postId, index) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: post.reactions.map((r, i) =>
                i === index ? r + 1 : r
              ),
            }
          : post
      )
    );
  };

  const addPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const content = form.content.value;
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        title,
        author,
        content,
        reactions: [0, 0, 0, 0, 0],
      },
    ]);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={addPost}>
        <input id="postTitle" name="title" placeholder="Title" required />
        <select id="postAuthor" name="author" required>
          {usersList.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <textarea id="postContent" name="content" placeholder="Content" required />
        <button type="submit">Add Post</button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <i>by {post.author}</i>
            </p>
            <Link className="button" to={`/posts/${post.id}`}>
              View Post
            </Link>
            <div>
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => addReaction(post.id, idx)}
                >
                  {post.reactions[idx]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      title: "Dummy Post 1",
      author: "Alice",
      content: "This is a dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
    {
      id: 2,
      title: "Dummy Post 2",
      author: "Bob",
      content: "This is another dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
  ]);

  const post = posts.find((p) => p.id === Number(postId));
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  const savePost = () => {
    setPosts(
      posts.map((p) =>
        p.id === Number(postId) ? { ...p, title, content } : p
      )
    );
    navigate("/");
  };

  if (!post) return <div>Post not found</div>;

  return (
    <div className="post">
      <h2>Editing Post</h2>
      <input
        id="postTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="postContent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={savePost}>Save</button>
    </div>
  );
};

const Users = () => (
  <ul>
    {usersList.map((u, idx) => (
      <li key={u}>
        <Link to={`/users/${idx}`}>{u}</Link>
      </li>
    ))}
  </ul>
);

const UserPosts = () => {
  const { userId } = useParams();
  const user = usersList[userId];
  const [posts] = React.useState([
    {
      id: 1,
      title: "Dummy Post 1",
      author: "Alice",
      content: "This is a dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
    {
      id: 2,
      title: "Dummy Post 2",
      author: "Bob",
      content: "This is another dummy post.",
      reactions: [0, 0, 0, 0, 0],
    },
  ]);
  const userPosts = posts.filter((p) => p.author === user);

  return (
    <div className="posts-list">
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <div>No posts found for {user}</div>
      )}
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    "Welcome!",
    "New message",
  ]);
  return (
    <section className="notificationsList">
      <button
        className="button"
        onClick={() =>
          setNotifications([...notifications, "You have a new notification!"])
        }
      >
        Refresh Notifications
      </button>
      {notifications.map((note, i) => (
        <div key={i}>{note}</div>
      ))}
    </section>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>GenZ</h1>
        <nav>
          <Link to="/">Posts</Link> | <Link to="/users">Users</Link> |{" "}
          <Link to="/notifications">Notifications</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<PostEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserPosts />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
