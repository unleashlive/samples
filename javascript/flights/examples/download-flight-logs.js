import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {download} from "../../common/downloadFile.js";
import {FLIGHTS_CDN} from "../../config/variables.js";
import {listByCompany} from "./list-flight-logs.js";

function getFileNameFromPath(filePath) {
  const filePathParts = filePath.split('/');
  return filePathParts[filePathParts.length - 1];
}

try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const flightLogs = await listByCompany(jwtToken.idToken);
  const firstItem = flightLogs[0];
  const localFileName = getFileNameFromPath(firstItem.s3Path);
  await download(FLIGHTS_CDN, firstItem.s3Path, localFileName);
} catch (e) {
  console.error(e);
}
