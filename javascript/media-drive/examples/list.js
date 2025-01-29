import {signIn} from "../../auth/src/actions.js";
import * as graphQlRequest from "graphql-request";
import {getFolderItem} from "./get.js";
import {FOLDER_ID, MEDIA_DRIVE_API, PASSWORD, USER_NAME,} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function listItems(token, location) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
    },
  });

  const listQuery = gql`
    query list {
      list(
        sort: desc
        location: "${location}"
        limit: 2
      ) {
        items {
          teamId
          location
          type
          tags
          createdAt
          deviceId
          id
          name
          parentId
          s3Path
          updatedAt
          mimeType
          metadata {
            isPanoramic
            duration
          }
        },
        nextToken {
          pk
          sk
          locationCreatedAt
          teamId
          teamIdType
          createdAt
          searchNameCreatedAt
          searchName
          deviceId
          type
        }
      }
    }`;

  return graphQLClient.request(listQuery);
}

export function listItemsImages(token, location) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
    },
  });

  const listQuery = gql`
    query list {
      list(
        sort: desc
        location: "${location}"
        limit: 2
        type: "I"
      ) {
        items {
          teamId
          location
          type
          tags
          createdAt
          deviceId
          id
          name
          parentId
          s3Path
          updatedAt
          mimeType
          metadata {
            isPanoramic
            duration
          }
        },
        nextToken {
          pk
          sk
          locationCreatedAt
          teamId
          teamIdType
          createdAt
          searchNameCreatedAt
          searchName
          deviceId
          type
        }
      }
    }`;

  return graphQLClient.request(listQuery);
}

signIn(USER_NAME, PASSWORD)
  .then(async (jwtToken) => {
    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    const location = [folderItem.location, folderItem.id].join("/");

    const listResponse = await listItems(jwtToken.idToken, location);
    console.log(listResponse);
  })
  .catch((e) => {
    console.error(e);
  });
