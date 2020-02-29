import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import qs from "qs";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  encodeClientCredentials = (client_id, client_secret) => {
    return new Buffer(client_id + ":" + client_secret).toString("base64");
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
    const urlParams = await queryString.parse(this.props.location.search);

    const code = await urlParams.code;

    const body = qs.stringify({
      client_id,
      grant_type,
      redirect_uri,
      code
    });

    console.log("body: ", body);
    const response = await axios.post("https://api.fitbit.com/oauth2/token", {
      body,
      headers: headers
    });

    console.log("response from axios: ", response);
    //this.setState({ token: response.data.results });
  }

  render() {
    this.getToken();
    return <div>Callback</div>;
  }
}
export default Callback;
