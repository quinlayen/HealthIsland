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
      <nav className="navbar">
        <div className="row">
          <img
            className="logo"
            src={require("../styles/images/IMWL_Logo_white.png")}
            alt="IMWL Logo"
          />
          <ul className="main-nav">
            <li>
              <a className="btn btn-full" href="/register">Register</a>
            </li>
            <li>
              <a className="btn btn-ghost" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      // <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolling-navbar navbar-custom">
      //   <div className="container-fluid navbar-custom">
      //     <a className="navbar-brand" href="/">
      //       <img src="IMWL_Logo_1k.png" alt="IMWL logo" />
      //     </a>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#navbarSupportedContent"
      //       aria-controls="navbarSupportedContent"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarSupportContent">
      //       <div className="navbar-start">
      //         <ul className="navbar-nav mr-auto">
      //           <li className="nav-item active">
      //             <a className="nav-link" href="/">
      //               <strong>
      //                 Home <span className="sr-only">(current)</span>
      //               </strong>
      //             </a>
      //           </li>
      //           <li className="nav-item active">
      //             <a className="nav-link" href="/">
      //               <strong>
      //                 Products <span className="sr-only">(current)</span>
      //               </strong>
      //             </a>
      //           </li>
      //           <li className="nav-item active">
      //             <a className="nav-link" href="/">
      //               <strong>
      //                 About <span className="sr-only">(current)</span>
      //               </strong>
      //             </a>
      //           </li>
      //         </ul>
      //       </div>

      //       <div className="navbar-end">
      //         <div className="navbar-item">
      //           {this.props.authentication.isAuthenticated &&
      //             this.props.authentication.user && (
      //               <p>Welcome {this.props.authentication.user.username}</p>
      //             )}
      //           <div className="buttons">
      //             {!this.props.authentication.isAuthenticated && (
      //               <div>
      //                 <a href="/register" className="btn btn-success">
      //                   <strong>Register</strong>
      //                 </a>
      //                 <a href="/login" className="btn btn-light">
      //                   Log in
      //                 </a>
      //               </div>
      //             )}
      //             {this.props.authentication.isAuthenticated && (
      //               <a
      //                 href="/"
      //                 onClick={this.handleLogOut}
      //                 className="btn btn-light"
      //               >
      //                 Log out
      //               </a>
      //             )}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
    );
  }
}

export default Navbar;
