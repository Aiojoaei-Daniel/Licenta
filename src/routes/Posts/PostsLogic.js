import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";

import { useAuth } from "../../contexts/AuthContext";

import { db } from "../../firebase-config";

import { paginate } from "./../../components/Pagination/Paginate";

function PostsLogic(setPost, selectedType) {
  const postsCollectionRef = collection(db, "posts");
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter(
    (post) => post.type == selectedType || selectedType === "All"
  );

  const sorted = _.orderBy(filteredPosts, ["date", "time"], ["desc", "desc"]);

  const pageSize = 5;
  const postsCount = filteredPosts.length;

  const pagedPosts = paginate(sorted, currentPage, pageSize);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);

      setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    const posts = await getDocs(postsCollectionRef);
    setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handlePostClick = (post) => {
    setPost(post);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    onPageChange,
    handlePostClick,
    deletePost,
    postsCount,
    pagedPosts,
    pageSize,
    currentPage,
    currentUser,
  };
}

export default PostsLogic;
