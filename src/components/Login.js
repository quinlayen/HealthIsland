import React, { Component } from "react";
import { Hub, Auth } from "aws-amplify";

//import "../styles/Login.css";
import { Authenticator, Greetings } from "aws-amplify-react";

class Login extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          console.log("authenticated");
          console.log("listener data ", data.payload.event);
          this.props.authentication.setAuthState(true);
          this.props.authentication.getUserData();
          //TODO: the below push line gives a warring that I should eventually fix
          this.props.history.push("/");
          break;
        case "signOut":
          console.log("signed out");
          this.props.authentication.setAuthState(false);
          break;
        case "signIn_failure":
          this.setState({
            isAuthenticated: false,
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
        <Authenticator hide={[Greetings]} />
      </div>
    );
  }
}

export default Login;
