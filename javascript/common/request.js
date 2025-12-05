import {API_HOSTNAME} from "../config/env.js";

function constructUrl(path) {
  return `${API_HOSTNAME}${path}`;
}

async function handleResponse(response) {
  try {
    const responseBody = await response.json();
    if (response.ok) {
      if (responseBody.errors) {
        console.error("Service error", responseBody.errors);
        throw new Error(responseBody.errors[0].message);
      }
      return responseBody.data || responseBody;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Handle JSON parsing error
      console.error("Failed to parse response JSON:", error);
      throw new Error("Invalid response format");
    } else {
      throw error;
    }
  }
}
// Helper function to construct headers
function getHeaders(token) {
  return {
    'content-type': 'application/json',
    'x-amz-cognito-security-token': token
  };
}

export async function sendGet(path, token) {
  const url = constructUrl(path);
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(token)
  });
  return handleResponse(response);
}

export async function sendPatch(path, token, body) {
  const url = constructUrl(path);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function sendDelete(path, token) {
  const url = constructUrl(path);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(token)
  });
  return handleResponse(response);
}

export async function sendPost(path, token, body) {
  const url = constructUrl(path);
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}
