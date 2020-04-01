/* eslint-disable no-useless-constructor */
import call from "../apis/calls";
import React, { Component, Fragment } from "react";
//import axios from "axios";
import queryString from "query-string";
import qs from "qs";
import { Auth } from "aws-amplify";

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

  // encodeClientCredentials = (client_id, client_secret) => {
  //   return new Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  // };

  //get the users
  async getToken() {
    console.log("getToken Called");

    let { user } = this.props.authentication;

    let {
      client_id,
      redirect_uri,
      grant_type,
      client_secret
    } = this.props.authorization;

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${this.props.authorization.encodeClientCredentials(
        client_id,
        client_secret
      )}`
    };

    const urlParams = queryString.parse(this.props.location.search);

    const code = urlParams.code;

    const body = qs.stringify({
      client_id,
      grant_type,
      redirect_uri,
      code
    });

    //use code to get access-token
    try {
      const response = call.fitbitToken.post("/", body, { headers });
      // const response = await axios.post(
      //   "https://api.fitbit.com/oauth2/token",
      //   body,
      //   {
      //     headers
      //   }
      // );

      console.log("response information: ", response);
      console.log("user: ", user);
      console.log("access_token: ", response.data.access_token);
      console.log("refresh_token: ", response.data.refresh_token);
      let cognitouser = await Auth.currentAuthenticatedUser();
      console.log("user from cognito: ", cognitouser);
      await Auth.updateUserAttributes(cognitouser, {
        "custom:FitbitToken": response.data.access_token,
        "custom:FitbitRefreshToken": response.data.refresh_token
      });
    } catch (error) {
      console.log("post request error: ", error);
    }
  }

  render() {
    const {
      url,
      response_type,
      client_id,
      redirect_uri,
      scope
    } = this.props.authorization;
    return (
      <Fragment>
        <section className="fitbitauth section group">
          <div className="container">
            <div className="card">
              <div className="card-image has-text-centered">
                <div className="card content">
                  <h1 className="greeting">Welcome!</h1>
                  <h1>You have successfully logged in.</h1>
                  <br />
                  <div className="card content">
                    <div className="section group">
                      <h2>
                        In order to take full advantage of the Health Island
                        application, we would like to access your Fitbit
                        information.
                      </h2>
                      <h2>
                        Please click the button below to allow this application
                        to access your Fitbit account.
                      </h2>
                    </div>
                    <div className="section group">
                      <a
                        href={`${url}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`}
                        className="button is-link"
                      >
                        Access Fitbit Account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default FitbitAuth;
