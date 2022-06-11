import React, { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import PostsLogic from "./PostsLogic";
import CategorySection from "../../components/CategorySection/CategorySection";

import "./posts.css";

function Posts({ setPost }) {
  const [searchValue, setSearchValue] = useState("");

  const {
    types,
    setSelectedType,
    currentPage,
    postsCount,
    pageSize,
    currentUser,
    pagedPosts,
    onPageChange,
    handlePostClick,
    deletePost,
  } = PostsLogic(setPost, searchValue);

  return (
    <div className="posts-section">
      <div className="header">
        <div className="type-btn">
          <CategorySection items={types} setSelectedType={setSelectedType} />
        </div>
        <div className="header-title">
          <p>Noutăți despre Facultate</p>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Caută o postare"
            aria-label="Search"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
      </div>
      <div className="grid-posts">
        {pagedPosts.length === 0 ? (
          <h1>No posts available</h1>
        ) : (
          pagedPosts.map((post) => (
            <div key={post.id} className="post">
              <ul>
                <div>
                  <p className="time">{post.time}</p>
                  <p className="date">{post.date}</p>{" "}
                  {/*sa inversez string ul */}
                </div>
                <Link
                  to={`/post/${post.id}`}
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  <h1>{post.title}</h1>
                </Link>
                <p className="type">{post.type}</p>
              </ul>
              {currentUser && (
                <div className="edit-btns">
                  <Link
                    to={`/edit-post/${post.id}`}
                    className="btn edit"
                    onClick={() => {
                      handlePostClick(post);
                    }}
                  >
                    Modifică
                  </Link>
                  <a
                    className="btn delete"
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    Șterge
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Pagination
        itemsCount={postsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default Posts;
