import React, { Component } from "react";
import { Hub } from "aws-amplify";

//import "../styles/Login.css";
import { Authenticator, Greetings } from "aws-amplify-react";

class Login extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          console.log("signed in");
          this.props.authentication.setAuthState("signedIn");
          this.props.authentication.getUserData();
          //TODO: the below push line gives a warring that I should eventually fix
          this.props.history.push("/");
          //this.props.authentication.setState({ authData: data.payload.data });
          break;
        case "signOut":
          console.log("signed out");
          this.props.authentication.setAuthState("signedOut");

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
    this.state = {
      authState: null
    };
  }

  componentDidMount() {
    console.log("authstate in login", this.props.authentication.authstate);
    if (this.props.authentication.authState === "signedIn") {
      console.log("login mounted");
      this.props.history.push("/home");
    }
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