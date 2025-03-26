import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";

const RegisterForm = () => {
  const schema = {
    username: Joi.string().required().email().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const doSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className="form-group">
      <h1>Register</h1>
      <Form schema={schema} doSubmit={doSubmit}>
        <Input name="username" label="Email" />
        <Input name="password" label="Password" type="password" />
        <Input name="name" label="Name" />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
