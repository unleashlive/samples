import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {API_URL} from "../../config/env.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

const BODY =  JSON.parse(fs.readFileSync('mission/assets/test_mission-corridor.json').toString());


export async function createMissionTask(signInResponse) {
  const requestOptions = {
    hostname: API_URL,
    port: 443,
    path: '/v1/task/mission-corridor',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-amz-cognito-security-token': signInResponse.response.token.idToken
    },
  };
  return await sendPost(requestOptions, {
    jobId: "1234",
    ...BODY
  });
}


try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const response = await createMissionTask(signInResponse);
  console.log(response);
} catch (e) {
  console.error(e);
}