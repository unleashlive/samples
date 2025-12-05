import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPatch} from "../../common/request.js";

export async function assignUser(token) {
  const jobId = '1234';
  const body = {
    assignedId: '1234'
  };
  return await sendPatch(`/v1/job/${jobId}/task`, token, body);
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const newJob = await assignUser(jwtToken.idToken);
  console.log(newJob);
} catch (e) {
  console.error(e);
}
