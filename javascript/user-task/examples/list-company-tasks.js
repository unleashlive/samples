import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendGet} from "../../common/request.js";

export async function listCompanyTasks(token) {
  // const limit = 1;
  // const nextToken = 'returnedfrompreviouscall';
  // const nextPagePath = `/v1/task?limit=${limit}&nextToken=${nextToken}`;
  return await sendGet(`/v1/task/company`, token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await listCompanyTasks(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
