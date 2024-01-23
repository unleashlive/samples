## Flight logs:
All files can be found in the `javascript/flights/examples` folder.
If you are using Webstorm then "run configuration" are available by default and are stored in `.idea/runConfigurations`.
Flight logs samples aim to give third-party developers a clue about possible ways of implementing their API client.

### Introduction
A sample Node.js API for basic functionality in Flight Logs. The basic functions include signing in, listing the flight logs, and downloading them.

### Steps

#### Download and build locally
1) Clone the repository, install Node packages locally
```
git clone https://github.com/unleashlive/samples.git
cd 'javascript'
npm install
```
2) Gather all the information for setting up the config environment. The information includes:
```
cd 'javascript/config'
```
Update `user.default.js` file with your username and password. 
```javascript
export let USER_NAME = "test@user-name.com";
export let PASSWORD = "test-pass";
```
- "test@user-name.com": The same login email that is used to login into [cloud.unleashlive.com](https://cloud.unleashlive.com/auth/sign-in)

- "test-pass": Password for the above login email.

### list-flight-logs.js
`list-flight-logs.js` allows user to list all the flight logs in that particular account.
```bash
cd 'javascript/flights/examples/'
```
### download-flight-logs.js
`download-flight-logs.js` allows to download the flight logs in your local.

For further support please email us at [support@unleashlive.com](mailto:support@unleashlive.com)