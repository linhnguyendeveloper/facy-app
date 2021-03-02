import { LOGIN_SUCCESS, LOGIN_FAIL } from "./actionTypes";

const initState = {
  isAuthen: null,
  userAuth: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthen: true,
        userAuth: action.data,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthen: false,
      };
    default:
      return {
        ...state,
        isAuthen: null,
      };
  }
}
