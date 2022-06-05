import { useState, useRef } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import { db } from "../../firebase-config";
import getCurrentDateTime from "../../utils/getCurrentDateTime";

import SendNotification from "../../utils/SendNotification";

function EditPostLogic(post) {
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedMessage, setUpdatedMessage] = useState(post.message);
  const [updatedType, setUpdatedType] = useState(post.type);
  const [error, setError] = useState("");

  const history = useHistory();
  const form = useRef();

  const { sendEmail } = SendNotification();

  const updatePost = async (event) => {
    event.preventDefault();

    const { date, time } = getCurrentDateTime();

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

        sendEmail(updatedTitle, updatedType);

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

  return {
    handlePostType,
    updatePost,
    error,
    setUpdatedMessage,
    setUpdatedTitle,
    form,
    post,
  };
}

export default EditPostLogic;
