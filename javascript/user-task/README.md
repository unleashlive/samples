## User Task
All files can be found in `user-task/examples` folder.
If you are using Webstorm then "run configuration" are available by default and are stored in `.idea/runConfigurations`.
User task samples aim to give third-party developers a clue about possible ways of: 
    - Creating a job
    - Updating a job
    - Listing assigned jobs
    - Listing current team jobs
    - Delete a job
    - Creating a task
    - Creating a task with new mission
    - Creating a task with new corridor mission
    - Updating a task
    - Listing assigned tasks
    - Listing current team tasks
    - Listing current company tasks
    - Delete a task

### Steps

#### Download and build locally
1) Clone the repository and install Node packages locally.
```bash
git clone https://github.com/unleashlive/samples.git
cd 'javascript'
npm install
```

#### Update config
2) Gather and update all the informations for setting up config environment.
   The information includes:
   
```bash
cd 'javascript/config'
```

Update the `user.js` file with your username and password 
```javascript
export let USER_NAME = "test@user-name.com";
export let PASSWORD = "test-pass";
```
- "test@user-name.com": The same login email that is used to login into [cloud.unleashlive.com](https://cloud.unleashlive.com/auth/sign-in)

- "test-pass": Password for the above login email.


## create-job.js
`create-job.js` Basic example how to create empty job.
```bash
cd 'javascript/user-task/examples/'
```

## create-task.js
`create-task.js` Basic example how to create empty task. The task can be assigned to the job on it's creation level by
passing jobId in request payload.
```bash
cd 'javascript/user-task/examples/'
```
Any create task endpoint supports additional context fields: mission, geojson. 

## create-task-mission.js
`create-task-mission.js` allows user to upload the flight missions for your mission planner.
```bash
cd 'javascript/user-task/examples/'
```
Specify the path of the mission file that you want to upload in the following line:
```javascript
const body =  JSON.parse(fs.readFileSync('<path of mission files>').toString());
```
The test mission files are located in `javascript/mission/assets`.
To create a mission associated with a task use /task/mission POST request.
For more details about mission files format [go to](../mmission/README.md)

## create-task-corridor-mission.js
`create-task-corridor-mission.js` allows user to upload the flight missions for your mission planner.
```bash
cd 'javascript/user-task/examples/'
```
Specify the path of the mission file that you want to upload in the following line:
```javascript
const body =  JSON.parse(fs.readFileSync('<path of mission files>').toString());
```
The test mission files are located in `javascript/mission/assets`.
To create a mission associated with a task use /task/mission POST request.
For more details about mission files format [go to](../mmission/README.md=)


## get-task.js
`get-task.js` Basic example how to read task object.
```bash
cd 'javascript/user-task/examples/'
```

## get-job.js
`get-job.js` Basic example how to read job object.
```bash
cd 'javascript/user-task/examples/'
```

## list-assigned-jobs.js
`list-assigned-jobs.js` Basic example how to list jobs assigned to a user.
```bash
cd 'javascript/user-task/examples/'
```

## list-assigned-tasks.js
`list-assigned-task.js` Basic example how to list tasks assigned to a user.
```bash
cd 'javascript/user-task/examples/'
```

## list-company-tasks.js
`list-company-task.js` Basic example how to list tasks user's company.
```bash
cd 'javascript/user-task/examples/'
```

## list-team-tasks.js
`list-team-task.js` Basic example how to list tasks user's team.
```bash
cd 'javascript/user-task/examples/'
```

## list-company-jobs.js
`list-company-jobs.js` Basic example how to list tasks user's team.
```bash
cd 'javascript/user-task/examples/'
```

## delete-job.js
`delete-job.js` Basic example how to delete job. Job can't contain any assigned task in order to be deleted
```bash
cd 'javascript/user-task/examples/'
```

## delete-task.js
`delete-task.js` Basic example how to delete task.
```bash
cd 'javascript/user-task/examples/'
```

## update-job.js
`update-job.js` Basic example how to update job.
```bash
cd 'javascript/user-task/examples/'
```

## update-task.js
`update-task.js` Basic example how to update task.
```bash
cd 'javascript/user-task/examples/'
```

For further support please email us at [support@unleashlive.com](mailto:support@unleashlive.com)
