import https from "https";
import fs from "fs";

export function download(cdn, filePath, name) {
  const file = fs.createWriteStream(name);
  return https.get(
    [cdn, filePath].join("/"),
    function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log("Download Completed");
      });
    }
  );

}