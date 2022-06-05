import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { db } from "../../firebase-config";
import InputGroupSelect from "./../../components/InputGroupSelect";
import { getCurrentDateTime, postsType, SendNotification } from "./../../utils";

function PostForm() {
  const postsCollectionRef = collection(db, "posts");

  const [newTitle, setNewTitle] = useState();
  const [newMessage, setNewMessage] = useState();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const { postType } = postsType();
  const form = useRef();

  const { sendEmail } = SendNotification();

  const createPost = async (event) => {
    event.preventDefault();

    const { date, time } = getCurrentDateTime();
    try {
      if (
        newTitle.length > 2 &&
        newMessage.length > 5 &&
        type !== "" &&
        type !== "Choose..."
      ) {
        setError("");

        await addDoc(postsCollectionRef, {
          title: newTitle,
          message: newMessage,
          type: type,
          date: date,
          time: time,
        });

        sendEmail(newTitle, type);

        history.push("/");
      } else {
        setError("Wrong title, message or type.");
      }
    } catch (error) {
      setError("Failed to post");
    }
  };

  const handlePostType = (event) => {
    setType(event.target.value);
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Creează o postare nouă</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form ref={form}>
          <div className="form-group">
            <label htmlFor="title">Titlul postării</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              rows="1"
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Conținutul postării</label>
            <textarea
              className="form-control"
              id="message"
              rows="3"
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              required
            ></textarea>
          </div>
          <InputGroupSelect
            onChange={handlePostType}
            values={postType}
            label="Tipul postării"
            name="type"
          />
          <button
            type="submit"
            onClick={createPost}
            className="btn btn-primary"
          >
            Creează postare
          </button>
          <Link to="/" className="btn btn-dark">
            Anulează
          </Link>
        </form>
      </Card.Body>
    </Card>
  );
}

export default PostForm;
