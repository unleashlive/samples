import { signIn } from "../../auth/src/actions.js";
import {
  FOLDER_ID,
  MEDIA_DRIVE_CDN,
  PASSWORD,
  USER_NAME,
} from "../../config/variables.js";
import { listItemsImages } from "./list.js";
import { getFolderItem } from "./get.js";

import * as https from "https";
import * as fs from "fs";
import {download} from "../../common/downloadFile.js";

signIn(USER_NAME, PASSWORD)
  .then(async (signInResponse) => {
    const folderItem = (await getFolderItem(signInResponse, FOLDER_ID)).get;
    const location = [folderItem.location, folderItem.id].join("/");

    const listResponse = (await listItemsImages(signInResponse, location)).list
      .items;

    const imageItem = listResponse.find((item) => item.type === "I");
    return download(MEDIA_DRIVE_CDN, imageItem.s3Path, imageItem.name);
  })
  .catch((e) => {
    console.error(e);
  });
