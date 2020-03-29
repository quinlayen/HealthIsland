// import React, { Component } from "react";
// import "../styles/Hero.css";

// class Hero extends Component {
//   render() {
//     return (
//       <div className="section hero group">
//         <br />
//         <br />
//         <br />
//         <div className="row">
//           <div className="hero-text-box span-1-of-2">
//             <h1>
//               Worlds that entertain, inspire,
//               create community and drive commerce
//             </h1>
//             <a className="btn btn-ghost" href="/features">
//               Tell Me More
//             </a>
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

// export default Hero;

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
