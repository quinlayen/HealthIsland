import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Welcome from "./Welcome";
import Home from "./Home";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
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
      console.log('session: ',session)
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user)
    } catch (error) {
      console.log(error);
    }
    this.setState({isAuthenticating: false});
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    console.log(this.state.isAuthenticated);

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/register"
                render={props => <Register {...props} auth={authProps} />}
              />

              <Route
                exact
                path="/login"
                render={props => <Login {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/welcome"
                render={props => <Welcome {...props} auth={authProps} />}
              />
              <Welcome />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
