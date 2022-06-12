import React from "react";
import { Card, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import InputGroupSelect from "../../components/InputGroupSelect";
import EditPostLogic from "./EditPostLogic";
import postsType from "./../../utils/postsType";

import { usePosts } from "./../../contexts/PostsContext";

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
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Modifică Postare</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form ref={form}>
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
          <Link to="/" className="btn cancel">
            Anulează
          </Link>
        </form>
      </Card.Body>
    </Card>
  );
}

export default EditPost;
