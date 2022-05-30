import React from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { usePosts } from "../../contexts/PostsContext";

function Post() {
  const { posts } = usePosts();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  return !post ? (
    <></>
  ) : (
    <Card style={{ marginLeft: "20px", marginRight: "20px" }}>
      <Card.Body>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              {post.type}
            </p>
            <p
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              {post.time}
            </p>
            <p
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              {post.date}
            </p>
          </div>
          <h1 style={{ color: "black", textAlign: "center" }}>{post.title}</h1>
          <p style={{ maxWidth: 800 }}>{post.message}</p>
        </>
      </Card.Body>
    </Card>
  );
}

export default Post;
