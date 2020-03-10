import React, { Component } from "react";
import { Auth } from "aws-amplify";
import FormErrors from "./FormErrors";
import "../styles/Login.css";
import Validate from "./utility/FormValidation";
import { Button, Form, FormGroup, Label,Input} from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {
        cognito: null,
        blankfield: false
      }

    };
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

  //form validation
  this.clearErrorState();
  const error = Validate(event, this.state);
  if (error) {
    this.setState({
      errors: {...this.state.errors, ...error}
    })
  }
  
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log("user: ", user);
      this.props.authentication.setAuthStatus(true)
      this.props.authentication.setUser(user)
      this.props.history.push("/");
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
        <h1>Log In</h1>
        <br />
        <FormErrors formerrors={this.state.errors} />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username or email"
              value={this.state.username}
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
            <a href="./forgotpassword">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
