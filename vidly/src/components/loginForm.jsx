import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../components/common/form";
import Input from "./common/input";
import { login, getCurrentUser } from "../services/authService";

const LoginForm = ({ setUser }) => {
  const [loginErrors, setLoginErrors] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/[A-Z]/, "upper-case")
      .regex(/[a-z]/, "lower-case")
      .regex(/[^\w]/, "special character")
      .regex(/[0-9]/, "number")
      .label("Password"),
  };

  const doSubmit = async (data) => {
    try {
      setLoginErrors(null);
      await login(data);
      const user = getCurrentUser();
      setUser(user);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLoginErrors("Invalid email or password");
      }
    }
  };

  return (
    <div className="form-group">
      <h1>Login</h1>
      <Form
        schema={schema}
        defaultValues={{ email: "", password: "" }}
        doSubmit={doSubmit}
        formError={loginErrors}
      >
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
