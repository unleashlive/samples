# User Task
All files can be found in `user-task/examples` folder.
If you are using Webstorm then "run configuration" are available by default and are stored in `.idea/runConfigurations`.
User task samples aim to give third-party developers a clue about possible ways of:

    - Creating a job
    - Updating a job
    - Listing assigned jobs
    - Creating a task
    - Creating a task with new mission
    - Updating a task
    - Listing assigned tasks
    - Removing a task

## Steps

### Download and build locally
1) Clone the repository and install Node packages locally.
```bash
git clone https://github.com/unleashlive/samples.git
cd 'javascript'
npm install
```

### Update config
2) Gather and update all the information for setting up config environment.
   The information includes:
   
```bash
cd 'javascript/config'
```

Update the `user.js` file with your Unleash cloud username and password 
```javascript
export let USER_NAME = "test@user-name.com";
export let PASSWORD = "test-pass";
```
- "test@user-name.com": The same login email that is used to login into [cloud.unleashlive.com](https://cloud.unleashlive.com/auth/sign-in)

- "test-pass": Password for the above login email.

## create-job.js
`create-job.js` creates job which contains single or multiple tasks within it.

### Endpoint
'POST /v1/job'

### Request Parameters
- **title** (string, required): The title or name of the job.
- **description** (string, required): Additional details or description of the job.
- **userIds** (string): You can also tag users who are within the same team as author of the job.

```bash
cd 'javascript/user-task/examples/'
node create-job.js
```
A successful request will return the response from the 'sendPost' function similar to the following:
```json
Response {
id: '1706140637115-XXXXXXXXXXXXXXXXXXXXXXXXX',
createdAt: 1706140637115,
updatedAt: 1706140637115,
title: 'Sample Job',
description: 'This is a Detailed job description',
ownerId: 'ap-southeast-2:XXXXXXX-XXXX-XXX-XXXX-XXXXX',
teamId: '771bcXXXX-XXXXXXXXXXXXXXXX',
companyId: 'XXXXXXXXXXXXXXX',
pk: 'XXXXXXXXXXXX',
sk: 'J#XXXXXXXXXXXX'
}
```

## create-task.js
`create-task.js` creates a task within a job by passing jobId in request payload.

### Endpoint
'POST /v1/task'

### Request Parameters
- **title** (string, required): The title or name of the task.
- **description** (string, required): Additional details or description of the task.
- **type** (string, required): 'FLIGHT_REQUEST'
- **jobId** (string, required): Task should be assigned to the job, without that assigning user is forbidden.
- **assignedId** (string): The user id to whom this task is assigned for.

```bash
cd 'javascript/user-task/examples/'
node create-task.js
```
A successful request will return the response from the 'sendPost' function similar to the following:
```json
Response: {
  id: '1706142970284-XXXXXXXXXXXXXXXXXXXXXXXXX',
  createdAt: 1706142970284,
  updatedAt: 1706142970284,
  title: 'Sample Task',
  description: 'Detailed Task Description',
  type: 'FLIGHT_REQUEST',
  jobId: '1706140637115-XXXXXXXXXXXXXXXXXXXXXXXXX',
  assignedId: 'ap-southeast-2:XXXXXXX-XXXX-XXX-XXXX-XXXXX',
  ownerId: 'ap-southeast-2:XXXXXXX-XXXX-XXX-XXXX-XXXXX',
  teamId: '771bcXXXX-XXXXXXXXXXXXXXXX',
  companyId: 'XXXXXXXXXXXXXXX',
  pk: 'XXXXXXXXXXXXXXX',
  sk: 'T#XXXXXXXXXXXXXXX'
}

```
## create-task-mission.js
`create-task-mission.js` creates a task by allowing user to upload the flight missions for your mission planner.

### Endpoint
'POST /v1/task/mission'

### Request Parameters
- **title** (string, required): The title or name of the task.
- **description** (string, required): Additional details or description of the task.
- **type** (string, required): 'FLIGHT_REQUEST'
- **jobId** (string, required): Task should be assigned to the job, without that assigning user is forbidden.
- **assignedId** (string): The user id to whom this task is assigned for.

### Body Parameter
Specify the path of the mission file that you want to upload in the body part of your request:
```javascript
const BODY =  JSON.parse(fs.readFileSync('<path of a mission file>').toString());
```
The test mission files are located in `javascript/mission/assets`. For more details about mission files format [go to this link.](../mission/README.md)
```bash
cd 'javascript/user-task/examples/'
node create-task-mission.js
```
A successful request will return the response from the 'sendPost' function similar to the following:
```json
Response: {
id: '1706142970284-XXXXXXXXXXXXXXXXXXXXXXXXX',
createdAt: 1706142970284,
updatedAt: 1706142970284,
title: 'Sample Task',
description: 'Detailed Task Description',
type: 'FLIGHT_REQUEST',
jobId: '1706140637115-XXXXXXXXXXXXXXXXXXXXXXXXX',
assignedId: 'ap-southeast-2:XXXXXXX-XXXX-XXX-XXXX-XXXXX',
ownerId: 'ap-southeast-2:XXXXXXX-XXXX-XXX-XXXX-XXXXX',
teamId: '771bcXXXX-XXXXXXXXXXXXXXXX',
companyId: 'XXXXXXXXXXXXXXX',
mission: {
  id: 'd6a54e36-XXXXXXX',
  createdAt: 1706143857388,
  updatedAt: 1706143857388,
  isImported: false,
  desc: 'Sample-mission',
  name: 'test mission 2',
  speed: 2,
  route: [ [Object], [Object], [Object], [Object], [Object] ],
  teamId: '7771bcXXXX-XXXXXXXXXXXXXXXX',
  companyId: 'XXXXXXXXXXXXXXX',
  createdAtId: '17061438573XX#XXXXXXXXX'
},        
pk: 'XXXXXXXXXXXXXXX',
sk: 'T#XXXXXXXXXXXXXXX'
}
```
## get-job.js
`get-job.js` Basic example on how to read job objects.

### Endpoint
'GET /v1/job/${jobId}'

### Request Parameters
- **jobId** (string, required): The jobId of the job that you want to read.

```bash
cd 'javascript/user-task/examples/'
node get-job.js
```
A successful request will provide all the necessary information on that particular job.

## get-task.js
`get-task.js` Basic example how to read task objects.

### Endpoint
'GET /v1/job/${taskId}'

### Request Parameters
- **taskId** (string, required): The taskId of the task that you want to read.
```bash
cd 'javascript/user-task/examples/'
node get-task.js
```
A successful request will provide all the necessary information on that particular task.

## list-assigned-jobs.js
`list-assigned-jobs.js` Basic example how to list jobs assigned to a user. A reminder that only the user who is assigned can view the listed job.

### Endpoint
'GET /v1/job'

```bash
cd 'javascript/user-task/examples/'
node list-assigned-jobs.js
```
A successful request will return the response from the 'sendPost' function similar to the following:
```json
[
  {
    companyId: '771bc49c-XXXXX',
    assignedId: 'ap-southeast-XXXXXXXXX',
    updatedAt: 1706140637116,
    createdAt: 1706140637116,
    jobId: '1706140637115-XXXXXXXX',
    sk: 'JU#XXXXXXX',
    teamId: '771bXXXXX',
    id: 'ea3a42XXXXXXXXX',
    pk: '771bc49c-XXXXXX',
    title: 'Sample Job'
  },
  {
    companyId: '771bc49c-XXXXXX',
    assignedId: 'ap-southeast-XXXXXX',
    updatedAt: 1705983634333,
    createdAt: 1705983634333,
    jobId: '17059XXXXXX',
    sk: 'JU#XXXXXX',
    teamId: '771bc49c-cXXXXX',
    id: '6d6c3f1e-XXXXX',
    pk: '771bc49c-XXXX',
    title: 'Job1'
  }
]

```
## list-assigned-tasks.js
`list-assigned-task.js` Basic example how to list tasks assigned to a user. A reminder that only the user who is assigned can view the listed task.

```bash
cd 'javascript/user-task/examples/'
node list-assigned-tasks.js
```

## remove-job.js
`remove-job.js` Basic example how to remove job. Job should not contain any assigned tasks in order to be removed.

```bash
cd 'javascript/user-task/examples/'
node remove-job.js
```

## remove-task.js
`remove-task.js` Basic example how to remove task.

```bash
cd 'javascript/user-task/examples/'
node remove-task.js
```

## update-job.js
`update-job.js` Basic example how to update job.

```bash
cd 'javascript/user-task/examples/'
node update-job.js
```

## update-task.js
`update-task.js` Basic example how to update task.

```bash
cd 'javascript/user-task/examples/'
node update-task.js
```

For further support please email us at [support@unleashlive.com](mailto:support@unleashlive.com)