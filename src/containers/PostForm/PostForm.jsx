import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
// import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { db } from "../../firebase-config";
import InputGroupSelect from "./../../components/InputGroupSelect";
import { getCurrentDateTime, postsType, SendNotification } from "./../../utils";
import Alert from "../../components/Alert/Alert";

import formImg from "../../images/forms/6.PNG";

import "./postForm.css";

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
        type !== "Alege tipul postării..."
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
        setError("Titlul, mesajul sau tipul postării sunt incorecte.");
      }
    } catch (error) {
      setError("Nu s-a reușit postarea anunțului.");
    }
  };

  const handlePostType = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="new-post-page" id="new-post-page">
      <h2 className="text-center mb-4">Creează o postare nouă</h2>
      {error && <Alert error={error} />}
      <div className="new-post-body">
        <form ref={form} className="new-post-form">
          <div className="form-group" id="form-group">
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
            id="submit-btn"
            className="btn edit-btn"
          >
            Creeaza o postare
          </button>
          <Link to="/" className="btn cancel-btn">
            Anulează
          </Link>
        </form>
        <img src={formImg} alt="formImg" />
      </div>
    </div>
  );
}

export default PostForm;
