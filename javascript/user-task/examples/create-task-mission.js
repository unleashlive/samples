import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

const BODY =  JSON.parse(fs.readFileSync('mission/assets/test_mission.json').toString());


export async function createCorridorMissionTask(token) {
  return await sendPost('/v1/task/mission',  token,{
    jobId: "1234",
    context: {
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [0, 0],
                  [0, 1],
                  [1, 1],
                  [1, 0],
                  [0, 0],
                ],
              ],
            },
            properties: {},
          },
        ],
      }
    },
    type: "FLIGHT_REQUEST",
    ...BODY
  });
}


try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await createCorridorMissionTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
