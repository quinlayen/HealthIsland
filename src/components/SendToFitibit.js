import React, { Component } from "react";
import { OauthSender } from "react-oauth-flow";
import {createOauthFlow} from 'react-oauth-flow';

class SendToFitbit extends Component {
  render() {
    //create random string for state
    const validChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let array = new Uint8Array(40);
    window.crypto.getRandomValues(array);
    array = array.map(x => validChars.charCodeAt(x % validChars.length));
    const state = String.fromCharCode.apply(null, array);
    console.log("state: ", state);

    return (
      <OauthSender
        authorizeUrl="https://www.fitbit.com/oauth2/authorize"
        clientId="22BBPF"
        redirectUri="http://localhost:8888/fitbit/callback"
        state={state}
        render={({ url }) => <a href={url}>Connect to Fitbit</a>}
      />
    );
  }
}

export default SendToFitbit;
