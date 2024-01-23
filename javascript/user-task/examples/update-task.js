import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendPatch} from "../../common/request.js";

export async function updateTask(signInResponse) {
  const taskId = '12345';
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: `/v1/task/${taskId}`,
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'x-amz-cognito-security-token': signInResponse.response.token.idToken
    },
  };
  return await sendPatch(requestOptions, {'title': 'Task title'});
}


try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const uploadResponse = await updateTask(signInResponse);
  console.log(uploadResponse);
} catch (e) {
  console.error(e);
}