import React, { useState } from "react";
import { Link } from "react-router-dom";

import PostsLogic from "./PostsLogic";
import { Pagination, CategorySection, NotFound } from "../../components";

import postsImg from "../../images/posts/imgPosts1.png";
import "./posts.css";
import { HashLink } from "react-router-hash-link";

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
    <div className="posts-section" id="posts-section">
      <div className="header" id="header">
        <div className="type-btn">
          <CategorySection items={types} setSelectedType={setSelectedType} />
        </div>
        <div className="header-title" id="header-title">
          <p>Noutăți despre Facultate</p>
        </div>
        <form className="form-inline">
          <input
            className="form-control"
            type="search"
            placeholder="Caută o postare"
            aria-label="Search"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
      </div>
      {pagedPosts.length === 0 ? (
        <NotFound type="postare" />
      ) : (
        <div className="posts-body">
          <div className="grid-posts">
            {pagedPosts.map((post) => (
              <div key={post.id} className="post">
                <ul>
                  <div>
                    <p className="time">{post.time}</p>
                    <p className="date">{post.date}</p>{" "}
                  </div>
                  <HashLink
                    smooth
                    to={`/post/${post.id}/#post-page`}
                    onClick={() => {
                      handlePostClick(post);
                    }}
                  >
                    <h1>{post.title}</h1>
                  </HashLink>
                  <p className="type">{post.type}</p>
                </ul>
                {currentUser && (
                  <div className="post-edit-btns">
                    <HashLink
                      smooth
                      to={`/edit-post/${post.id}/#edit-title`}
                      className="post-edit-btn"
                      id="post-edit-btn"
                      onClick={() => {
                        handlePostClick(post);
                      }}
                    >
                      Modifică
                    </HashLink>
                    <a
                      className="post-delete-btn"
                      id="post-delete-btn"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Șterge
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="img-container">
            <img className="posts-img" src={postsImg} alt="" />
          </div>
        </div>
      )}
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
