import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendGet} from "../../common/request.js";

export async function getTask(token) {
  const taskId = '12345';
  return await sendGet(`/v1/task/${taskId}`, token);
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const newTask = await getTask(jwtToken.idToken);
  console.log(newTask);
} catch (e) {
  console.error(e);
}
