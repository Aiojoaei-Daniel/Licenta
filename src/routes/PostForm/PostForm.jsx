import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import { Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import InputGroupSelect from "./../../components/common/InputGroupSelect";
import GetCurrentDateTime from "../../components/common/GetCurrentDateTime";
import PostTypes from "../../components/common/PostTypes";

import sendNotification from "../../components/common/SendNotification";

function PostForm() {
  const postsCollectionRef = collection(db, "posts");

  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState();
  const [newMessage, setNewMessage] = useState();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const { postType } = PostTypes();

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

    try {
      if (newTitle.length > 2 && newMessage.length > 5 && type !== "") {
        setError("");

        await addDoc(postsCollectionRef, {
          title: newTitle,
          message: newMessage,
          type: type,
          date: date,
          time: time,
        });

        if ("type === college") {
          console.log("send it to all users");
        } else if ("user type === type") {
          console.log("only for users from a group or a specialization");
        }

        sendNotification(newTitle, type);

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
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
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
