import * as graphQlRequest from "graphql-request";
import {signIn} from "../../auth/src/actions.js";
import {getFolderItem} from "./get.js";
import {FOLDER_ID, MEDIA_DRIVE_API, PASSWORD, USER_NAME,} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function renameItem(token, id) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
    },
  });

  const renameQuery = gql`
    mutation RenameItems {
      rename(
        item: {id: "${id}"}
        newName: "New name"
      ) {
        id
      }
    }
  `;
  return graphQLClient.request(renameQuery);
}

signIn(USER_NAME, PASSWORD)
  .then(async (jwtToken) => {
    const renameResponse = await renameItem(jwtToken.idToken, FOLDER_ID);
    console.log(renameResponse);

    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
