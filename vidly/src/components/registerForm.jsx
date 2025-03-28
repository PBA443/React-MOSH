import React, { useState } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";
import { register } from "../services/userService";

const RegisterForm = () => {
  const [registrationError, setRegistrationError] = useState(null);

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string()
      .min(8)
      .regex(/[A-Z]/, "upper-case")
      .regex(/[a-z]/, "lower-case")
      .regex(/[^\w]/, "special character")
      .regex(/[0-9]/, "number")
      .label("Password"),
    name: Joi.string().min(3).required().label("Name"),
  };

  const doSubmit = async (data) => {
    try {
      setRegistrationError(null);
      await register(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setRegistrationError("A user with this email already exists.");
      } else {
        setRegistrationError("Registration failed. Please try again later.");
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <div className="form-group">
      <h1>Register</h1>
      <Form
        schema={schema}
        doSubmit={doSubmit}
        successMessage={"You are successfully registerd."}
        defaultValues={{ email: "", password: "", name: "" }}
      >
        <Input name="email" label="Email" placeholder="Enter your Email" />
        {registrationError && (
          <div className="alert alert-danger">{registrationError}</div>
        )}
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Input name="name" label="Name" placeholder="Enter your Name" />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
