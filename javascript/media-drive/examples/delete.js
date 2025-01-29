import * as graphQlRequest from "graphql-request";
import {signIn} from "../../auth/src/actions.js";
import {MEDIA_DRIVE_API, PASSWORD, USER_NAME} from "../../config/variables.js";

const GraphQLClient = graphQlRequest.GraphQLClient;
const gql = graphQlRequest.gql;

export function deleteItem(token) {
  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: token,
    },
  });

  const deleteQuery = gql`
    mutation DeleteItems {
      delete(deleteItems: [{ id: "itemId1" }, { id: "itemId2" }]) {
        deleteItems {
          id
        }
        ownerId
      }
    }
  `;
  return graphQLClient.request(deleteQuery);
}

signIn(USER_NAME, PASSWORD)
.then(async (singInResponse) => {
  const deleteResponse = await deleteItem(singInResponse);
  console.log(deleteResponse);

  const getQuery = gql`
    query GetLibraryItem {
      get(item: { id: "itemId1" }) {
        id
        name
      }
    }
  `;

  const graphQLClient = new GraphQLClient(MEDIA_DRIVE_API, {
    headers: {
      authorization: singInResponse.response.token.idToken,
    },
  });

  const getResponse = await graphQLClient.request(getQuery);
  console.log(getResponse);
})
.catch((e) => {
  console.error(e);
});
