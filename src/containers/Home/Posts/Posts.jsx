import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import Pagination from "../../../components/Pagination/Pagination";

import PostsLogic from "./PostsLogic";

function Posts({ setPost, selectedType, searchValue, currentUser }) {
  const {
    onPageChange,
    handlePostClick,
    deletePost,
    postsCount,
    pagedPosts,
    pageSize,
    currentPage,
  } = PostsLogic(setPost, selectedType, searchValue);

  return (
    <>
      {pagedPosts.length === 0 ? (
        <h1>No posts available</h1>
      ) : (
        pagedPosts.map((post) => (
          <div
            key={post.id}
            style={{
              borderBottom: "3px solid white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ul>
              <Link
                to={`/post/${post.id}`}
                onClick={() => {
                  handlePostClick(post);
                }}
              >
                <h1
                  style={{
                    color: "black",
                    whiteSpace: "nowrap",
                    width: "400px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.title}
                </h1>
              </Link>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.date}
              </a>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.time}
              </a>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.type}
              </a>
            </ul>
            {currentUser && (
              <div style={{ marginTop: "10px" }}>
                <Link
                  to={`/edit-post/${post.id}`}
                  className="btn btn-primary"
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  Modifică
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Șterge
                </button>
              </div>
            )}
          </div>
        ))
      )}
      <Pagination
        itemsCount={postsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Posts;
