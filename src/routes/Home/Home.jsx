import React, { useState } from "react";
import { Card } from "react-bootstrap";

import Posts from "../Posts/Posts";
import ListGroup from "../../components/common/ListGroup";
import PostTypes from "../../components/common/PostTypes";

import "./Home.css";

function Home({ setPost }) {
  const [selectedType, setSelectedType] = useState("All");
  const { types } = PostTypes();

  return (
    <>
      <div className="row">
        <div className="col-2">
          <ListGroup items={types} setSelectedType={setSelectedType} />
        </div>
        <div className="w-100" style={{ maxWidth: "1240px" }}>
          <Card>
            <Card.Body>
              <Posts setPost={setPost} selectedType={selectedType} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
