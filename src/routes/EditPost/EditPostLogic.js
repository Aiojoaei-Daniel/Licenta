import { useState, useRef } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import { db } from "../../firebase-config";
import { useAuth } from "./../../contexts/AuthContext";
import GetCurrentDateTime from "../../components/common/GetCurrentDateTime";
import sendNotification from "../../components/common/SendNotification";
import emailjs from "emailjs-com";

function EditPostLogic(post) {
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedMessage, setUpdatedMessage] = useState(post.message);
  const [updatedType, setUpdatedType] = useState(post.type);
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentStudent } = useAuth();

  const form = useRef();
  const updatePost = async (event) => {
    event.preventDefault();

    const { date, time } = GetCurrentDateTime();

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

        if (
          Object.keys(currentStudent).length === 0 ||
          (currentStudent.group !== updatedType &&
            currentStudent.specialization !== updatedType &&
            updatedType !== "College")
        ) {
        } else {
          sendNotification("UPDATED \n" + updatedTitle, updatedType);
          emailjs.sendForm(
            "service_g3elv0p",
            "template_xkwc30w",
            form.current,
            "wGFIRDXI0dcdI2h6X"
          );
        }

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
  };
}

export default EditPostLogic;
