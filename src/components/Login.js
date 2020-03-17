import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "../styles/Login.css";

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
    
        <div className="login row">
          <div className="login-box span-1-of-3">
        <h2>login</h2>
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <input
                  type="text"
                  className="ui input"
                  id="username"
                  placeholder="Enter username or email"
                  value={this.state.username}
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
            
              <div className="form-group">
                <a href="./forgotpassword">Forgot password?</a>
              </div>
              <br/>
              <button type="submit" className="ui button">
                Log In
              </button>
            </form>

          </div>
        </div>
  
    );
  }
}

export default Login;
