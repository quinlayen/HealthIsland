import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "../styles/Register.css";

//import {withRouter} from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      email: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

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
     
      <div className="register row">
         
        <div className="register-box span-1-of-3">
        <h2>register</h2>
          <form className="ui form" onSubmit={this.handleSubmit}>

            <div className="field">
              <input
                type="text"
                className="ui input"
                id="username"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <input
                type="email"
                className="ui input"
                id="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                className="ui input"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                className="ui input"
                id="confirmpassword"
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui button">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}
//export default withRouter(Register);
export default Register;
