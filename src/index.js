import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/normalize.css"
import "../src/styles/index.css";
import "../src/styles/grid.css"
import config from "./config";
import Amplify from "aws-amplify";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.css';

Amplify.configure({
  Auth: {
    mandatorysignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
