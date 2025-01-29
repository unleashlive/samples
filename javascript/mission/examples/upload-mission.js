import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

const BODY =  JSON.parse(fs.readFileSync('mission/assets/test_mission.json').toString());


export async function uploadMission(token) {
  return await sendPost('/v1/mission', token);
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const uploadResponse = await uploadMission(jwtToken.idToken);
  console.log(uploadResponse);
} catch (e) {
  console.error(e);
}
