import React from "react";
import { Link, useParams } from "react-router-dom";

import InputGroupSelect from "../../components/InputGroupSelect";
import EditPostLogic from "./EditPostLogic";
import postsType from "./../../utils/postsType";
import Alert from "../../components/Alert/Alert";

import { usePosts } from "./../../contexts/PostsContext";
import editImg from "../../images/editPost.png";

import "./editPost.css";

function EditPost() {
  const { posts } = usePosts();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  const {
    setUpdatedMessage,
    setUpdatedTitle,
    handlePostType,
    updatePost,
    error,
    form,
  } = EditPostLogic(post ? post : {});

  const { postType } = postsType();
  return !post ? (
    <></>
  ) : (
    <>
      <h2 className="text-center mb-4" id="edit-title">
        Modifică Postarea
      </h2>
      {error && <Alert error={error} />}
      <div className="edit-post-page">
        <img src={editImg} alt="" />
        <form ref={form} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="title">Titlul Postării</label>
            <input
              type="text"
              className="form-control"
              id="title"
              rows="1"
              defaultValue={post.title}
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
              name="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Conținutul postării</label>
            <textarea
              className="form-control"
              id="message"
              rows="3"
              defaultValue={post.message}
              onChange={(event) => {
                setUpdatedMessage(event.target.value);
              }}
              required
            ></textarea>
          </div>
          <InputGroupSelect
            onChange={handlePostType}
            prevValue={post.type}
            values={postType}
            label="Tipul postării"
            name="type"
          />
          <button type="submit" onClick={updatePost} className="btn edit-btn">
            Modifică
          </button>
          <Link to="/" className="btn cancel-btn">
            Anulează
          </Link>
        </form>
      </div>
    </>
  );
}

export default EditPost;
