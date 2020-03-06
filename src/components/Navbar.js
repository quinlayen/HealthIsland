import React, { Component } from "react";
import "../styles/Navbar.css";
import { Auth } from "aws-amplify";

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
      // <header className="bg-blue-500 py-6 px-4">
      //   <nav className="flex items-center justify-between flex-wrap">
      //     <div className="flex items-center flex-shrink-0 text-white mr-6">
      //       <img
      //         className="fill-current h-10 mr-2"
      //         src="IMWL_Logo_1k.png"
      //         alt=""
      //       />
      //       <span className="font-semibold text-xl tracking-tight">
      //         Immsersive Worlds
      //       </span>
      //     </div>
      //   </nav>
      // </header>
      //       <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      //   <div class="flex items-center flex-shrink-0 text-white mr-6">
      //     <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      //     <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
      //   </div>
      //   <div class="block lg:hidden">
      //     <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      //       <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      //     </button>
      //   </div>
      //   <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      //     <div class="text-sm lg:flex-grow">
      //       <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      //         Docs
      //       </a>
      //       <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      //         Examples
      //       </a>
      //       <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
      //         Blog
      //       </a>
      //     </div>
      //     <div>
      //       <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
      //     </div>
      //   </div>
      // </nav>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar navbar-custom">
        <div className="container-fluid navbar-custom">
          <a className="navbar-brand" href="/">
            <img src="IMWL_Logo_1k.png" alt="IMWL logo" />
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
                    <strong>
                      Home <span className="sr-only">(current)</span>
                    </strong>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    <strong>
                      Products <span className="sr-only">(current)</span>
                    </strong>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    <strong>
                      About <span className="sr-only">(current)</span>
                    </strong>
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                {this.props.authentication.isAuthenticated &&
                  this.props.authentication.user && (
                    <p>Welcome {this.props.authentication.user.username}</p>
                  )}
                <div className="buttons">
                  {!this.props.authentication.isAuthenticated && (
                    <div>
                      <a href="/register" className="btn btn-success">
                        <strong>Register</strong>
                      </a>
                      <a href="/login" className="btn btn-light">
                        Log in
                      </a>
                    </div>
                  )}
                  {this.props.authentication.isAuthenticated && (
                    <a
                      href="/"
                      onClick={this.handleLogOut}
                      className="btn btn-light"
                    >
                      Log out
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
