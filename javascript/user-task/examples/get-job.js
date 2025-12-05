import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendGet} from "../../common/request.js";

export async function getJob(token) {
  const jobId = '1234'
  return await sendGet(`/v1/job/${jobId}`, token);
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const newJob = await getJob(jwtToken.idToken);
  console.log(newJob);
} catch (e) {
  console.error(e);
}
