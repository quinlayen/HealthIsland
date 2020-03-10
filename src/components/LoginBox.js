import React, { Component } from "react";
import { Auth } from "aws-amplify";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log("user: ", user);
      this.props.authentication.setAuthStatus(true);
      this.props.authentication.setUser(user);
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
      <form onSubmit={this.handleSubmit} className="inner-container">
          <div className="header">
              Login
          </div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="=Enter username or email"
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

export default LoginBox;
