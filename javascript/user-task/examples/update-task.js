import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPatch} from "../../common/request.js";

export async function updateTask(token) {
  const taskId = '1234';
  return await sendPatch(`/v1/task/${taskId}`, token, {'title': 'Task title updated'});
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await updateTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
