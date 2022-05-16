import React, { useState } from "react";
import { Card } from "react-bootstrap";

import Posts from "../Posts/Posts";
import CategorySection from "../../components/CategorySection/CategorySection";
import PostTypes from "../../components/common/PostTypes";

import "./Home.css";

import { useAuth } from "../../contexts/AuthContext";

function Home({ setPost, searchValue }) {
  const [selectedType, setSelectedType] = useState("All");
  const { types } = PostTypes();
  const { currentUser } = useAuth();

  return (
    <>
      <div className="row" style={{ maxWidth: "1550px" }}>
        <div
          className="col-2"
          style={{ marginLeft: "20px", marginRight: "10px" }}
        >
          <CategorySection items={types} setSelectedType={setSelectedType} />
        </div>
        <div className="w-100" style={{ maxWidth: "1240px" }}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Card.Body>
              <Posts
                setPost={setPost}
                selectedType={selectedType}
                searchValue={searchValue}
                currentUser={currentUser}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
