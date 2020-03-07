import React, { Fragment } from "react";
import Hero from "./Hero";
import '../styles/Home.css'
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="container">
        <p className="has-text-centered">
          <span className="tag is-primary">New</span> Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
      <HomeContent />
    </Fragment>
  );
}
