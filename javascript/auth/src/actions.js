import {
  decodeJWTToken,
  getAuthDetails,
  getCognitoUser,
  initClient,
} from "./cognito.js";

export function signIn(email, password) {
  return new Promise((resolve) => {
    getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
      onSuccess: (result) => {
        const jwtTokenPayload = result.getIdToken().decodePayload();
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          identityId: jwtTokenPayload["custom:identityId"],
          companyId: jwtTokenPayload["custom:companyId"],
          teamId: jwtTokenPayload["custom:teamId"],
        };
        initClient(token.idToken);
        return resolve({ statusCode: 200, response: decodeJWTToken(token) });
      },

      onFailure: (err) => {
        return resolve({
          statusCode: 400,
          response: err.message || JSON.stringify(err),
        });
      },
    });
  });
}
