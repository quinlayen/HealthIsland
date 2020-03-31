import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.authentication.setAuthState(false);
      this.props.history.push("/")
      //this.props.authentication.user(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="logo" to="/">
            <img
              src={require("../styles/images/IMWL_Logo.png")}
              width="75"
              height="75"
              alt="IMWL logo"
            />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Immersive Worlds
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.authentication.isAuthenticated &&
                this.props.authentication.user && (
                  <p>Hello {this.props.authentication.user.username}</p>
                )}
              <div className="buttons">
                {!this.props.authentication.isAuthenticated && (
                  <div>
                    <Link to="/register" className="button is-link">
                      Sign up
                    </Link>
                    <Link to="/login" className="button is-light">
                      Log in
                    </Link>
                  </div>
                )}
                {this.props.authentication.isAuthenticated && (
                  <div className="navbar-item">
                    <Link className="button is-light" to="/" onClick={this.handleLogOut}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}