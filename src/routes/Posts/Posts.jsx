import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import _ from "lodash";

import { useAuth } from "../../contexts/AuthContext";
import Pagination from "./../../components/Pagination/Pagination";

import { db } from "../../firebase-config";

import { paginate } from "./../../components/Pagination/Paginate";

function Posts({ setPost, selectedType }) {
  const postsCollectionRef = collection(db, "posts");
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter(
    (post) => post.type == selectedType || selectedType === "All"
  );

  const sorted = _.orderBy(filteredPosts, ["date", "time"], ["desc", "desc"]);
  console.log(sorted, filteredPosts);

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

  return (
    <>
      {pagedPosts.length === 0 ? (
        <h1>No posts available</h1>
      ) : (
        pagedPosts.map((post) => (
          <div
            key={post.id}
            style={{
              borderBottom: "3px solid #F0F8FF",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ul>
              <Link
                to="/post"
                onClick={() => {
                  handlePostClick(post);
                }}
              >
                <h1 style={{ color: "black" }}>{post.title}</h1>
              </Link>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.date}
              </a>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.time}
              </a>
              <a
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                  marginRight: "5px",
                }}
              >
                {post.type}
              </a>
            </ul>
            {currentUser && (
              <div style={{ marginTop: "10px" }}>
                <Link
                  to="/edit-post"
                  className="btn btn-primary"
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
      <Pagination
        itemsCount={postsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Posts;
