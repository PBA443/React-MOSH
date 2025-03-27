import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";
import { register } from "../services/userService";

const RegisterForm = () => {
  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const doSubmit = async (data) => {
    console.log("Submitted", data);
    try {
      await register(data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="form-group">
      <h1>Register</h1>
      <Form
        schema={schema}
        doSubmit={doSubmit}
        defaultValues={{ email: "", password: "", name: "" }}
      >
        <Input name="email" label="Email" placeholder="Enter your Email" />
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
