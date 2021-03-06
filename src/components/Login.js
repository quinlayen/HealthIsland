import React, { Component } from "react";
import { Hub } from "aws-amplify";
import { Authenticator, Greetings, AmplifyTheme } from "aws-amplify-react";

class Login extends Component {
  constructor(props) {
    super(props);
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          this.props.authentication.setAuthState(true);
          this.props.authentication.getUserData();
          //TODO: the below push line gives a warring that I should eventually fix
          this.props.history.push("/fitbit/auth");
          break;
        case "signOut":
          console.log("signed out");
          this.props.authentication.setAuthState(false);
          break;
        case "signUp":
          console.log("signed up");
          this.props.authentication.setAuthState();
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
    const theme = {
      ...AmplifyTheme,
      button: {
        ...AmplifyTheme.button,
        backgroundColor: "var(--light-blue)"
      }
    };
    return (
      <div className="login">
        <Authenticator hide={[Greetings]} theme={theme} />
      </div>
    );

  }

}

export default Login;

