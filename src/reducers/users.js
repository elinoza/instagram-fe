// users:[],


import { initialState } from "../store";
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_USERS":
        return {
          ...state,
          users: action.payload,
        };
        case "SET_SINGLE_USER":
        return {
          ...state,
          single_user: action.payload,
        };
        case "SET_SINGLE_USER_ID":
          return {
            ...state,
            single_user_id: action.payload,
          };
     default:
                return state;
  
  }
}
