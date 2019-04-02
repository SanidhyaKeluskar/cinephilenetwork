import { TEST_DISPATCH } from "./types";

export const registerUser = userdata => {
  return {
    type: TEST_DISPATCH,
    payload: userdata
  };
};
