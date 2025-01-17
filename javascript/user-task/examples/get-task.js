import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendGet} from "../../common/request.js";

export async function getTask(signInResponse) {
  const taskId = '12345'
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: `/v1/task/${taskId}`,
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
  const newTask = await getTask(signInResponse);
  console.log(newTask);
} catch (e) {
  console.error(e);
}