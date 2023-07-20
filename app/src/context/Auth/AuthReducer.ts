import { AuthState, User } from "./types";

type AuthAction = {
  type: "LOGIN" | "LOGOUT";
  payload?: User | null;
};

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        currentUser: action.payload || null,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
