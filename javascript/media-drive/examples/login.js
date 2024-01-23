import { signIn } from "../../auth/src/actions.js";
import { PASSWORD, USER_NAME } from "../../config/variables.js";

signIn(USER_NAME, PASSWORD)
  .then(async (response) => {
    // Perform media drive actions
    console.log(response);
  })
  .catch((e) => {
    console.error(e);
  });
