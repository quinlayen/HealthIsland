import React, { Component } from "react";
import "./Navbar.css";
import { Auth } from "aws-amplify";

class Navbar extends Component {

handleLogOut = async event =>{
  event.preventDefault();
  try {
    Auth.signOut();
    this.props.auth.setAuthStatus(false);
    this.props.auth.user(null);
  }catch (error){
    console.log(error.message)
  }
}

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top scrolling-navbar navbar-custom">
        <div className="container-fluid navbar-custom">
          <a className="navbar-brand" href="/">
            <img src="IMWL_Logo.png" height="70" alt="IMWL logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportContent">
            <div className="navbar-start">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Products <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    About <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <ul className="navbar-nav mr-auto" />
              <ul className="navbar-nav">
                <li>
                  {this.props.auth.isAuthenticated && this.props.auth.user && (
                    <p>Hello {this.props.auth.user.username}</p>
                  )}
                </li>
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="btn btn-success">
                      Register
                    </a>
                    <a href="/login" className="btn btn-secondary">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="btn btn-secondary">
                    Log Out
                  </a>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
