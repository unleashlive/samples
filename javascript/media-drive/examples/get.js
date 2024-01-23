import * as graphQlRequest from "graphql-request";
import {signIn} from "../../auth/src/actions.js";
import {FOLDER_ID, GRAPHQL_ENDPOINT, PASSWORD, USER_NAME,} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function getFolderItem(signInResponse, id) {
  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: signInResponse.response.token.idToken,
    },
  });

  const getQuery = gql`
    query GetLibraryItem{
      get(item: {id: "${id}"}) {
        id,
        location
      }
    }`;

  return graphQLClient.request(getQuery);
}

signIn(USER_NAME, PASSWORD)
  .then(async (signInResponse) => {
    const folderItem = (await getFolderItem(signInResponse, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
