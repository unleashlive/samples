import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendPost} from "../../common/request.js";

export async function createTask(signInResponse) {
  const body = {
    title: 'Task title',
    description: 'Task description',
    // Task should be assigned to the job. Without that assigning user is forbidden
    jobId: '1234',
    type: 'FLIGHT_REQUEST',
    // It is possible to bind a mission to the task. That operation can be done
    // on creation or on update as well.
    // context: {
    //   mission?: Mission
    // }
    // mission?: Mission;

    // Optional field, task can be assigned to the user.
    // Note if the task is not assigned to the job it then assigning it to the user will be rejected
    // userId?: string;
    lat: -33.86355993143128,
    lng: 151.2021623286489
  }

  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: '/v1/task',
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
  const response = await createTask(signInResponse);
  console.log(response);
} catch (e) {
  console.error(e);
}