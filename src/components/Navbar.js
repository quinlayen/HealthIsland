import React, { Component } from "react";
import "../styles/Navbar.css";
import { Auth } from "aws-amplify";
import {Link} from 'react-router-dom';

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
          <Link to="/">
          <img
            className="logo"
            src={require("../styles/images/IMWL_Logo.png")}
            alt="IMWL Logo"
          />
          </Link>
          <div className="brand">
            <h3>Immersive Worlds</h3>
          </div>
          <div className="main-nav">
            {this.props.authentication.isAuthenticated &&
              this.props.authentication.user && (
                <div>
                <p>Welcome {this.props.authentication.user.username}</p>
                <Link onClick={this.handleLogOut} className="btn btn-light">
                Log out
              </Link>
              </div>
              )}

            {!this.props.authentication.isAuthenticated && (
              <ul>
                <li>
                  <Link className="" to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
          {/* {this.props.authentication.isAuthenticated && (
            <Link onClick={this.handleLogOut} className="btn btn-light">
              Log out
            </Link>
          )} */}
        </div>
      </nav>
    );
  }
}

export default Navbar;


