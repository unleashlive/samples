import {signIn} from "../../auth/src/actions.js";
import {FOLDER_ID, MEDIA_DRIVE_CDN, PASSWORD, USER_NAME,} from "../../config/variables.js";
import {listItemsImages} from "./list.js";
import {getFolderItem} from "./get.js";
import {download} from "../../common/downloadFile.js";

signIn(USER_NAME, PASSWORD)
  .then(async (jwtToken) => {
    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    const location = [folderItem.location, folderItem.id].join("/");

    const listResponse = (await listItemsImages(jwtToken.idToken, location)).list
      .items;

    const imageItem = listResponse.find((item) => item.type === "I");
    return download(MEDIA_DRIVE_CDN, imageItem.s3Path, imageItem.name);
  })
  .catch((e) => {
    console.error(e);
  });
