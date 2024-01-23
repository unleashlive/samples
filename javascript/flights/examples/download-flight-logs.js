import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {listFlightLogs} from "./list.js";
import {download} from "../../common/downloadFile.js";
import {FLIGHTS_CDN} from "../../config/variables.js";

function getFileNameFromPath(filePath) {
  const filePathParts = filePath.split('/');
  return filePathParts[filePathParts.length - 1];
}

try {
  const signInResponse = await signIn(USER_NAME, PASSWORD);
  const flightLogs = await listFlightLogs(signInResponse);
  const firstItem = flightLogs[0];
  const localFileName = getFileNameFromPath(firstItem.s3Path);
  await download(FLIGHTS_CDN, firstItem.s3Path, localFileName);
} catch (e) {
  console.error(e);
}