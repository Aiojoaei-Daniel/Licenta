import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import GetCurrentDateTime from "../../components/common/GetCurrentDateTime";

//! not used
function PostFormLogic(props) {
  const postsCollectionRef = collection(db, "posts");

  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState();
  const [newMessage, setNewMessage] = useState();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

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
          date: "2022/05/08",
          time: time,
        });

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

  return { error, handlePostType, createPost, setNewMessage, setNewTitle };
}

export default PostFormLogic;
