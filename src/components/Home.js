import React from 'react'
import Hero from "./Hero";
import Features from "./Features";
import "../styles/Home.css";


export default function Home() {
  return (
    <div className="home">

      <Hero />
      <Features />

    </div>
  );
}
