import React, { Component } from "react";
import "../styles/Hero.css";

class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <br/>
        <br/>
        <br/>
        <div className="hero-text-box">
          <h1>
            At Immersive Worlds we develop experiences and worlds that entertain, inspire, create community and drive
            commerce
          </h1>
          <a className="btn btn-ghost" href="/">Tell Me More</a>
        </div>
      </div>
    );
  }
}

export default Hero;
