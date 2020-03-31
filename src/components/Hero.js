import React from "react";

export default function Hero() {
  return (
    <section className="hero is-link">
      <div className="hero-body">
        <div className="container">
          <img
            src={require("../styles/images/Physical_4.png")}
            alt="AR & VR Development"
          />
        </div>
      </div>
    </section>
  );
}
