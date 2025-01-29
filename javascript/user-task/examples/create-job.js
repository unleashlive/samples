import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";

export async function createJob(token) {
  const body = {
    title: 'Job1',
    description: 'Detailed job description'
    // It's possible to attach users who are withing the same team as author of the job
    // Author of the job is assigned to the job automatically
    // userIds: ['user-id-1', 'user-id-2', ....]
  };
  return await sendPost('/v1/job', token, body);
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const newJob = await createJob(jwtToken.idToken);
  console.log(newJob);
} catch (e) {
  console.error(e);
}
