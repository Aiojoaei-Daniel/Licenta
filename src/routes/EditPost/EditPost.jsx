import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";

import { db } from "../../firebase-config";
import InputGroupSelect from "../../components/common/InputGroupSelect";

function EditPost({ item: post }) {
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedMessage, setUpdatedMessage] = useState(post.message);
  const [updatedType, setUpdatedType] = useState(post.type);
  const [error, setError] = useState("");
  const history = useHistory();

  const updatePost = async (event) => {
    event.preventDefault();

    const currentDate = new Date();

    const date =
      currentDate.getFullYear() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getDate();

    const time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    const postDoc = doc(db, "posts", post.id);
    const updatedPost = {
      title: updatedTitle,
      message: updatedMessage,
      type: updatedType,
      time: time,
      date: date,
    };

    try {
      if (updatedTitle.length > 2 && updatedMessage.length > 5) {
        setError("");

        await updateDoc(postDoc, updatedPost);

        history.push("/");
      } else {
        setError("Incorrect title or message");
      }
    } catch (error) {
      setError("Failed to update");
    }
  };

  const handlePostType = (event) => {
    setUpdatedType(event.target.value);
  };

  return Object.keys(post).length !== 0 ? (
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
  ) : (
    <Redirect to="/" />
  );
}

export default EditPost;
