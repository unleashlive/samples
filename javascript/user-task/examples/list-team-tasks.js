import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendGet} from "../../common/request.js";

export async function listTeamTasks(token) {
  const limit = 1;
  const nextToken = 'abcd';
  // path: `/v1/task?limit=${limit}&nextToken=${nextToken}`,
  return await sendGet(`/v1/task/team`, token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await listTeamTasks(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
