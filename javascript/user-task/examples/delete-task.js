import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendDelete} from "../../common/request.js";

export async function deleteTask(token) {
  const taskId = '123456';
  return await sendDelete(`/v1/task/${taskId}`, token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await deleteTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
