import React, { useState } from "react";
import { Button,  Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // setValidated(true);
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: "", password: "" });
  };

  return (
    <>
      {showAlert && (
        <Message
          error
          header="Invalid Login!"
          content="Something went wrong with your login credentials!"
        />
      )}
      <Form onSubmit={handleFormSubmit}>
        <Form.Field required>
          <label>Email</label>
          <input
            placeholder="email@example.com"
            required
            type="email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Field>
        <Button
          positive
          type="submit"
          disabled={!(userFormData.email && userFormData.password)}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
