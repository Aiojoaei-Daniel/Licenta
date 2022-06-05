import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

import LoginLogic from "./LoginLogic";

import "./login.css";

const Login = () => {
  const { currentUser, error, emailRef, passwordRef, loading, handleSubmit } =
    LoginLogic();

  return !currentUser ? (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Conectare Cadru Universitar</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="password">
                  <Form.Label>Parolă</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button className="w-100" type="submit" disabled={loading}>
                  Conectare
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
