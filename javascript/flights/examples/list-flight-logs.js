import {signIn} from "../../auth/src/actions.js";
import {sendGet} from "../../common/request.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";

export async function listByTeam(token) {
  const dateFrom = 1737331200000
  const dateTo = 1737331200000
  return await sendGet(`/v1/flights?dateFrom=${dateFrom}`, token);
}

export async function listByCompany(token) {
  const dateFrom = 1737331200000
  const dateTo = 1737331200000
  return await sendGet(`/v1/flights/company?dateFrom=${dateFrom}`, token);
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const flightLogs = await listByCompany(jwtToken.idToken);
  console.log(flightLogs);
} catch (e) {
  console.error(e);
}
