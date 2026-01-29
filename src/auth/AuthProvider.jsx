import { createContext, useEffect, useReducer } from "react";
import authReducer, { initialState } from "./authReducer";

export const AuthContext = createContext();

export default function AuthProvider({ children }){
const [ state, dispatch ] = useReducer(authReducer, initialState);

useEffect(() => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if(user && token){
    dispatch({
      type: "RESTORE_AUTH",
      payload: {
        token,
        user: JSON.parse(user)
      }
    });
  }

  dispatch({ type: "AUTH_CHECK_DONE" });
},[])

return(
  <AuthContext.Provider value={{ state, dispatch }}>
    { children}
  </AuthContext.Provider>
);
}