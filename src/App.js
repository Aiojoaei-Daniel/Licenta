import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import PostsProvider from "./contexts/PostsContext";

import { PrivateRoute, Navbar, NotFound } from "./components";
import {
  EditPost,
  Home,
  Login,
  Post,
  PostForm,
  StudentDataForm,
  StudentLogin,
} from "./containers";

import "./App.css";

function App() {
  const [post, setPost] = useState({});
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <PostsProvider>
              <Navbar setSearchValue={setSearchValue} />
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
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    searchValue={searchValue}
                    setPost={setPost}
                  />
                )}
              />
              {/* <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" /> */}
            </PostsProvider>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
