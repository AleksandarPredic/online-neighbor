import axios from "axios";
import addOAuthInterceptor from "axios-oauth-1.0a";

// Create a client whose requests will be signed
const client = axios.create({
  baseURL: 'https://data.online-neighbor.acapredic.com/wp-json/wc/v3/products',
  withCredentials: true
});

// https://www.npmjs.com/package/axios-oauth-1.0a
// Add interceptor that signs requests
addOAuthInterceptor(client, {
  // OAuth consumer key and secret
  key: process.env.REACT_APP_CONSUMER_KEY,
  secret: process.env.REACT_APP_CONSUMER_SECRET,

  // HMAC-SHA1 and HMAC-SHA256 are supported
  algorithm: "HMAC-SHA1",
});

export default client;
