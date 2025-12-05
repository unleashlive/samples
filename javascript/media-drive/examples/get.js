import * as graphQlRequest from "graphql-request";
import {signIn} from "../../auth/src/actions.js";
import {FOLDER_ID, MEDIA_DRIVE_API, PASSWORD, USER_NAME} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function getFolderItem(token, id) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
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
  .then(async (jwtToken) => {
    const folderItem = (await getFolderItem(jwtToken.idToken, FOLDER_ID)).get;
    console.log(folderItem);
  })
  .catch((e) => {
    console.error(e);
  });
