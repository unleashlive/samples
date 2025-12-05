# Geofence Mission Creation API

A Node.js implementation for creating geofenced manual flight missions using the Unleash Live API.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Creating GeoJSON in Unleash Atlas](#creating-geojson-in-unleash-atlas)
- [Usage](#usage)
- [API Reference](#api-reference)
- [GeoJSON Structure](#geojson-structure)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

This module provides functionality to create manual flight tasks with geofencing capabilities through the Unleash Live API. It supports:

- AWS Cognito authentication
- Manual flight mission creation
- GeoJSON-based geofencing (inclusion zones and obstacles)
- Waypoint route definition
- Speed and altitude configuration

**Mission Type:** `FLIGHT_REQUEST_MANUAL`

---

## Prerequisites

- **Node.js:** v18.0.0 or higher (uses native `fetch` API)
- **npm:** v8.0.0 or higher
- **Unleash Live Account:** Valid credentials with API access
- **Valid Job ID:** Existing job in your Unleash Live account

### Check Your Environment

```bash
node --version  # Should be v18+
npm --version   # Should be v8+
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/unleashlive/samples.git
cd samples/javascript
```

### 2. Install Dependencies

```bash
npm install
```

**Dependencies installed:**
- `amazon-cognito-identity-js` (v6.1.2) - AWS Cognito authentication
- `aws-sdk` (v2.1336.0) - AWS SDK
- `graphql-request` (v5.2.0) - GraphQL client
- `jwt-decode` (v3.1.2) - JWT token decoder

---

## Configuration

### 1. User Credentials

Edit `config/user.js`:

```javascript
export let USER_NAME = "your-email@company.com";
export let PASSWORD = "your-password";
```

⚠️ **Security Warning:** Never commit real credentials. Use environment variables in production.

### 2. API Configuration

Default configuration in `config/env.js`:

```javascript
export let API_HOSTNAME = "https://api.unleashlive.com";
export let REGION = "ap-southeast-2";
export let POOL_DATA = {
  UserPoolId: "ap-southeast-2_XXXXX",
  ClientId: "XXXXXXXXXXXXXXXX",
};
```

### 3. Job ID

Update the `jobId` in your script to match an existing job.

#### How to Retrieve a Job ID

You can obtain the Job ID in two ways:

**Option A: Via Unleash Platform (Web Interface)**

1. Navigate to **Jobs** in the Unleash platform
2. Open the job you want to add the task to
3. Copy the Job ID from the browser URL

![alt text](https://github.com/unleashlive/samples-private/blob/fix/26/gefence-doc/javascript/user-task/Geofence/assets/Job%20ID%20sample.png?raw=true)

**Example URL:**

`1759957685436-aed515c7-6f40-4063-9e19-95e9b8219e93`
↑ This is your Job ID ↑

**Option B: Via API Call**

Use the `list-assigned-jobs.js` script to retrieve all your jobs programmatically:
```bash
node user-task/examples/list-assigned-jobs.js
```

```javascript
jobId: 'your-job-id-here'
```

### 4. GeoJSON File

Create your geofencing polygons in Unleash Atlas and export as GeoJSON. See the [Creating GeoJSON in Unleash Atlas](#creating-geojson-in-unleash-atlas) section for detailed instructions.

The GeoJSON file can be placed at:
```
samples/javascript/user-task/Geofence/assets/geofencing_polygons.geojson
```

---

## Creating GeoJSON in Unleash Atlas

Before running the script, you need to create your geofencing polygons in Unleash Atlas and export them as GeoJSON.

### Step 1: Access Unleash Atlas

1. Log into your Unleash Live account
2. Navigate to **Unleash Atlas** (the mapping interface)
3. Create a poygon zone on the required area, Guide link here: https://knowledge.unleashlive.com/how-to-annotate-fusionatlas

### Step 2: Draw Geofencing Polygons

#### Creating an Inclusion Zone (Safe Flight Area)

1. Select the **Polygon Tool** from the drawing tools
2. Click on the map to create vertices of your polygon
3. Complete the polygon by clicking on the first point again
4. In the properties panel, set:
   - **Name**: "Flight Area" (or descriptive name)
   - **Geofence Type**: `inclusion`
   - **Fill Color**: Green (e.g., `#14851f`)
   - **Stroke Color**: Black (e.g., `#000`)

#### Creating an Exclusion Zone (No-Fly Area)

1. Use the **Polygon Tool** again
2. Draw the area you want to exclude
3. In the properties panel, set:
   - **Name**: "No Fly Zone" (or descriptive name)
   - **Geofence Type**: `exclusion`
   - **Fill Color**: Red (e.g., `#ff0000`)
   - **Stroke Color**: Black

### Step 3: Export as GeoJSON

1. Click on 3 dots of that layer that you have just created
2. Click **Export**
3. Choose **GeoJSON** format
4. Save the file as `geofencing_polygons.geojson` (or your preferred name)

### Step 4: Verify GeoJSON Structure

Open the exported file and ensure it matches this structure:

```json
{
  "type": "FeatureCollection",
  "name": "Geofence Flight Test Area",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Flight Area",
        "geofence": "inclusion",
        "fill": "#14851f",
        "fill-opacity": 0.5,
        "stroke": "#000"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat, alt], ...]]
      }
    }
  ]
}
```

### Step 5: Place in Repository

Move the exported GeoJSON file to:
```
samples/javascript/mission/assets/geofencing_polygons.geojson
```

### Tips for Creating Effective Geofences

- **Inclusion Zones**: Should be large enough to accommodate your entire flight path with buffer space
- **Exclusion Zones**: Use for obstacles, restricted areas, or dangerous zones
- **Line Obstacles**: Useful for power lines, cables, or linear hazards
- **Coordinate Precision**: Use at least 6 decimal places for accuracy (~0.1 meter precision)
- **Close Polygons**: Always ensure the first and last coordinates are identical
- **Altitude**: Set to `0` for ground-level features, or specify actual altitude in meters

### Alternative Tools for Creating GeoJSON

If Unleash Atlas is not available, you can use these tools:

#### 1. geojson.io (Online Editor)
- Visit [geojson.io](https://geojson.io)
- Draw polygons, lines, and points
- Export as GeoJSON
- **Note**: You'll need to manually add `geofence` property

```json
"properties": {
  "name": "Your Area Name",
  "geofence": "inclusion"  // Add this manually
}
```

#### 2. QGIS (Desktop GIS Software)
- Free and open-source
- Advanced GIS capabilities
- Export layers as GeoJSON
- Download from [qgis.org](https://qgis.org)

#### 3. Google Earth Pro
- Draw polygons and lines
- Export as KML
- Convert KML to GeoJSON using online converters

#### 4. Programmatic Creation (JavaScript)

```javascript
const geojson = {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    properties: {
      name: "My Flight Area",
      geofence: "inclusion"
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [151.228, -33.737, 0],  // lng, lat, alt
        [151.230, -33.737, 0],
        [151.230, -33.739, 0],
        [151.228, -33.739, 0],
        [151.228, -33.737, 0]   // Close the polygon
      ]]
    }
  }]
};

// Save to file
import fs from 'fs';
fs.writeFileSync(
  'mission/assets/my_geofence.json',
  JSON.stringify(geojson, null, 2)
);
```

## Usage

### Basic Example

```bash
node user-task/Geofence/create-task-geofence-mission.js
```

### Programmatic Usage

```javascript
import {signIn} from "../../auth/src/actions.js";
import {PASSWORD, USER_NAME} from "../../config/user.js";
import {sendPost} from "../../common/request.js";
import fs from "fs";

// Load GeoJSON
const geojson = JSON.parse(
  fs.readFileSync('mission/assets/geofencing_polygons.geojson').toString()
);

// Create mission task
export async function createGeofenceMissionTask(token) {
  return await sendPost(`/v1/task/mission`, token, {
    name: 'Geofence with manual mission',
    desc: 'Geofence with manual mission',
    jobId: 'your-job-id',
    type: "FLIGHT_REQUEST_MANUAL",
    context: {
      geojson: geojson,
    },
    speed: 5,
    isSmartInspect: false,
    route: [
      {lat: -33.73775879264395, lng: 151.22888663519666, altitude: 30.0, speed: 3.0},
      {lat: -33.73835298341626, lng: 151.22934597440286, altitude: 30.0, speed: 3.0},
      {lat: -33.73813016235864, lng: 151.2304050064618, altitude: 30.0, speed: 3.0},
      {lat: -33.737265398963515, lng: 151.2303220702163, altitude: 30.0, speed: 3.0}
    ]
  });
}

// Execute
try {
  const jwtToken = await signIn(USER_NAME, PASSWORD);
  const response = await createGeofenceMissionTask(jwtToken.idToken);
  console.log(response);
} catch (e) {
  console.error(e);
}
```

---

## API Reference

### Authentication

```javascript
signIn(username, password)
```

**Returns:** JWT token object
```javascript
{
  accessToken: string,
  idToken: string,
  refreshToken: string,
  identityId: string,
  companyId: string,
  teamId: string
}
```

### Create Mission Task

**Endpoint:** `POST /v1/task/mission`

**Headers:**
```javascript
{
  'content-type': 'application/json',
  'x-amz-cognito-security-token': idToken
}
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Task name |
| `desc` | string | No | Task description |
| `jobId` | string | Yes | Associated job ID |
| `type` | string | Yes | Mission type (use `"FLIGHT_REQUEST_MANUAL"`) |
| `context` | object | No | Additional context (geofencing) |
| `context.geojson` | object | No | GeoJSON FeatureCollection |
| `context.maxDistance` | number | No | Maximum distance (not currently used) |
| `speed` | number | Yes | Default speed in m/s |
| `isSmartInspect` | boolean | No | Enable smart inspection |
| `route` | array | Yes | Array of waypoint objects |

**Route Waypoint Object:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lat` | number | Yes | Latitude (decimal degrees) |
| `lng` | number | Yes | Longitude (decimal degrees) |
| `altitude` | number | Yes | Altitude in meters (AGL or AMSL) |
| `speed` | number | No | Waypoint-specific speed in m/s |

**Response:**
```javascript
{
  id: string,           // Task ID
  name: string,
  status: string,
  // ... additional task properties
}
```

---

## GeoJSON Structure

The geofencing context accepts a GeoJSON FeatureCollection with the following feature types:

### Feature Collection

```javascript
{
  "type": "FeatureCollection",
  "name": "Geofence Flight Test Area",
  "features": [...]
}
```

### Supported Feature Types

#### 1. Polygon (Inclusion/Exclusion Zones)

```javascript
{
  "type": "Feature",
  "properties": {
    "name": "Flight Area",
    "geofence": "inclusion",  // or "exclusion"
    "fill": "#14851f",
    "fill-opacity": 0.5,
    "stroke": "#000",
    "stroke-opacity": 0.8,
    "stroke-width": 2
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [lng, lat, altitude],
        [lng, lat, altitude],
        // ... more coordinates
        [lng, lat, altitude]  // Close the ring
      ]
    ]
  }
}
```

**Properties:**
- `geofence: "inclusion"` - Defines safe flight area
- `geofence: "exclusion"` - Defines no-fly zones
- Styling properties are for visualization only

#### 2. LineString (Obstacles/Wires)

```javascript
{
  "type": "Feature",
  "properties": {
    "name": "Transmission Wire Span"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [lng, lat, altitude],
      [lng, lat, altitude]
    ]
  }
}
```

### Coordinate Format

**Order:** `[longitude, latitude, altitude]`

```javascript
[151.2320877081253, -33.73751300564332, 0]
```

- **Longitude:** -180 to 180 (decimal degrees)
- **Latitude:** -90 to 90 (decimal degrees)
- **Altitude:** Meters (typically 0 for ground-based features)

---

## Examples

### Example 1: Simple Mission with Inclusion Zone

```javascript
const missionData = {
  name: 'Simple Geofenced Mission',
  desc: 'Basic mission with safe zone',
  jobId: 'job-123',
  type: "FLIGHT_REQUEST_MANUAL",
  context: {
    geojson: {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: { geofence: "inclusion" },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [151.228, -33.737, 0],
            [151.230, -33.737, 0],
            [151.230, -33.739, 0],
            [151.228, -33.739, 0],
            [151.228, -33.737, 0]
          ]]
        }
      }]
    }
  },
  speed: 5,
  route: [
    {lat: -33.7378, lng: 151.2289, altitude: 30.0, speed: 3.0},
    {lat: -33.7384, lng: 151.2293, altitude: 30.0, speed: 3.0}
  ]
};
```

### Example 2: Mission with Exclusion Zone and Obstacle

```javascript
const complexMission = {
  name: 'Complex Geofenced Mission',
  jobId: 'job-456',
  type: "FLIGHT_REQUEST_MANUAL",
  context: {
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { geofence: "exclusion", name: "No Fly Zone" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [151.229, -33.738, 0],
              [151.230, -33.738, 0],
              [151.230, -33.739, 0],
              [151.229, -33.739, 0],
              [151.229, -33.738, 0]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "Power Line" },
          geometry: {
            type: "LineString",
            coordinates: [
              [151.2320, -33.7375, 0],
              [151.2288, -33.7318, 0]
            ]
          }
        }
      ]
    }
  },
  speed: 5,
  route: [
    {lat: -33.7378, lng: 151.2289, altitude: 40.0, speed: 3.0}
  ]
};
```

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

**Error:** `Authentication failed` or `Invalid credentials`

**Solutions:**
- Verify credentials in `config/user.js`
- Check for typos or extra whitespace
- Confirm account has API access
- Try logging into web interface

#### 2. Invalid Job ID

**Error:** `Job not found` or `Invalid jobId`

**Solutions:**
- Ensure job exists in your account
- Copy Job ID exactly from Unleash Live interface
- Check job status (must be active)

#### 3. GeoJSON Validation Errors

**Error:** `Invalid GeoJSON` or `Malformed geometry`

**Solutions:**
- Validate GeoJSON at [geojson.io](https://geojson.io)
- Ensure coordinate order: `[lng, lat, alt]`
- Close polygon rings (first and last coordinates must match)
- Check coordinate value ranges

#### 4. Route Validation Errors

**Error:** `Invalid route` or `Route outside geofence`

**Solutions:**
- Ensure at least 2 waypoints
- Verify coordinates are within inclusion zones
- Check altitude values are positive
- Validate coordinate format

#### 5. Module Not Found

**Error:** `Cannot find module '...'`

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 6. Fetch Not Defined (Node.js < v18)

**Error:** `fetch is not defined`

**Solutions:**
- Update Node.js to v18 or higher
- Or install `node-fetch` polyfill:
```bash
npm install node-fetch
```

Then add to your script:
```javascript
import fetch from 'node-fetch';
global.fetch = fetch;
```

### Debug Mode

Enable verbose logging:

```javascript
// In your script
console.log('Token:', jwtToken);
console.log('Request body:', JSON.stringify(requestBody, null, 2));

try {
  const response = await createGeofenceMissionTask(jwtToken.idToken);
  console.log('Success:', JSON.stringify(response, null, 2));
} catch (e) {
  console.error('Error details:', e.message);
  console.error('Stack:', e.stack);
}
```

## Project Structure

```
samples/javascript/
├── package.json                      # Dependencies
├── config/
│   ├── user.js                      # Authentication credentials
│   ├── env.js                       # API configuration
│   └── variables.js                 # Additional config
├── auth/
│   └── src/
│       ├── actions.js               # signIn() function
│       └── cognito.js               # AWS Cognito setup
├── common/
│   ├── request.js                   # HTTP helpers (sendPost, etc.)
│   └── downloadFile.js              # File download utility
├── mission/
│   └── assets/
│       ├── test_mission.json
│       └── test_mission-corridor.json  
└── user-task/
    └── Geofence/
        ├── create-task-geofence-mission.js  # Main script 
        └── assets/
            └── geofencing_polygons.geojson  # GeoJSON example
    └── examples/
        ├── create-task-mission.js
        ├── create-task.js
        ├── list-assigned-tasks.js
        └── ...
```

---

## Environment Variables (Production)

For production deployments, use environment variables instead of hardcoded credentials:

```bash
export UNLEASH_USERNAME="your-email@company.com"
export UNLEASH_PASSWORD="your-password"
```

Update `config/user.js`:

---

## Rate Limits

- Authentication: 5 requests per minute
- API calls: 100 requests per minute per user
- Large file uploads: 10 requests per minute

---

## Related Scripts

| Script | Description |
|--------|-------------|
| `create-task-mission.js` | Create standard mission task |
| `create-task-corridor-mission.js` | Create corridor mission |
| `create-task.js` | Create basic task |
| `list-assigned-tasks.js` | List user's tasks |
| `update-task.js` | Update existing task |
| `delete-task.js` | Delete task |
| `upload-mission.js` | Upload mission file |

---

## API Documentation

For complete API documentation, visit:
- **API Docs:** [developer.unleashlive.com](https://docs.unleashlive.com)
- **Support:** [support@unleashlive.com](https://support.unleashlive.com)

---

## Contributing

### Reporting Issues

When reporting issues, include:

1. Node.js version (`node --version`)
2. Complete error message
3. Relevant code snippet
4. Steps to reproduce

---

## License

[License information from repository]

---

## Support

For technical support:
- Email: support@unleashlive.com
- Documentation: https://developer.unleashlive.com/#GeoFenceJSON
- GitHub Issues: https://github.com/unleashlive/samples/issues

---

## Changelog

### v1.0.0 (Current)
- Initial implementation
- Geofencing support
- Manual mission creation
- GeoJSON inclusion/exclusion zones
- LineString obstacle support

---

**Last Updated:** October 2025  
**Tested With:** Node.js v18.17.0, v20.9.0  
**API Version:** v1
