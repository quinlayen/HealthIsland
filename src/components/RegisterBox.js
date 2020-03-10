import React, { Component } from "react";
import { Auth } from "aws-amplify";

class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
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
      <form onSubmit={this.handleSubmit} className="inner-container">
          <div className="header">
              Register
          </div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="=Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              className="login-input"
              type="text"
              name="password"
              placeholder="Password"
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default RegisterBox;
