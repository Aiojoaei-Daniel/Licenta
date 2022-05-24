import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";

import emailjs from "emailjs-com";

import { db } from "../../firebase-config";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import InputGroupSelect from "./../../components/common/InputGroupSelect";
import GetCurrentDateTime from "../../components/common/GetCurrentDateTime";
import PostTypes from "../../components/common/PostTypes";

import sendNotification from "../../components/common/SendNotification";

import { useAuth } from "./../../contexts/AuthContext";

function PostForm() {
  const postsCollectionRef = collection(db, "posts");

  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState();
  const [newMessage, setNewMessage] = useState();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const { currentStudent } = useAuth();
  const { postType } = PostTypes();
  const form = useRef();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);

      setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const createPost = async (event) => {
    event.preventDefault();

    const { date, time } = GetCurrentDateTime();
    console.log("data din post form", currentStudent);
    console.log("event:", event.target);
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
        console.log(form.current);
        if (
          Object.keys(currentStudent).length === 0 ||
          (currentStudent.group !== type &&
            currentStudent.specialization !== type &&
            type !== "College")
        ) {
        } else {
          sendNotification(newTitle, type);
          emailjs.send(
            "service_g3elv0p",
            "template_xkwc30w",
            { title: newTitle, type: type, email: currentStudent.email },
            "wGFIRDXI0dcdI2h6X"
          );
        }
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
        <h2 className="text-center mb-4">Create a new post</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form ref={form} defaultValue={emaill}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
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
            <label htmlFor="message">Message</label>
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
            label="Post Type"
            name="type"
          />
          <button
            type="submit"
            onClick={createPost}
            className="btn btn-primary"
          >
            Create Post
          </button>
          <Link to="/" className="btn btn-dark">
            Cancel
          </Link>
        </form>
      </Card.Body>
    </Card>
  );
}

export default PostForm;
