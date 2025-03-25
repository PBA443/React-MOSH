import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Passsword"),
  };

  doSubmit = () => {
    console.log("Submited");
  };

  render() {
    return (
      <div className="form-group">
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Passsword")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
