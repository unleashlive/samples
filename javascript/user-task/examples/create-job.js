import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendPost} from "../../common/request.js";

export async function createJob(signInResponse) {
  const body = {
    title: 'Job1',
    description: 'Detailed job description'
    // It's possible to attach users who are withing the same team as author of the job
    // Author of the job is assigned to the job automatically
    // userIds: ['user-id-1', 'user-id-2', ....]
  };

  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: '/v1/job',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-amz-cognito-security-token': signInResponse.response.token.idToken
    },
  };
  return await sendPost(requestOptions, body);
}

try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const newJob = await createJob(signInResponse);
  console.log(newJob);
} catch (e) {
  console.error(e);
}