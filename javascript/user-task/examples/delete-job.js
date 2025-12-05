import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendDelete} from "../../common/request.js";

export async function deleteJob(token) {
  const jobId = '1234';
  return await sendDelete(`/v1/job/${jobId}`, token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const deleteResponse = await deleteJob(jwtToken.idToken);
  console.log(deleteResponse);
} catch (e) {
  console.error(e);
}
