## Missions:
All files can be found in `javascript/mission/examples` folder.
If you are using Webstorm then "run configuration" are available by default and are stored in `.idea/runConfigurations`.
Missions samples aim to give third-party developers a clue about possible ways of implementing their API client.

### Introduction
A sample Node.js API for basic functionality in Missions. The basic functions include signing in and uploading missions from your local machine.

### Steps

#### Download and build locally
1) Clone the repository, install Node packages locally
```
git clone https://github.com/unleashlive/samples.git
cd 'javascript'
npm install
```
2) Gather all the information for setting up the config environment. The information includes:
```bash
cd 'javascript/config'
```
Update `user.js` file with your username and password 
```javascript
export let USER_NAME = "test@user-name.com";
export let PASSWORD = "test-pass";
```
- "test@user-name.com": The same login email that is used to login into [cloud.unleashlive.com](https://cloud.unleashlive.com/auth/sign-in)

- "test-pass": Password for the above login email.

## upload-mission.js
`upload-mission.js` allows user to upload the flight missions for your mission planner.
```bash
cd 'javascript/mission/examples/'
```
Specify the path of the mission file that you want to upload in the following line:
```javascript
const body =  JSON.parse(fs.readFileSync('<path of mission files>').toString());
```
A test file to upload in mission is located in `javascript/mission/assets`.

The formats of test_mission.json looks like this:

```json
{
  "desc": "Sample-mission",
  "name": "JAN 1-1",
  "speed": 2,
  "route": [
    {
      "pole": "Pole1",
      "wo": "00800521567",
      "lat": -33.72577124,
      "lng": 151.18167339,
      "altitude": 163.144,
      "altEGM": 187.144,
      "si": "dist-3"
    },
    {
      "pole": "WP",
      "wo": "00800521567",
      "lat": -33.72577124,
      "lng": 151.18167339,
      "altitude": 171.144,
      "altEGM": 195.144,
      "si": "waypoint"
    },
    {
      "pole": "WP",
      "wo": "00800521567",
      "lat": -33.72582000,
      "lng": 151.18118322,
      "altitude": 168.144,
      "altEGM": 192.144,
      "si": "waypoint"
    },
    {
      "pole": "Pole2",
      "wo": "00800521567",
      "lat": -33.72582000,
      "lng": 151.18118322,
      "altitude": 186.938,
      "altEGM": 188.938,
      "si": "dist-1"
    },
    {
      "pole": "Pole3",
      "wo": "00800521568",
      "lat": -33.72554444,
      "lng": 151.18123573,
      "altitude": 163.383,
      "altEGM": 187.383,
      "si": "dist-3"
    }
  ]
}
```

For further support please email us at [support@unleashlive.com](mailto:support@unleashlive.com)