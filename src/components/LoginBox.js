import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "../styles/LoginBox.css";
import { Button, Form } from "semantic-ui-react";

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
      <div className="section-login">
        <div className="login row">
          <div className="span-1-of-2">
            <form onSubmit={this.handleSubmit} className="ui form">
              <div className="field">
                <label htmlFor="username">Username</label>
                <input
                  className="ui input"
                  type="text"
                  name="username"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  className="ui input"
                  type="text"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button className="btn btn-ghost" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginBox;
