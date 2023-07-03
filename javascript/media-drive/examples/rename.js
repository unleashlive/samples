import * as graphQlRequest from "graphql-request";
import { signIn } from "../../auth/src/actions.js";
import { getFolderItem } from "./get.js";
import {
  FOLDER_ID,
  GRAPHQL_ENDPOINT,
  PASSWORD,
  USER_NAME,
} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function renameItem(signInResponse, id) {
  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: signInResponse.response.token.idToken,
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
  .then(async (signInResponse) => {
    const renameResponse = await renameItem(signInResponse, FOLDER_ID);
    console.log(renameResponse);

    const folderItem = (await getFolderItem(signInResponse, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
