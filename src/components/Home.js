import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <section className="container">
          <h1>
          At ImmersiveWorlds, we develop experiences and worlds for enterprises that entertain, inspire, create community and drive commerce
          </h1>
        <div className="columns features">
          <div className="column is-4">
            <div className="card is-shady">
              <div className="card-image has-text-centered">
                <i className="fa fa-paw"></i>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Healthcare</h4>
                  <p>
                    Purus semper eget duis at tellus at urna condimentum mattis.
                    Non blandit massa enim nec. Integer enim neque volutpat ac
                    tincidunt vitae semper quis. Accumsan tortor posuere ac ut
                    consequat semper viverra nam.
                  </p>
                  <p>
                    <a href="/">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card is-shady">
              <div className="card-image has-text-centered">
                <i className="fa fa-empire"></i>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Retail</h4>
                  <p>
                    Ut venenatis tellus in metus vulputate. Amet consectetur
                    adipiscing elit pellentesque. Sed arcu non odio euismod
                    lacinia at quis risus. Faucibus turpis in eu mi bibendum
                    neque egestas cmonsu songue. Phasellus vestibulum lorem sed
                    risus.
                  </p>
                  <p>
                    <a href="/">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card is-shady">
              <div className="card-image has-text-centered">
                <i className="fa fa-apple"></i>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Tavel & Leisure</h4>
                  <p>
                    Imperdiet dui accumsan sit amet nulla facilisi morbi. Fusce
                    ut placerat orci nulla pellentesque dignissim enim. Libero
                    id faucibus nisl tincidunt eget nullam. Commodo viverra
                    maecenas accumsan lacus vel facilisis.
                  </p>
                  <p>
                    <a href="/">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Home;
