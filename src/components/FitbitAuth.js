/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import qs from "qs";

class FitbitAuth extends Component {
  constructor(props) {
    super(props);
  }

  createOauthState = () => {
    const validChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let array = new Uint8Array(40);
    window.crypto.getRandomValues(array);
    array = array.map(x => validChars.charCodeAt(x % validChars.length));
    const state = String.fromCharCode.apply(null, array);
    console.log("state: ", state);
    return state;
  };

  render() {
    const {
      url,
      response_type,
      client_id,
      redirect_uri,
      scope
    } = this.props.authorization;
    return (
      <div className="container">
        <div className="fitbitauth">
          <a
            href={`${url}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`}
            className="btn btn-secondary"
          >
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default FitbitAuth;
