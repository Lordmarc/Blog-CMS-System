import { Children, createContext, useContext, useEffect, useReducer } from "react";
import logsReducer, { initialState } from "./logsReducer";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthProvider";
import { supabase } from "../lib/supabase";

export const LogsContext = createContext();

export default function LogsProvider({ children }){
  const [state, dispatch] = useReducer(logsReducer, initialState);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    if(!authState?.isAuthenticated || authState?.user?.role !== "admin") return;

    const fetchActivityLogs = async () => {
      try{
        const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          id,
          type,
          action,
          description,
          created_at,
          user:user_id (id, name)
          `)
        .order('created_at', {ascending:false})
        .limit(20);

        if(error) alert(error.message);

        
        dispatch({ type: "SET_LOGS", payload: data });
      }catch(err){
        console.error("Failed to fetch", err);
      }
    }
    fetchActivityLogs();

    const interval = setInterval(fetchActivityLogs, 5000);
    return () => clearInterval(interval);
  },[authState?.isAuthenticated, authState?.user?.role]);
  return(
    <LogsContext.Provider value={{ state, dispatch }}>
      { children }
    </LogsContext.Provider>
  )
}