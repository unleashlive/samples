import AWS from "aws-sdk";
import {signIn} from "../../auth/src/actions.js";
import * as uuid from "uuid";
import * as fs from "fs";
import {getCredentials} from "../../auth/src/cognito.js";
import {getFolderItem} from "./get.js";
import {FOLDER_ID, MEDIA_DRIVE_BUCKET, PASSWORD, USER_NAME,} from "../../config/variables.js";

const FILE_NAME = "logo.png";
const FILE_PATH = `media-drive/assets/${FILE_NAME}`;

function getFileKey(companyId, teamId, identityId, fileName) {
  // return [companyId, teamId, identityId, uuid.v4(), fileName].join('/')
  return [identityId, uuid.v4(), fileName].join("/");
}

signIn(USER_NAME, PASSWORD)
  .then(async (jwtToken) => {
    const companyId = jwtToken.companyId;
    const teamId = jwtToken.teamId;
    const identityId = jwtToken.identityId;

    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    const location = [folderItem.location, folderItem.id].join("/");

    // Upload file to it's destination
    fs.readFile(FILE_PATH, (err, data) => {
      if (err) throw err;
      const s3Client = new AWS.S3({
        credentials: getCredentials(),
        params: { Bucket: MEDIA_DRIVE_BUCKET },
      });

      const params = {
        Bucket: MEDIA_DRIVE_BUCKET, // pass your bucket name
        Key: getFileKey(companyId, teamId, identityId, FILE_NAME),
        Body: data,
        Metadata: {
          location: location,
          name: FILE_NAME,
        },
      };
      s3Client.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
      });
    });
  })
  .catch((e) => {
    console.error(e);
  });
