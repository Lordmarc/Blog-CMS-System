import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, userReducer } from "./userReducer";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthProvider";

export const UserContext = createContext();

export default function UserProvider({ children }){
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { state: authState } = useContext(AuthContext);
  useEffect(() => {

    if(!authState?.isAuthenticated || authState?.user?.role !== 'admin') return;

    const fetchUser = async() => {
      try{
      const res = await api.get('/v0/user-stats');

      dispatch({ type: "SET_USERS", payload: res.data })
      }catch(err){
        console.error("Failed to fetch user stats:", err);
      }
      
    }

    fetchUser();
  }, [authState?.isAuthenticated, authState?.user?.role]);

  console.log(state.totalUsers)
  return(
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}