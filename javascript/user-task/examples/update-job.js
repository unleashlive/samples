import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPatch} from "../../common/request.js";

export async function updateJob(token) {
  const jobId = '12345';
  return await sendPatch(`/v1/job/${jobId}`, token, {'title': 'Api update test'});
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await updateJob(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
