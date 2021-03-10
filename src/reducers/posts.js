import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_POSTS_NOT_FOLLOWED":
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
}
