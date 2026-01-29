import { createContext, useEffect, useReducer } from "react";
import { initialState, userReducer } from "./userReducer";
import api from "../api/axios";

export const UserContext = createContext();

export default function UserProvider({ children }){
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUser = async() => {
      try{
      const res = await api.get('/v0/user-stats');

      dispatch({ type: "SET_USERS", payload: res.data })
      }catch(err){
        console.error("Failed to fetch user stats:", err);
      }
      
    }

    fetchUser();
  }, []);

  console.log(state.totalUsers)
  return(
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}