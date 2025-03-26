import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import Input from "./common/input";

const LoginForm = () => {
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className="form-group">
      <h1>Login</h1>
      <Form schema={schema} doSubmit={doSubmit}>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password" />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
