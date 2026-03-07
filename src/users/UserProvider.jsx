import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, userReducer } from "./userReducer";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthProvider";
import { supabase } from "../lib/supabase";

export const UserContext = createContext();

export default function UserProvider({ children }){
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { state: authState } = useContext(AuthContext);
  useEffect(() => {

    if(!authState?.isAuthenticated || authState?.user?.role !== 'admin') return;

    const fetchUser = async() => {
      try{
      const { count,error } = await supabase.from("profiles")
      .select("*", {count: "exact", head: true})
      .eq("role", "user");
 
      if(error) alert(error.message);

      dispatch({ type: "SET_USERS", payload: count || 0 })
      }catch(err){
        console.error("Failed to fetch user stats:", err);
      }
      
    }

    fetchUser();
  }, [authState?.isAuthenticated, authState?.user?.role]);


  return(
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}