import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "../styles/Register.css";
import FormErrors from "./FormErrors";
import Validate from "./utility/FormValidation";

//import {withRouter} from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    };
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    const { username, email, password } = this.state;

    try {
      const signupResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log("signupResponse", signupResponse);

      this.props.history.push("/welcome");
      setTimeout(() => this.props.history.push("/"), 10000);
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: error
        }
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <FormErrors formerrors={this.state.errors} />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              placeholder="Confirm password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}
//export default withRouter(Register);
export default Register;
