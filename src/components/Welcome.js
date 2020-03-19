import React, { Component } from "react";
import "../styles/Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="welcome span-1-of-2">
          <h2>Welcome!</h2>
          <h2>You have successfully registered a new account.</h2>
          <h2>
            We've sent you a email. Please click on the confirmation link to
            verify your account.  After you have verified please return to this page.
          </h2>
          <h2>You will be Redirected to homepage in a few seconds </h2>
        </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
