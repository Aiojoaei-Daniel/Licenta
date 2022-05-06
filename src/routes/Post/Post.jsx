import React from "react";
import { Card } from "react-bootstrap";

function Post({ post }) {
  return (
    <Card>
      <Card.Body>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <a
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              {post.type}
            </a>
            <a
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
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
                marginRight: "5px",
              }}
            >
              {post.date}
            </a>
          </div>
          <h1 style={{ color: "black", textAlign: "center" }}>{post.title}</h1>
          <p style={{ maxWidth: 800 }}>{post.message}</p>
          <div
            key={post.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ul></ul>
          </div>
        </>
      </Card.Body>
    </Card>
  );
}

export default Post;
