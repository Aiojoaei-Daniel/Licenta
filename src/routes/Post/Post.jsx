import React from "react";
import { Card } from "react-bootstrap";

function Post({ post }) {
  return !post.id ? (
    <h1>No post selected</h1>
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
        </>
      </Card.Body>
    </Card>
  );
}

export default Post;
