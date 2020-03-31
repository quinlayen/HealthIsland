import React, { Component } from "react";
import { Hub } from "aws-amplify";
//import "../styles/Login.css";
import { Authenticator } from "aws-amplify-react";

class Register extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          console.log("listener data ", data.payload.event);
          console.log("signed in");
          this.props.authentication.setAuthState("signedIn");
          this.props.authentication.getUserData();
          //this.props.history.push("/");
          //this.props.authentication.setState({ authData: data.payload.data });
          break;
        case "signUp":
          console.log("signed up");
          this.props.authentication.setAuthState();
          break;
        case "signOut":
          console.log("signed out");
          this.props.authentication.setAuthState("signedOut");
          //this.props.authentication.setState({ authData: data.payload.data });
          break;
        case "signIn_failure":
          this.setState({
            authState: false,
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
      <div className="register">
        <Authenticator authState="signUp" />
      </div>
    );
  }
}

export default Register;

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

// import React, { Component } from "react";
// import { Auth } from "aws-amplify";
// import "../styles/Register.css";

// //import {withRouter} from 'react-router-dom'

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       confirmpassword: "",
//       email: ""
//     };
//   }

//   handleChange = event => {
//     this.setState({ [event.target.id]: event.target.value });
//   };

//   handleSubmit = async event => {
//     event.preventDefault();

//     const { username, email, password } = this.state;

//     try {
//       const signupResponse = await Auth.signUp({
//         username,
//         password,
//         attributes: {
//           email
//         }
//       });
//       console.log("signupResponse", signupResponse);

//       this.props.history.push("/welcome");
//       setTimeout(() => this.props.history.push("/"), 10000);
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

//       <div className="register row">

//         <div className="register-box span-1-of-3">
//         <h2>register</h2>
//           <form className="ui form" onSubmit={this.handleSubmit}>

//             <div className="field">
//               <input
//                 type="text"
//                 className="ui input"
//                 id="username"
//                 placeholder="Enter username"
//                 value={this.state.username}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="field">
//               <input
//                 type="email"
//                 className="ui input"
//                 id="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="field">
//               <input
//                 type="password"
//                 className="ui input"
//                 id="password"
//                 placeholder="Password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="field">
//               <input
//                 type="password"
//                 className="ui input"
//                 id="confirmpassword"
//                 placeholder="Confirm password"
//                 value={this.state.confirmPassword}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <button type="submit" className="ui button">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
// //export default withRouter(Register);
// export default Register;
