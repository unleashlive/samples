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

export function moveItem(signInResponse, id, toId) {
  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: signInResponse.response.token.idToken,
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
  .then(async (signInResponse) => {
    const moveResponse = await moveItem(signInResponse, FOLDER_ID, "itemId11");
    console.log(moveResponse);

    const folderItem = (await getFolderItem(signInResponse, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
