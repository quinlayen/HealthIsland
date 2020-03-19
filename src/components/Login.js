import React, { Component } from "react";
import { Hub } from "aws-amplify";
//import "../styles/Login.css";
import { Authenticator } from "aws-amplify-react";

class Login extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          console.log("signed in");
          this.props.authentication.setAuthState("signedIn");
          this.props.authentication.getUserData();
          //this.props.authentication.setState({ authData: data.payload.data });
          break;
          case "signOut":
            console.log("signed out");
            this.props.authentication.setAuthState("signedOut");
            //this.props.authentication.setState({ authData: data.payload.data });
            break;
        case "signIn_failure":
          this.setState({
            authState: "signIn",
            authData: null,
            authError: data.payload.data
          });
          break;
        default:
          break;
      }
    });
  }

  render() {
    return (
      <div className="login">
        <Authenticator />
      </div>
    );
  }
}

export default Login;

// import React, { Component } from "react";
// import { Auth } from "aws-amplify";
// import "../styles/Login.css";
// import { Authenticator } from "aws-amplify-react";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//     };
//   }

//   handleChange = event => {
//     this.setState({ [event.target.id]: event.target.value });
//   };

//   handleSubmit = async event => {
//     event.preventDefault();

//     try {
//       const user = await Auth.signIn(this.state.username, this.state.password);
//       console.log("user: ", user);
//       this.props.authentication.setAuthStatus(true);
//       this.props.authentication.setUser(user);
//       this.props.history.push("/");
//     } catch (error) {
//       // eslint-disable-next-line no-unused-vars
//       let err = null;
//       !error.message ? (err = { message: error }) : (err = error);
//       this.setState({
//         errors: {
//           ...this.state.errors,
//           cognito: error
//         }
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="login row">
//         <div className="login-box span-1-of-4">
//           <div className="login-modal">
//             <div className="modal-content">
//               <h2>login</h2>
//               <form className="ui form" onSubmit={this.handleSubmit}>
//                 <div className="field">
//                   <input
//                     type="text"
//                     className="ui input"
//                     id="username"
//                     placeholder="Enter username or email"
//                     value={this.state.username}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//                 <div className="field">
//                   <input
//                     type="password"
//                     className="ui input"
//                     id="password"
//                     placeholder="Password"
//                     value={this.state.password}
//                     onChange={this.handleChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <a href="./forgotpassword">Forgot password?</a>
//                 </div>
//                 <br />
//                 <button type="submit" className="ui button">
//                   Log In
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;

//    {/* <div className="login row">
//    <div className="login-box span-1-of-3">
//  <h2>login</h2>
//      <form className="ui form" onSubmit={this.handleSubmit}>
//        <div className="field">
//           <input
//             type="text"
//             className="ui input"
//             id="username"
//             placeholder="Enter username or email"
//             value={this.state.username}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="password"
//             className="ui input"
//             id="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <a href="./forgotpassword">Forgot password?</a>
//         </div>
//         <br/>
//         <button type="submit" className="ui button">
//           Log In
//         </button>
//       </form>

//     </div>
//   </div> */}
