import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

const BODY =  JSON.parse(fs.readFileSync('mission/assets/test_mission-corridor.json').toString());


export async function createMissionTask(token) {
  return await sendPost(`/v1/task/mission-corridor`, token,{
    jobId: "1234",
    ...BODY
  });
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await createMissionTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
