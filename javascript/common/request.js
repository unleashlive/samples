import * as https from "https";

export function sendGet(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

export function sendPatch(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      // res.on('data', (chunk) => {
      //   responseBody += chunk;
      // });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

export function sendDelete(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      // res.on('data', (chunk) => {
      //   responseBody += chunk;
      // });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

export function sendPost(options, body) {

  // console.info('graphql post request', options);
  return new Promise((resolve, reject) => {
    const httpRequest = https.request(options, (result) => {
      const body = [];
      result.on('data', (chunk) => {
        body.push(chunk)
      });
      result.on('end', () => {
        try {
          const response = JSON.parse(Buffer.concat(body).toString());
          console.info('Response:', response);
          if (response.errors) {
            console.error("Service error", response.errors);
            reject(response.errors[0].message)
          } else {
            resolve(response.data);
          }
        } catch (e) {
          console.warn('Could not read response', e);
          reject(e)
        }
      });
      result.on('error', (error) => {
        console.error("Service couldn't sent query request", error);
        reject(error)
      });
    });

    httpRequest.write(JSON.stringify(body));
    httpRequest.end();
  });

}