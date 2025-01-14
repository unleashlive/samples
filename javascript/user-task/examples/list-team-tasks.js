import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendGet} from "../../common/request.js";

export async function listTeamTasks(signInResponse) {
  const limit = 1;
  const nextToken = 'abcd';

  const requestOptions = {
    hostname: API_URL,
    port: 443,
    // path: `/v1/task?limit=${limit}&nextToken=${nextToken}`,
    path: `/v1/task/team`,
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
  const response = await listTeamTasks(signInResponse);
  console.log(response);
} catch (e) {
  console.error(e);
}