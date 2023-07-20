import { createContext, useEffect, useReducer, ReactNode } from "react";
import AuthReducer from "./AuthReducer";
import { AuthContextProps, AuthState } from "./types";

const storedUser = localStorage.getItem("user");
const INITIAL_STATE: AuthState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
