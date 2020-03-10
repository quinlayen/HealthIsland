import React, { Component } from "react";
import "../styles/App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Welcome from "./Welcome";
import FitbitAuth from "./FitbitAuth";
import Home from "./Home";
import Features from "./Features";
import Callback from "./Callback";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      client_id: "22BFR5",
      client_secret: "4b8a3457b12d1c5c3d885601e1e55a5b",
      redirect_uri: "http://localhost:3000/auth/callback",
      scope: "activity heartrate profile sleep weight"
    };

    //console.log('isAuthenicated: ',this.state.isAuthenticated);

    //TODO pass parameters back to App so that all calls are done here instead of each individual component
    return (
      !this.state.isAuthenticating && (
        <div className="app">
          {/* <Particles className="particles" params={particleParams} /> */}

          <Router>
            <Navbar authentication={authenticationProps} />
           
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home {...props} authentication={authenticationProps} />
                )}
              />
              <Route
                exact
                path="/register"
                render={props => (
                  <Register {...props} authentication={authenticationProps} />
                )}
              />

              <Route
                exact
                path="/login"
                render={props => (
                  <Login {...props} authentication={authenticationProps} />
                )}
              />
              <Route
                exact
                path="/welcome"
                render={props => (
                  <Welcome {...props} authentication={authenticationProps} />
                )}
              />
              <Route
                exact
                path="/auth/callback"
                render={props => (
                  <Callback
                    {...props}
                    authentication={authenticationProps}
                    authorization={authorizationProps}
                  />
                )}
              />

              <Route
                exact
                path="/fitbit/auth"
                render={props => (
                  <FitbitAuth
                    {...props}
                    authentication={authenticationProps}
                    authorization={authorizationProps}
                  />
                )}
              />
            </Switch>
          </Router>
          <Features />
        </div>
      )
    );
  }
}

export default App;
