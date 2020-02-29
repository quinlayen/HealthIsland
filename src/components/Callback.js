import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import qs from "qs";

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
  async getToken() {
    console.log("getToken Called");

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
    console.log("headers: ", headers);
    const urlParams = queryString.parse(this.props.location.search);

    const code = urlParams.code;
    console.log("authorization code: ", code)

    const body = qs.stringify({
      client_id,
      grant_type,
      redirect_uri,
      code
    });

    console.log("body: ", body);

    try {
      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        body,
        {
          headers
        }
      );

      console.log("response from axios: ", response.data);
      //this.setState({ token_data: response.data });
    } catch (error) {
      console.log("request error: ", error.request);
    }
  }

  render() {
    this.getToken();
    return <div>Callback</div>;
  }
}
export default Callback;
