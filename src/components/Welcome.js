import React, { Component, Fragment } from "react";
import HomeContent from "./HomeContent";

class Welcome extends Component {
  render() {
    return (
      <Fragment>
        <section className="hero is-link">
          <div className="container">
            <div className="has-text-centered">
              <h2>Welcome!</h2>
              <h2>You have successfully registered a new account.</h2>
 
              <h2>You will be Redirected to homepage in a few seconds </h2>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Welcome;
