import React, { Component } from "react";
//import "../styles/App.css";
import call from "../apis/calls";
import "../sass/App.scss";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import FitbitAuth from "./FitbitAuth";
import Home from "./Home";
import Footer from "./Footer";
import Callback from "./Callback";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import sha256 from 'crypto-js/sha256';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      authData: null,
      user: null,
      authError: null,
      isRefreshing: false,
      client_id: "22BFR5",
      client_secret: "4b8a3457b12d1c5c3d885601e1e55a5b",
      button: "login"
    };
  }

  async componentDidMount() {
    try {
      this.getUserData();
      const session = await Auth.currentSession();
      this.setAuthState(true);
      console.log("session: ", session);
      const user = await Auth.currentAuthenticatedUser();
      this.getUserData(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
    const codeVerifier = await this.createCodeVerifier();
    const codeChallenge = await this.createCodeChallenge(codeVerifier);
    this.setInterceptors();
  }

  getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user
        ? this.setState({ user }) && this.setState({ isAuthenticated: true })
        : this.setState({ user: null });

      console.log("user in app:", user);
      // const userAttributes = Object.keys(user.attributes).map(key => {
      //   return [user.attributes[key]];
      // });
      //console.log("refreshToken: ", userAttributes[3][0]);
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

  // setButton = button => {
  //   console.log('button passed from Navbar: ', button)
  //   this.setState({ button });
  //   console.log('button state in setButton after setState: ', this.state.button)
  // };

  createCodeVerifier = () => {
    const validChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let array = new Uint8Array(40);
    window.crypto.getRandomValues(array);
    array = array.map(x => validChars.charCodeAt(x % validChars.length));
    const codeVerifier = String.fromCharCode.apply(null, array);
    console.log("codeVerifier: ", codeVerifier);
    return codeVerifier
  };

  codeChallenge = (codeVerifier) => {
    const codeChallenge = new Buffer.from(`${codeVerifier}`).toString("base64");
    console.log("codeChallenge: ", codeChallenge);
    return codeChallenge
  }
 


  encodeClientCredentials = (client_id, client_secret) => {
    return new Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  };


  refreshFitbitToken = async () => {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${this.encodeClientCredentials(
        this.state.client_id,
        this.state.client_secret
      )}`
    };
    const userAttributes = Object.keys(this.state.user.attributes).map(key => {
      return [this.state.user.attributes[key]];
    });
    const refreshToken = userAttributes[3][0];
    const body = {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    };
    try {
      await axios.post("/", body, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  setInterceptors = async () => {
    try {
      await axios.interceptos.response.use(
        response => {
          console.log("response in setInterceptor", response);
          return response;
        },
        error => {
          const {
            response: { status }
          } = error;
          console.log("response in setInterceptor Error: ", error);
          if (status === 401) {
            if (!this.state.isRefreshing) {
              this.setState({ isRefreshing: true });
              this.refreshFitbitToken();
              if (status === 200 || status === 204) {
                this.setState({ isRefreshing: true });
              }
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const authenticationProps = {
      user: this.state.user,
      isAuthenticated: this.state.isAuthenticated,
      authData: null,
      setAuthState: this.setAuthState,
      getUserData: this.getUserData
      //button: this.setButton
    };

    const authorizationProps = {
      url: "https://www.fitbit.com/oauth2/authorize",
      response_type: "code",
      grant_type: "authorization_code",
      client_id: "22BFR5",
      client_secret: "4b8a3457b12d1c5c3d885601e1e55a5b",
      //redirect_uri: "http://localhost:3000/auth/callback",
      redirect_uri: "https://enigmatic-inlet-88857.herokuapp.com/auth/callback",
      scope: "activity heartrate profile sleep weight",
      encodeClientCredentials: this.encodeClientCredentials
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
