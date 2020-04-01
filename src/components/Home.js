import React, { Component, Fragment } from "react";
import Hero from "./Hero";
import HomeContent from "./HomeContent";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  testCall = () => {
    console.log("test");
  };

  render() {
    return (
      <Fragment>
        <Hero />
        <div className="box cta">
          <p className="has-text-centered">
            Brand Building, eCommerce and Enterprise applications
          </p>
        </div>
        <HomeContent />
      </Fragment>
    );
  }
}

export default Home;
