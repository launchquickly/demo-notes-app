import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import React, { useState } from "react";

import { onError } from "../lib/errorLib";
import { useHistory } from "react-router-dom";

import { useAppContext } from "../lib/contextLib";

import "./Login.css";

export default function Login() {

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const { userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
        await Auth.signIn(email, password);
        userHasAuthenticated(true);
        history.push("/");
    } catch (e) {
       onError(e);
        setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
        >
            Login
        </LoaderButton>
      </Form>
    </div>
  );
}