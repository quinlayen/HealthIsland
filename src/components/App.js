import React, { Component } from "react";
//import "../styles/App.css";
import "../sass/App.scss";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Welcome from "./Welcome";
import FitbitAuth from "./FitbitAuth";
import Home from "./Home";
import Footer from "./Footer";
import Callback from "./Callback";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      authData: null,
      user: null,
      authError: null
    };
  }

  async componentDidMount() {
    try {
      this.getUserData();
      //console.log("isAuthenticated in app: ", this.state.isAuthenticated);
      const session = await Auth.currentSession();
      this.setAuthState(true);
      console.log("session: ", session);
      const user = await Auth.currentAuthenticatedUser();
      this.getUserData(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user
        ? this.setState({ user }) && this.setState({ isAuthenticated: true })
        : this.setState({ user: null });
      console.log("user in app:", user);
    } catch (error) {
      console.log(error);
    }
  };

  setAuthState = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    console.log(
      "isAuthenticated in setAuthState: ",
      this.state.isAuthenticated
    );
  };

  render() {
    const authenticationProps = {
      user: this.state.user,
      isAuthenticated: this.state.isAuthenticated,
      authData: null,
      setAuthState: this.setAuthState,
      getUserData: this.getUserData
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
    return (
      !this.state.isAuthenticating && (
        <div className="app">
          <Router>
            <Navbar authentication={authenticationProps} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    authentication={authenticationProps}
                    authorization={authorizationProps}
                  />
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
            <Footer />
          </Router>
        </div>
      )
    );
  }
}
export default App;
