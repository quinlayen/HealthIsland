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

  //
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
      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        body,
        {
          headers
        }
      );
      console.log("user: ", user);
      console.log("response information: ", response);
      console.log("access_token: ", response.data.access_token);
      console.log("refresh_token: ", response.data.refresh_token);

      let cognitouser = await Auth.currentAuthenticatedUser();
      console.log("user from cognito: ", cognitouser);
      await Auth.updateUserAttributes(user, {
        "custom:FitbitToken": response.data.access_token,
        "custom:FitbitRefreshToken": response.data.refresh_token
      });
    } catch (error) {
      console.log("post request error: ", error);
    }

    this.props.history.push("/");
  }

  render() {
    this.getToken();
    return //(
    //   <Fragment>
    //     <section className="hero is-link">
    //       <div className="container">
    //         <div className="has-text-centered">
    //           <h2>Welcome!</h2>
    //           <h2>You have successfully registered a new account.</h2>

    //           <h2>You will be Redirected to homepage in a few seconds </h2>
    //         </div>
    //       </div>
    //     </section>
    //   </Fragment>
    // );
  }
}
export default Callback;
