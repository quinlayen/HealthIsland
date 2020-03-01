import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Welcome from "./Welcome";
import FitbitAuth from "./FitbitAuth";
import Home from "./Home";
import Callback from "./Callback";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Particles from "react-particles-js";

const particleParams = {
  particles: {
    number: {
      value: 164,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#1e1111"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#b18585"
      },
      polygon: {
        nb_sides: 9
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      status: "initial"
    };
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log("session: ", session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authenticationProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };

    const authorizationProps = {
      url: "https://www.fitbit.com/oauth2/authorize",
      response_type: "code",
      grant_type: "authorization_code",
      client_id: "22BBPF",
      client_secret: "f84d2710e297fecb120bfc8217420ed3",
      redirect_uri: "http://localhost:3000/auth/callback",
      scope: "weight"
    };

    //console.log('isAuthenicated: ',this.state.isAuthenticated);

    //TODO pass parameters back to App so that all calls are done here instead of each individual component
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Particles
            className="particles"
            params={particleParams}
          
          />

          <Router>
            <Navbar authentication={authenticationProps} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home {...props} authentication={authenticationProps} />}
              />
              <Route
                exact
                path="/register"
                render={props => <Register {...props} authentication={authenticationProps} />}
              />

              <Route
                exact
                path="/login"
                render={props => <Login {...props} authentication={authenticationProps} />}
              />
              <Route
                exact
                path="/welcome"
                render={props => <Welcome {...props} authentication={authenticationProps} />}
              />
              <Route
                exact
                path="/auth/callback"
                render={props => <Callback {...props} authentication={authenticationProps} authorization={authorizationProps} />}
              />

              <Route
                exact
                path="/fitbit/auth"
                render={props => <FitbitAuth {...props} authentication={authenticationProps} authorization={authorizationProps} />}
              />
            </Switch>
          </Router>
        </div>
      )
    );
  }
}

export default App;
