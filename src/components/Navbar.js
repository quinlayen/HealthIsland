import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
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
                  <p>{this.props.authentication.user.username}</p>
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

// import React, { Component } from "react";
// //import "../styles/Navbar.css";
// import { Auth } from "aws-amplify";
// import { Link } from "react-router-dom";

// class Navbar extends Component {
//   handleLogOut = async event => {
//     event.preventDefault();
//     try {
//       Auth.signOut();
//       this.props.authentication.setAuthStatus(false);
//       this.props.authentication.user(null);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   render() {
//     return (
//       <nav className="navbar" role="navigation" aria-label="main navigation">
//         <div className="navbar-brand">
//           <Link className="navbar-item" to="/">
//             <img
//               src={require("../styles/images/IMWL_Logo.png")}
//               // height="100"
//               // width="112"
//               alt="IMWL Logo"
//             />

//             <div className="brand">
//               <h3>Immersive Worlds</h3>
//             </div>
//           </Link>
//         </div>
//         <div className="navbar-menu">
//           <div className="navbar-end">
//             <div className="navbar-item">
//               {this.props.authentication.isAuthenticated &&
//                 this.props.authentication.user && (
//                   <p>{this.props.authentication.user.username}</p>
//                 )}
//               <div className="buttons">
//                 {!this.props.authentication.isAuthenticated && (
//                   <div>
//                     <div className="navbar-item">
//                       <Link className="btn btn-ghost" to="/register">
//                         Register
//                       </Link>
//                     </div>

//                     <div className="navbar-item">
//                       <Link className="btn" to="/login">
//                         Login
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//                 {this.props.authentication.isAuthenticated && (
//                   <div className="navbar-item">
//                     <link className="btn" to="/">
//                       Logout
//                     </link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navbar;

// import React, { Component } from "react";
// import "../styles/Navbar.css";
// import { Auth } from "aws-amplify";
// import {Link} from 'react-router-dom';

// class Navbar extends Component {
//   handleLogOut = async event => {
//     event.preventDefault();
//     try {
//       Auth.signOut();
//       this.props.authentication.setAuthStatus(false);
//       this.props.authentication.user(null);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   render() {
//     return (
//       <nav className="navbar">
//         <div className="row">
//           <Link to="/">
//           <img
//             className="logo"
//             src={require("../styles/images/IMWL_Logo.png")}
//             alt="IMWL Logo"
//           />
//           </Link>
//           <div className="brand">
//             <h3>Immersive Worlds</h3>
//           </div>
//           <div className="main-nav">
//             {this.props.authentication.isAuthenticated &&
//               this.props.authentication.user && (
//                 <div>
//                 <p>Welcome {this.props.authentication.user.username}</p>
//                 <Link onClick={this.handleLogOut} className="btn btn-light">
//                 Log out
//               </Link>
//               </div>
//               )}

//             {!this.props.authentication.isAuthenticated && (
//               <ul>
//                 <li>
//                   <Link className="" to="/register">
//                     Register
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="" to="/login">
//                     Login
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </div>
//           {/* {this.props.authentication.isAuthenticated && (
//             <Link onClick={this.handleLogOut} className="btn btn-light">
//               Log out
//             </Link>
//           )} */}
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navbar;
