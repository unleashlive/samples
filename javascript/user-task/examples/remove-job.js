import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendDelete, sendGet} from "../../common/request.js";

export async function removeJob(signInResponse) {
  const jobId = '123456';
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: `/v1/job/${jobId}`,
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
  const uploadResponse = await removeJob(signInResponse);
  console.log(uploadResponse);
} catch (e) {
  console.error(e);
}