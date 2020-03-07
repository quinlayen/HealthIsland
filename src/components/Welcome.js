import React, { Component } from "react";
import "../styles/Welcome.css"

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="container">
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you a email. Please click on the confirmation link to verify your account.</p>
        </div>
      </div>
    );
  }
}

export default Welcome;
