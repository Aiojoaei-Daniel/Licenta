import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";

import Post from "./routes/Post/Post";
import PostForm from "./routes/PostForm/PostForm";
import Login from "./routes/Login/Login";
import SignUp from "./routes/Register/Register";
import Home from "./routes/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import EditPost from "./routes/EditPost/EditPost";
// import NotFound from "./components/common/NotFound";

import "./App.css";

function App() {
  const [post, setPost] = useState({});
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <Navbar />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route
              path="/post"
              render={(props) => <Post {...props} post={post} />}
            />
            <PrivateRoute path="/new-post" component={PostForm} />
            <PrivateRoute path="/edit-post" component={EditPost} item={post} />
            {/* <Route path="/not-found" component={NotFound} /> */}
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} setPost={setPost} />}
            />
            {/* <Redirect to="/not-found" /> */}
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
