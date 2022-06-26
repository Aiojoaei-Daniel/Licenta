import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import PostsProvider from "./contexts/PostsContext";

import { PrivateRoute, NotFound, Navbar, Footer } from "./components";
import {
  EditPost,
  Posts,
  Login,
  Post,
  PostForm,
  StudentDataForm,
  StudentLogin,
  About,
} from "./containers";

import "./App.css";

function App() {
  const [post, setPost] = useState({});

  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <PostsProvider>
            <Navbar />
            <Route path="/login" component={Login} />
            <Route
              path="/student-login"
              render={(props) => <StudentLogin {...props} />}
            />
            <Route
              path="/student-register"
              render={(props) => <StudentDataForm {...props} />}
            />
            <Route path="/post/:id" render={(props) => <Post {...props} />} />
            <PrivateRoute path="/new-post" component={PostForm} />
            <PrivateRoute
              path="/edit-post/:id"
              component={EditPost}
              item={post}
            />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/"
              render={(props) => <Posts {...props} setPost={setPost} />}
            />
            <Redirect to="/" />
            <Footer />
          </PostsProvider>
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
