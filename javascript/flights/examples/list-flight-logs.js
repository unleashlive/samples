import {signIn} from "../../auth/src/actions.js";
import {sendGet} from "../../common/request.js";
import {API_URL, PASSWORD, USER_NAME} from "../../config/variables.js";


export async function listFlightLogs(signInResponse) {
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: '/v1/flights',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-amz-cognito-security-token': signInResponse.response.token.idToken
    },
  };
  return await sendGet(requestOptions);
}


try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const flightLogs = await listFlightLogs(signInResponse);
  console.log(flightLogs);
} catch (e) {
  console.error(e);
}
