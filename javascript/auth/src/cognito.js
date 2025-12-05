import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";
import AWS from "aws-sdk";
import {IDENTITY_POOL_ID, POOL_DATA, REGION,} from "../../config/env.js";

export function initClient(idToken) {
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
    Logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${POOL_DATA.UserPoolId}`]: idToken,
    },
  });
}

export function getUserPool() {
  return new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);
}

export function getCognitoUser(email) {
  const userData = {
    Username: email,
    Pool: getUserPool(),
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
}

export function decodeJWTToken(token) {
  const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken);
  return { token, email, exp, uid: sub, auth_time, token_use };
}

export function getAuthDetails(email, password) {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

export function getCredentials() {
  return new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS.config.credentials.params.IdentityPoolId,
    Logins: AWS.config.credentials.params.Logins,
  });
}
