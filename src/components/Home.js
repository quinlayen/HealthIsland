// import React from 'react'
// import Hero from "./Hero";
// import Features from "./Features";
// import "../styles/Home.css";


// export default function Home() {
//   return (
//     <div className="home">

//       <Hero />
//       <Features />

//     </div>
//   );
// }

import React, { Fragment } from "react";
import Hero from "./Hero";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
      Brand Building, eCommerce
          and Enterprise applications
        </p>
      </div>
      <HomeContent />
    </Fragment>
  );
}
