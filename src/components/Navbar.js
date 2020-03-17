import React, { Component } from "react";
import "../styles/Navbar.css";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.authentication.setAuthStatus(false);
      this.props.authentication.user(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar">
        <div className="row">
          <img
            className="logo"
            src={require("../styles/images/IMWL_Logo_white.png")}
            alt="IMWL Logo"
          />
          <div className="brand">
            <p>Immersive Worlds</p>
          </div>
          <div className="main-nav">
            {this.props.authentication.isAuthenticated &&
              this.props.authentication.user && (
                <p>Welcome {this.props.authentication.user.username}</p>
              )}

            {!this.props.authentication.isAuthenticated && (
              <ul>
                <li>
                  <a className="" href="/register">
                    Register
                  </a>
                </li>
                <li>
                  <a
                    className=""
                    href="https://healthisland.auth.us-west-2.amazoncognito.com/login?client_id=7snhq2k4sb77gj8ablhiuju2u6&response_type=code&scope=phone+email+openid&redirect_uri=http://localhost:3000/"
                  >
                    Login
                  </a>
                </li>
              </ul>
            )}
          </div>
          {this.props.authentication.isAuthenticated && (
            <a href="/" onClick={this.handleLogOut} className="btn btn-light">
              Log out
            </a>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
