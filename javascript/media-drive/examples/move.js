import * as graphQlRequest from "graphql-request";
import {signIn} from "../../auth/src/actions.js";
import {getFolderItem} from "./get.js";
import {FOLDER_ID, MEDIA_DRIVE_API, PASSWORD, USER_NAME,} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function moveItem(token, id, toId) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
    },
  });

  const moveQuery = gql`
    mutation MoveItems {
      move(
        moveItems: [{id: "${id}"}]
        to: {id: "${toId}"}
      ) {
        id
        parentId
        location
      }
    }
  `;
  return graphQLClient.request(moveQuery);
}

signIn(USER_NAME, PASSWORD)
  .then(async (jwtToken) => {
    const moveResponse = await moveItem(jwtToken.idToken, FOLDER_ID, "itemId11");
    console.log(moveResponse);

    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
