import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Form, Message } from "semantic-ui-react";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <>
      {showAlert && (
        <Message
          error
          header="Invalid Signup!"
          content="Something went wrong with your signup!"
        />
      )}
      <Form onSubmit={handleFormSubmit}>
        <Form.Field required>
          <label>Username</label>
          <input
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </Form.Field>
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
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
