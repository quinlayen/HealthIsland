import React, { Component } from "react";
import "./Welcome.css"

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h2>Welcome!</h2>
          <h4>You have successfully registered a new account.  Please check your email to confirm.</h4>
        </div>
      </div>
    );
  }
}

export default Welcome;
