import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar navbar-custom">
          <div className="container-fluid navbar-custom">
            <div className="navbar-start">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Private Policy <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    Links <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active=false">
                  <a className="nav-link" href="/">
                    News <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </footer>
    );
  }
}

export default Footer;
