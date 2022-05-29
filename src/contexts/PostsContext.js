import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase-config";

const PostsContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

function PostsProvider({ children }) {
  const postsCollectionRef = collection(db, "posts");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);

      setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [children]);

  const value = { posts, setPosts };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export default PostsProvider;
