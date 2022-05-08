import React from "react";
import { Card, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import InputGroupSelect from "../../components/common/InputGroupSelect";
import EditPostLogic from "./EditPostLogic";

function EditPost({ item: post }) {
  const {
    setUpdatedMessage,
    setUpdatedTitle,
    handlePostType,
    updatePost,
    error,
  } = EditPostLogic(post);

  return !post.id ? (
    <Redirect to="/" />
  ) : (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Edit Post</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              rows="1"
              defaultValue={post.title}
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
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
          <InputGroupSelect onChange={handlePostType} prevValue={post.type} />
          <button
            type="submit"
            onClick={updatePost}
            className="btn btn-primary"
          >
            Update Post
          </button>
          <Link to="/" className="btn btn-dark">
            Cancel
          </Link>
        </form>
      </Card.Body>
    </Card>
  );
}

export default EditPost;
