import React, { Component } from "react";
import "../styles/Hero.css";

class Hero extends Component {
  render() {
    return (
      <div className="section hero group">
        <br />
        <br />
        <br />
        <div className="hero row">
          <div className="hero-text-box span-1-of-2">
            <h1>
              We develop experiences and worlds that entertain, inspire, create
              community and drive commerce
            </h1>
            <a className="btn btn-ghost" href="/features">
              Tell Me More
            </a>
          </div>
        
        </div>
      </div>
    );
  }
}

export default Hero;
