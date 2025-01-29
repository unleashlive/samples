import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendDelete} from "../../common/request.js";

export async function removeTask(signInResponse) {
  const taskId = '123456';
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: `/v1/task/${taskId}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-amz-cognito-security-token': signInResponse.response.token.idToken
    },
  };
  return await sendDelete(requestOptions);
}


try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const uploadResponse = await removeTask(signInResponse);
  console.log(uploadResponse);
} catch (e) {
  console.error(e);
}