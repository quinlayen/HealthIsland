import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import qs from "qs";
import { Auth } from "aws-amplify";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token_data: {}
    };
  }

  encodeClientCredentials = (client_id, client_secret) => {
    return new Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  };

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
      Authorization: `Basic ${this.encodeClientCredentials(
        client_id,
        client_secret
      )}`
    };
    //console.log("headers: ", headers);
    const urlParams = queryString.parse(this.props.location.search);

    const code = urlParams.code;
    //console.log("authorization code: ", code);

    const body = qs.stringify({
      client_id,
      grant_type,
      redirect_uri,
      code
    });

    //console.log("body: ", body);

    //use code to get access-token
    try {
      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        body,
        {
          headers
        }
      );
      console.log("user: ", user);
      console.log("access_token: ", response.data.access_token);
      console.log("refresh_token: ", response.data.refresh_token);
      let cognitouser = await Auth.currentAuthenticatedUser();
      console.log("user from cognito: ", cognitouser);
      await Auth.updateUserAttributes(user, {
        "custom:FitbitToken": response.data.access_token,
        "custom:FitbitRefreshToken": response.data.refresh_token
      });
    } catch (error) {
      //this.setState({ token_data: response.data });
      console.log("post request error: ", error);
    }
    // try {
    //   await Auth.updateUserAttributes(user.username, {
    //     "custom:FitbitToken": this.response.data.access_token,
    //     "custom:FitbitRefreshToken": this.response.data.refresh_token
    //   });
    // } catch (error) {
    //   console.log("updateUserError: ", error);
    // }

    this.props.history.push("/home");
  }

  render() {
    this.getToken();
    return <div>Callback</div>;
  }
}
export default Callback;
