import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendGet} from "../../common/request.js";

export async function listJobs(token) {
  return await sendGet('/v1/job', token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await listJobs(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
