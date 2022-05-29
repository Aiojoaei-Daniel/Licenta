import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";

import { db } from "../../firebase-config";
import { paginate } from "./../../components/Pagination/Paginate";
import { usePosts } from "./../../contexts/PostsContext";

function PostsLogic(setPost, selectedType, searchValue) {
  const postsCollectionRef = collection(db, "posts");
  const { posts, setPosts } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(postsCollectionRef);

      setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const getPagedPosts = () => {
    let filteredPosts = [];
    const pageSize = 5;

    if (searchValue !== "") {
      filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    } else {
      filteredPosts = posts.filter(
        (post) => post.type == selectedType || selectedType === "All"
      );
    }

    const postsCount = filteredPosts.length;
    const sorted = _.orderBy(filteredPosts, ["date", "time"], ["desc", "desc"]);
    let pagedPosts = paginate(sorted, currentPage, pageSize);

    // if i delete the last post on a page it should redirect me to the previous page

    if (pagedPosts.length === 0) {
      pagedPosts = paginate(sorted, currentPage - 1, pageSize);
    }

    return { pagedPosts, postsCount, pageSize };
  };

  const { pagedPosts, postsCount, pageSize } = getPagedPosts();

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    // refresh posts
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
  };
}

export default PostsLogic;
