import React from "react";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";

import LoginLogic from "./LoginLogic";
import Alert from "../../components/Alert/Alert";

import loginImg from "../../images/prof1.png";
import "./login.css";

const Login = () => {
  const { currentUser, error, emailRef, passwordRef, loading, handleSubmit } =
    LoginLogic();

  return !currentUser ? (
    <>
      <div className="login-page" id="login-page">
        <h1 className="login-page-title">Conectare Cadru Universitar</h1>
        {error && <Alert error={error} />}
        <div className="login-body">
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="password">
              <Form.Label>Parolă</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <button className="btn login-btn" type="submit" disabled={loading}>
              Conectare
            </button>
          </Form>
          <div id="img-container">
            <img id="login-img" src={loginImg} alt="" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
