import React from "react";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { usePosts } from "../../contexts/PostsContext";
import postImg from "../../images/forms/reshot-illustration-books-and-students-Q63WFPNSKL.png";

import "./post.css";

function Post() {
  const { posts } = usePosts();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  return !post ? (
    <></>
  ) : (
    <div className="post-page" id="post-page">
      <div className="post-header">
        <p className="post-type">{post.type}</p>
        <p className="post-time">{post.time}</p>
        <p className="post-date">{post.date}</p>
      </div>
      <h1>{post.title}</h1>
      <div className="post-body">
        <p>{post.message}</p>
        <img src={postImg} alt="" />
      </div>
      <HashLink smooth to="/#posts-section">
        <button className="back-btn">Înapoi la postări</button>
      </HashLink>
    </div>
  );
}

export default Post;
