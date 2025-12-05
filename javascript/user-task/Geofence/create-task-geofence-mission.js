import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

const geojson = JSON.parse(fs.readFileSync('javascript/user-task/Geofence/assets/test_geofencing_geojson_3.json').toString());

export async function createGeofenceMissionTask(token) {
  return await sendPost(`/v1/task/mission`, token, {
    name: 'Geofence with manual mission',
    desc: 'Geofence with manual mission',
    jobId: '1760004038819-7a69def6-5d20-4950-a9ca-c6e988c2eeea',
    type: "FLIGHT_REQUEST_MANUAL",
    context: {
      "geojson": geojson,
    },
    speed: 5,
    isSmartInspect: false,
    route: [
      {"lat": -33.73775879264395, "lng": 151.22888663519666, "altitude": 30.0, "speed": 3.0},
      {"lat": -33.73835298341626, "lng": 151.22934597440286, "altitude": 30.0, "speed": 3.0},
      {"lat": -33.73813016235864, "lng": 151.2304050064618, "altitude": 30.0, "speed": 3.0},
      {"lat": -33.737265398963515, "lng": 151.2303220702163, "altitude": 30.0, "speed": 3.0}
    ]
  });
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await createGeofenceMissionTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
